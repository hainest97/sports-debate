The project idea is to be a discussion board that will allow users to debate sports topics.
The sites design will be sports themed. Right now, a user can create an account and login with
said account. They can view their profile information and can choose to change their username if
they want to. They can also delete their account. Another feature is that a logged in user can 
create topics, and they can edit or delete their own topics. The app is not finished, users still can't 
put posts under a topic and replies to any posts. 

One current issue with the project is that users must go to a separate page to edit a post. Ideally,
they would be able to do this right on the page where the post is.

This project uses HTML, CSS, JavaScript, MySQL, Node.js and Express.js
 
![Photo](https://github.com/hainest97/sports-debate/blob/main/Screenshots/ERD.png)

* The User entity is for users who visit the app to interact with features with an online identity they create for themselves
* The Topic entity represents the topic of discussion for an underlying discussion board.
* The Post entity represents posts under a topic of discussion that users can create to interract with each other
* The Reply entity represents a user's response to a post in particular.

To use the app
1. Run "npm install" in command line from the root folder of the project
2. Run "npm init" in command line to create package.json
3. Run "npm install express" in command line to add express to the dependencies
4. Run "npm install nodemon --save-dev" in command line to add development dependencies
5. Add "dev":"nodemon index.js" under scripts in package.json to set up the development server script
6. Run "npm install dotenv" in command line to initialize the MySQL Connection
7. Create an .env file and set values for the variables MYSQL_USERNAME and MYSQL_PASSWORD
8. Also in the .env file, set variables MYSQL_HOST = "localhost" and MYSQL_DB = "sports_debate_db"
9. Run "npm install mysql2" in command line
10. Run "npm run dev" to start the server.
11. Use browser of choice to view front end material

![Photo](https://github.com/hainest97/sports-debate/blob/main/Screenshots/Register.png)
![Photo](https://github.com/hainest97/sports-debate/blob/main/Screenshots/View_Topics.png)
![Photo](https://github.com/hainest97/sports-debate/blob/main/Screenshots/Edit_Topics.png)
![Photo](https://github.com/hainest97/sports-debate/blob/main/Screenshots/Profile.png)
![Photo](https://github.com/hainest97/sports-debate/blob/main/Screenshots/Edit_Profile.png)





