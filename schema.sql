create database eventdb;

use eventdb;

create table users(
isAdmin BOOLEAN NOT NULL,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
photoURL VARCHAR(200) NOT NULL,
school VARCHAR(100) NOT NULL,
githubURL VARCHAR(200) NOT NULL,
resumeURL VARCHAR(200),
phoneNum VARCHAR(10) NOT NULL,
email VARCHAR(200) NOT NULL,
pwd VARCHAR(200) NOT NULL,
checkedIn BOOLEAN NOT NULL, 
ateBreakfast BOOLEAN NOT NULL,
ateLunch BOOLEAN NOT NULL,
ateDinner BOOLEAN NOT NULL,
id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY(ID)
);

INSERT INTO users (isAdmin, firstName, lastName, photoURL, school, githubURL, resumeURL, phoneNum, email, pwd, checkedIn, ateBreakfast, ateLunch, ateDinner) values(true, "Steve", "Freeman", "https://lh5.googleusercontent.com/-b1FbiqsVlTo/AAAAAAAAAAI/AAAAAAAABlk/iPh6YcZ7OiQ/photo.jpg", "Ramapo College", "https://github.com/sfreeman422", "", "9085783770", "sfreeman422@gmail.com", "password123", false, false, false, false);

