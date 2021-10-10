DROP TABLE IF EXISTS cheerings;
CREATE TABLE cheerings(
  target_id INT,
  user_id INT,
  PRIMARY KEY (target_id, user_id)
)