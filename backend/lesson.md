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

- all chats were saving to chats and not userchats because i forgot to add `await` before saving userchats
