DROP TABLE IF EXISTS guild_members;
CREATE TABLE guild_members(
  guild_member_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  guild_id INT,
  PRIMARY KEY (guild_member_id)
)