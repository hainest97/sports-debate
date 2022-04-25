const express = require('express');
const app = express();

const userRoutes = require('./server/routes/user');
const topicRoutes = require('./server/routes/topic');
const postRoutes = require('./server/routes/post');
const replyRoutes = require('./server/routes/reply');

app.use(express.json()); //To parse JSON bodies (Applicable for Express 4.16+)

app.use(express.static(__dirname + '/public'));
app.get('/',(req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use("/users", userRoutes);
app.use("/topics", topicRoutes);
app.use("/posts", postRoutes);
app.use("/reply", replyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));