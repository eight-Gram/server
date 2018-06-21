# server

Server for eightGram mini app.

This REST API server was made with `express` with javascript. In order to start the server locally, type in `yarn start` or `npm start` in your respective terminal. Best environment for the server would be Linux or macOS.

### Dependencies Used

The packages used in this server are:

    @google-cloud/storage
    bcryptjs
    cors
    dotenv
    express
    jsonwebtoken
    mongoose
    morgan
    multer
    path

And to run the server properly, you must install all these packages by typing `npm install` in your terminal

### End Points

#### /User
| Action | Path | Description |
|---------|:-----:|:----------:|
|POST|/register|Register new user
|POST|/login|Login user
|GET|/|Get all users

### /Post
| Action | Path | Description |
|---------|:-----:|:----------:|
|GET|/|Get all Posts|
|GET|/:userId|Get post by user
|DELETE|/:postId|Delete post
|POST|/|Add new Post
|POST|/comment/:postId|Post comment
|PUT|/like/:postId|Like a post
|PUT|/unlike/:postId|Unlike a post
|PUT|/:postId|Edit a post description