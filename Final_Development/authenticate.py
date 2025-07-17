from auth.auth import authentication_code

with open('code.txt','r') as file:
    code = str(file.readline())

access_token = authentication_code(code=code)

with open('access_token.txt','w') as f:
    f.write(access_token)
