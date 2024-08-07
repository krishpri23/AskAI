## Creating backend

- Use middlewares for cors and accepting json data
- add dotenv import for reading .env files
- Connect mongodb using uri and mongoose
- Define schemas for chat and userchats by referring to gemini api `startChat()`
- add post chat logics inside post api, we use clerk's userId for identification

### Session validation

- For session validation, use clerk nodejs sdk
- Using clerk middlewares, we can authenticate the requests made

### MongoDB

- `$push` : The $push operator is used to add a value to an array in a MongoDB document. When used by itself, it appends the specified value to the end of the array.

- `$each` : The $each modifier is used in conjunction with $push to add multiple values to an array. It allows you to push multiple elements into an array field in one operation.

### Challenges

1. all chats were saving to chats and not userchats because i forgot to add `await` before saving userchats

2. creating new chat in dashboard page does not take to new page with chat id. it says undefined : `_id: new ObjectId('66b1bbd477d2080cc6da8e54')` is the response for \_id, we need to extract the id from here.
   - Since the response we send is just plain text, frontend must accept `res.text()` and return it.
