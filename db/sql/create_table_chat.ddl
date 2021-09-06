DROP TABLE IF EXISTS chat;
CREATE TABLE chat(
  guild_id INT,
  member_id INT,
  comment TEXT,
  created DATETIME,
  PRIMARY KEY (guild_id, member_id)
)