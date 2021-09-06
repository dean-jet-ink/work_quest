DROP TABLE IF EXISTS cheerings;
CREATE TABLE cheerings(
  target_id INT,
  member_id INT,
  PRIMARY KEY (target_id, member_id)
)