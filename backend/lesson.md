## Creating backend

- Use middlewares for cors and accepting json data
- add dotenv import for reading .env files
- Connect mongodb using uri and mongoose
- Define schemas for chat and userchats by referring to gemini api `startChat()`
- add post chat logics inside post api, we use clerk's userId for identification

### Session validation

- For session validation, use clerk nodejs sdk
- Using clerk middlewares, we can authenticate the requests made

### Challenges

1. all chats were saving to chats and not userchats because i forgot to add `await` before saving userchats

2. creating new chat in dashboard page does not take to new page with chat id. it says undefined : `_id: new ObjectId('66b1bbd477d2080cc6da8e54')` is the response for \_id, we need to extract the id from here.
   - Since the response we send is just plain text, frontend must accept `res.text()` and return it.
