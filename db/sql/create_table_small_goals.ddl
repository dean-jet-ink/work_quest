DROP TABLE IF EXISTS small_goals;
CREATE TABLE small_goals(
  small_goal_id INT AUTO_INCREMENT,
  work_id INT,
  small_goal_name VARCHAR(255),
  completed BOOL,
  created DATETIME,
  total_time DOUBLE(8,1),
  PRIMARY KEY (small_goal_id)
)