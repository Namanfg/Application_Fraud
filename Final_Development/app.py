from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import requests
import json

app = Flask(__name__, static_folder='static')
CORS(app)  

with open('access_token.txt','r') as file:
    data = str(file.readline())
    access_token = data

@app.route('/')
def serve_index():
    return render_template('index.html')

@app.route('/api/submit', methods=['POST'])
def submit():
    print("Getting Data started ")
    data = request.get_json()
    
    print("Getting and Formating Data")
    full_name = data.get('full_name', '').strip().title()
    country = data.get('country', '').strip()
    dob = data.get('dob', '').strip()
    city = data.get('city', '').strip()

    print("Preparing Data for SAS API")
    # uri -> /microanalyticScore/modules/application_fraud_genai_version_1_0
    url_sas = "https://create.demo.sas.com/microanalyticScore/modules/application_fraud_genai2_1/steps/execute"
    payload_sas = json.dumps({
        "version": 2.1,
        "inputs": [
            {"name": "Input_Country_", "value": country},
            {"name": "Input_Dob_", "value": dob},
            {"name": "Input_Name_", "value": full_name},
            {"name": "Input_City_", "value":city}
        ]
    })
    headers_sas = {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.sas.microanalytic.module.step.output+json',
        'Authorization': f'Bearer {access_token}'
    }
    print("Calling SAS API")
    response_sas = requests.post(url_sas, headers=headers_sas, data=payload_sas)

    print("Printing SAS output")
    print(response_sas.json())

    return jsonify({
        "sas_response": response_sas.json()
    })

    
    
if __name__ == '__main__':
    app.run(debug=True)
