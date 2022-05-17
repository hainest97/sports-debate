const con = require('./db_connect');

async function createTable(){
  
  let sql = `CREATE TABLE IF NOT EXISTS topics (
    topic_id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    topic_text VARCHAR(255) NOT NULL,
    create_date TIMESTAMP NOT NULL,
    CONSTRAINT topic_pk PRIMARY KEY(topic_id),
    CONSTRAINT user_pk FOREIGN KEY(user_id) REFERENCES users (user_id)
)`;
  await con.query(sql);
}
createTable();
/*const topics = [
    {
        topicId: 123,
        userId: 12345,
        topicText: 'LeBron James',
        dateTime: "Created: 25/4/2022 @ 4:49"
    },
    {
        topicId: 246,
        userId: 55555,
        topicText: 'Micheal Jordan',
        dateTime: "Created: 25/4/2022 @ 6:37"
    }
];
*/
let getAllTopics = async() => {
    const sql = "SELECT * FROM topics";
    return await con.query(sql);
}
async function getTopic(topic){
    let sql;
    if(topic.topicId){
      sql = `SELECT * FROM topics WHERE topic_id=${topic.topicId}`
    }
    else {
      sql = `SELECT * FROM topics WHERE topic_text="${topic.topicText}"`
    }
    return await con.query(sql);
  }
async function addTopic(topic,topicText,userId){
    const sql = `INSERT INTO topics(user_id,topic_text,create_date) VALUES (${userId},"${topicText}",NOW())`;
    const insert = await con.query(sql);
    const NewTopic = await getTopic(topic);
    return NewTopic[0];
    /*const newTopic = {
        topicId: topics[topics.length - 1].topicId + 1,
        userId: topic.userId,
        topicText: topic.topicText,
        dateTime: getDate()
    }
    topics.push(newTopic);
    return newTopic;*/
}
async function deleteTopic(topicId){
    const sql = `DELETE FROM topics WHERE topic_id = ${topicId}`;
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
async function editTopic(topic){

  const sql = `UPDATE topics SET topic_text = "${topic.topicText}" WHERE topic_id= ${topic.topicId}`;

  const update = await con.query(sql);
  const NewTopic = await getTopic(topic);
  return NewTopic[0];
}

module.exports = { getAllTopics, getTopic, addTopic, deleteTopic, editTopic}