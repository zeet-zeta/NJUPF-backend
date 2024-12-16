USE my_database;
CREATE TABLE images (
    imageID INT AUTO_INCREMENT PRIMARY KEY, 
    image VARCHAR(255) NOT NULL, 
    postID INT NOT NULL,
    FOREIGN KEY (postID) REFERENCES posts(postID)
);