DROP TABLE IF EXISTS chat;
CREATE TABLE chat(
  chat_id INT NOT NULL AUTO_INCREMENT,
  guild_id INT,
  user_id INT,
  comment TEXT,
  created DATETIME,
  PRIMARY KEY (chat_id)
)