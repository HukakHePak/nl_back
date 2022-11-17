Hello! This my own free-tome project for some services:

1. Note Lawn app https://note-lawn.ru

2. Masager  https://note-lawn.ru/masager

3. Car Manager (await)

And many other I want deploy

You can write your masager app using my API and join to chat with me ;)


Masager API

Use https://note-lawn.ru/api/masager as root url for requests 

* Authorize
Send your mail for get token
Method: POST
Path: /user
Body: { email: <your@mail.com> }

After you get token on mail you can send this to server. 
Put your token into request headers for next routes

Headers: {
    Authorization: Bearer <token>
}

* Messages

Method: GET
Path: /messages
Headers: (with token)

Response: { messages: [ <object> ] }

* User info

Method: GET
Path: /user/me
Headers: (with token)

Response: { name: <string>, email: <string> }

* Change name

Method: PATCH
Path: /user
Headers: (with token)
Body: { name: <string> }

* Send messages

Setup WebSocket for chatting!

Url: wss://note-lawn.ru/websocket/masager?<token>

Send message: { "text": <string> }
Get message: { user: { name: <string>, email: <string> }, text: <string>, createdAt: <Date> }