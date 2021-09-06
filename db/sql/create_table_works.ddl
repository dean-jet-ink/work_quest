DROP TABLE IF EXISTS works;
CREATE TABLE works(
  work_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  work_name VARCHAR(255),
  completed BOOL,
  created DATETIME,
  deadline DATE,
  total_time DOUBLE(8,1),
  PRIMARY KEY (work_id)
)