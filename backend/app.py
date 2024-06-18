import os
import re
import json
import uuid
import boto3
import requests
import psycopg2
import textwrap



from groq import Groq
from io import BytesIO
from psycopg2 import pool
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from botocore.client import Config
from werkzeug.security import generate_password_hash, check_password_hash


load_dotenv()
app = Flask(__name__)
CORS(app)

#CONFIG
BUCKET = "demo"
ALLOWED_EXTENSIONS = {"pas", "dfm", "cob", "cbl", "vb", "vbs"}
DATABASE_URL = "postgres://default:uZog3rLUWaT2@ep-black-dream-a18zy7wm.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"

ACCOUNTID = os.environ["ACCOUNTID"]
CLIENTACCESSKEY = os.environ["CLIENTACCESSKEY"]
CLIENTSECRET = os.environ["CLIENTSECRET"]
CONNECTIONURL = f"https://{ACCOUNTID}.r2.cloudflarestorage.com"


conn = psycopg2.connect(DATABASE_URL, sslmode="require")
connection_pool = pool.SimpleConnectionPool(
    1, 10, DATABASE_URL, sslmode="require")
client = Groq(
    api_key=os.environ["MISTRAL_API_KEY"],
)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_to_r2(filename, filecontent):
    s3 = boto3.client(
    service_name ='s3',
    endpoint_url=CONNECTIONURL,
    aws_access_key_id=CLIENTACCESSKEY,
    aws_secret_access_key=CLIENTSECRET,
    region_name='us-east-1'
)
    UploadObject = filecontent
    UploadObjectBytes = UploadObject.encode('utf-8')
    UploadObjectFile = BytesIO(UploadObjectBytes)
    try:
        s3.upload_fileobj(UploadObjectFile, Bucket="demo", Key=f"{filename}.json")
        return True
    except:
        return False


@app.route("/", methods=["GET"])
def home():
    con_id = str(uuid.uuid4())
    return "Running on Python with Postgres ", 200


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"status": 400, "error": "Email and password are required"}, 200

    hashed_password = generate_password_hash(password)

    conn = connection_pool.getconn()
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO users (email, password) VALUES (%s, %s) RETURNING id",
            (email, hashed_password),
        )
        user_id = cur.fetchone()[0]
    conn.commit()
    connection_pool.putconn(conn)

    return {"status": 200, "email": email, "id": user_id, "message": "User created successfully"}, 200


@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"status": 400, "error": "Email and password are required"}, 200

    conn = connection_pool.getconn()
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, password FROM users WHERE email = %s",
            (email,),
        )
        result = cur.fetchone()
        if result is None:
            return {"status": 400, "error": "User not found"}, 200

        user_id, hashed_password = result
        if not check_password_hash(hashed_password, password):
            return {"status": 400, "error": "Invalid password"}, 200
    connection_pool.putconn(conn)

    return {"status": 200, "email": email, "id": user_id, "message": "Signed in successfully"}, 200


@app.route("/convert", methods=["POST"])
def convert():
    if "file" not in request.files:
        return {"status": 400, "error": "No file part"}, 200

    file = request.files["file"]
    if file.filename == "":
        return {"status": 400, "error": "No selected file"}, 200

    if file and allowed_file(file.filename):
        code = file.read().decode("utf-8")
        from_code = request.form.get("from")
        to_code = request.form.get("to")
        user_id = request.form.get("userid")
        con_title = f"from {from_code} to {to_code} - {file.filename}"

        if not user_id:
            return {"status": 400, "error": "User ID is required"}, 200

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"""{code}
                    covert the above {from_code} program to {to_code}, give the code first and then documentations
                    """,
                }
            ],
            model="llama3-8b-8192",
        )

        con_id = str(uuid.uuid4())
        conn = connection_pool.getconn()
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO history (con_id, user_id, title) VALUES (%s, %s, %s)",
                (con_id, user_id, con_title),
            )
        conn.commit()
        connection_pool.putconn(conn)
        content = chat_completion.choices[0].message.content
        code_match = re.search(r"```(.*?)```", content, re.DOTALL)
        codee = code_match.group(1).strip()
        lines = codee.split('\n')
        lines = lines[1:]
        codee = '\n'.join(lines)
        if upload_to_r2(filename=f"{con_id}-old",filecontent=code) and upload_to_r2(filename=f"{con_id}-new",filecontent=codee):
            return {"code":codee,"id":con_id, "title": con_title}, 200
        else:
            return {"status": 400, "error": "Invalid file extension"}, 400

    return {"status": 400, "error": "Invalid file extension"}, 400

@app.route("/chatid/get", methods=["GET"])
def get_chat_ids():
    user_id = request.args.get('userid')
    conn = connection_pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT con_id,title FROM history WHERE user_id = %s", (user_id,))
            records = cur.fetchall()
        conn.commit()
    except Exception as e:
        connection_pool.putconn(conn)
        return {"status": 500, "error": str(e)}, 200
    connection_pool.putconn(conn)
    return jsonify(records), 200

@app.route("/docs/get", methods=["GET"])
def get_docs():
    chatid = request.args.get('chatid')
    title = request.args.get('title')
    chat_url = f"https://pub-ed6294b09052471093b13f036a7fe802.r2.dev/{chatid}.json"
    response = requests.get(chat_url)
    code = response.text
    prompt = prompt = f"""
You are given a code snippet below:

{code}

The above code is in "{title}".

Please generate a detailed html document for this code that includes the following sections and format, Use Arial & sans-serif font family throught the html document:
[Documentation for {title} ({code})]
1. Project Overview: Provide a step by step explaination of what this code does.
2. Setup Instructions: Include instructions on how to set up the project. This should cover installation steps, dependencies, and configuration required to run the code.
3. Usage Instructions: Detail how to use the code. Include examples of commands or functions, and describe what the expected outputs are.
4. Examples: Provide some example usages of the code along with expected outcomes.
5. Error Handling: Describe any error handling implemented in the code or any common issues a user might encounter and how to resolve them.

Make sure the html file is well-structured and easy to follow, using appropriate html syntax for headers, code blocks, and linkss. Use Arial, sans-serif fonat family throught the html document.
"""

    chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="mixtral-8x7b-32768",
        )
    content = chat_completion.choices[0].message.content
    return content



@app.route("/debug/get", methods=["GET"])
def debug_code():
    chatid = request.args.get('chatid')
    title = request.args.get('title')
    chat_url = f"https://pub-ed6294b09052471093b13f036a7fe802.r2.dev/{chatid}.json"
    response = requests.get(chat_url)
    code = response.text
    prompt = prompt = f"""{code}
    above code is coverted {title}, debug the code if neccessary and add comments regarding the changes you made. Also add propper heading and subheading
    """

    try:
        chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama3-8b-8192",
    )
    except Exception as e:
        return f"An error occurred: {e} --- {prompt}"
    content = chat_completion.choices[0].message.content
    return content

if __name__ == "__main__":
    app.run(debug=False)