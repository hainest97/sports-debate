const con = require('./db_connect');

async function createTable(){
  
  let sql = `CREATE TABLE IF NOT EXISTS posts (
    post_id INT NOT NULL AUTO_INCREMENT,
    topic_id INT,
    user_id INT,
    post_text VARCHAR(255) NOT NULL,
    post_date TIMESTAMP NOT NULL,
    CONSTRAINT post_pk PRIMARY KEY(post_id),
    CONSTRAINT topic_pk FOREIGN KEY (topic_id) REFERENCES topics (topic_id),
    CONSTRAINT user_pk1 FOREIGN KEY(user_id) REFERENCES users (user_id)
)`;
  await con.query(sql);
}
createTable();

let getAllPosts = async() => {
    const sql = "SELECT * FROM posts";
    return await con.query(sql);
}
async function getPost(post){
    let sql;
    if(post.postId){
      sql = `SELECT * FROM posts WHERE post_id=${post.postId}`
    }
    else {
      sql = `SELECT * FROM posts WHERE post_text="${post.postText}"`
    }
    return await con.query(sql);
  }
async function addPost(post,postText,topicId,userId){
    const sql = `INSERT INTO posts(topic_id,user_id,post_text,post_date) VALUES (${topicId},${userId},"${postText}",NOW())`;
    const insert = await con.query(sql);
    const NewPost = await getPost(post);
    return NewPost[0];
    /*const newTopic = {
        topicId: topics[topics.length - 1].topicId + 1,
        userId: topic.userId,
        topicText: topic.topicText,
        dateTime: getDate()
    }
    topics.push(newTopic);
    return newTopic;*/
}
async function deletePost(postId){
    const sql = `DELETE FROM posts WHERE topic_id = ${postId}`;
    await con.query(sql);
}
function getDate(){
    currentdate = new Date();
    return "Created: " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes();
}
async function editPost(post){

  const sql = `UPDATE posts SET post_text = "${post.postText}" WHERE post_id= ${post.postId}`;

  const update = await con.query(sql);
  const NewPost = await getTopic(post);
  return NewPost[0];
}

module.exports = { getAllPosts, getPost, addPost, deletePost,editPost}