DROP TABLE IF EXISTS guilds;
CREATE TABLE guilds(
  guild_id INT NOT NULL AUTO_INCREMENT,
  admin_id INT,
  guild_name VARCHAR(255),
  guild_picture VARCHAR(255),
  comment VARCHAR(255),
  PRIMARY KEY (guild_id)
)