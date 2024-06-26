import requests
import json

url = 'http://127.0.0.1:8181/convert'
files = {'file': open('test5.dfm', 'rb')}
params = {'to': 'java program', 'from': 'delphi'}
response = requests.post(url, files=files, params=params)

print("Status code:", response.status_code)
print("Response text:", response.text)

try:
    print(response.json())
except json.decoder.JSONDecodeError:
    print("No JSON object could be decoded")


