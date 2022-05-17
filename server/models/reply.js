const con = require('./db_connect');

async function createTable(){
  
  let sql = `CREATE TABLE IF NOT EXISTS replies (
    reply_id INT NOT NULL AUTO_INCREMENT,
    post_id INT,
    user_id INT,
    reply_text VARCHAR(255) NOT NULL,
    reply_date TIMESTAMP NOT NULL,
    CONSTRAINT reply_pk PRIMARY KEY(reply_id),
    CONSTRAINT post_pk FOREIGN KEY (post_id) REFERENCES posts (post_id),
    CONSTRAINT user_pk2 FOREIGN KEY(user_id) REFERENCES users (user_id)
)`;
  await con.query(sql);
}
createTable();

let getAllReplies = async() => {
    const sql = "SELECT * FROM replies";
    return await con.query(sql);
}
async function getReply(reply){
    let sql;
    if(reply.replyId){
      sql = `SELECT * FROM replies WHERE post_id=${reply.replyId}`
    }
    else {
      sql = `SELECT * FROM replies WHERE reply_text="${reply.replyText}"`
    }
    return await con.query(sql);
  }
async function addReply(reply,replyText,postId,userId){
    const sql = `INSERT INTO replies(post_id,user_id,reply_text,reply_date) VALUES (${postId},${userId},"${replyText}",NOW())`;
    const insert = await con.query(sql);
    const NewReply = await getReply(reply);
    return NewReply[0];
    /*const newTopic = {
        topicId: topics[topics.length - 1].topicId + 1,
        userId: topic.userId,
        topicText: topic.topicText,
        dateTime: getDate()
    }
    topics.push(newTopic);
    return newTopic;*/
}
async function deleteReply(replyId){
    const sql = `DELETE FROM replies WHERE reply_id = ${replyId}`;
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
async function editReply(reply){

  const sql = `UPDATE replies SET reply_text = "${reply.replyText}" WHERE reply_id= ${reply.replyId}`;

  const update = await con.query(sql);
  const NewReply = await getReply(reply);
  return NewReply[0];
}

module.exports = { getAllReplies, getReply, addReply, deleteReply,editReply}