DROP TABLE IF EXISTS users;
CREATE TABLE users(
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255),
  mail VARCHAR(255),
  password VARCHAR(255),
  picture VARCHAR(255),
  sex ENUM('male', 'female'),
  comment TEXT,
  total_time DOUBLE(8,1),
  level INT,
  title ENUM('村人A','村の力自慢','見習い兵士','頼もしい兵士','騎士','近衛騎士','冒険者','勇者','伝説の勇者','Messiah'),
  guild_id INT,
  white_noise ENUM('clock','forest','bonfire','river'),
  PRIMARY KEY (user_id)
)