DROP TABLE IF EXISTS reports;
CREATE TABLE reports(
  user_id INT NOT NULL,
  monday DOUBLE(8,1),
  tuesday DOUBLE(8,1),
  wednesday DOUBLE(8,1),
  thursday DOUBLE(8,1),
  friday DOUBLE(8,1),
  saturday DOUBLE(8,1),
  sunday DOUBLE(8,1),
  PRIMARY KEY (user_id)
)