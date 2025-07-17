import requests

def authentication_code(code):
    url =  "https://create.demo.sas.com/SASLogon/oauth/token"
    payload_token = f'grant_type=authorization_code&code={code}'
    headers_token = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic c2FzLmNsaTo='
    }

    response_token = requests.post(url, headers=headers_token, data=payload_token)
    token_dictionary = response_token.json()
    print(token_dictionary)
    return token_dictionary['access_token']  




