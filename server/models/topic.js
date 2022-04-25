const topics = [
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

let getAllTopics = () => topics;

function addTopic(topic){
    const newTopic = {
        topicId: topics[topics.length - 1].topicId + 1,
        userId: topic.userId,
        topicText: topic.topicText,
        dateTime: getDate()
    }
    topics.push(newTopic);
    return newTopic;
}
function getDate(){
    currentdate = new Date();
    return "Created: " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes();
}

module.exports = { getAllTopics, addTopic}