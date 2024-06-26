import streamlit as st 
import os
import re
from groq import Groq
from dotenv import load_dotenv
load_dotenv()

MISTRAL_API_KEY = os.environ['MISTRAL_API_KEY']


client = Groq(
    api_key=MISTRAL_API_KEY,
)

def create_conv(code, lang):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": 
                    f"""{code}
                    covert the above cobol program to {lang} , display converted {lang} code in this format:
                    ------c-----
                    [converted {lang} code]
                    ------c-----
                    """,
            }
        ],
        model="mixtral-8x7b-32768",
    )
    return chat_completion.choices[0].message.content

st.title("Code Converter")

def response():
    code = st.text_area("Enter COBOL code:") 
    lang = st.selectbox("Convert to?",("Python", "C", "C++"))   

    if st.button("Convert", key="convert_button"):
        with st.spinner("Converting the code.."):
            st.markdown(create_conv(code,lang))
        

if __name__ == "__main__":
    response()