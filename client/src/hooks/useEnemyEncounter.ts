import { useEffect } from "react";
import { useState } from "react";
import enemy_1 from "../image/enemy_1.png";
import enemy_2 from "../image/enemy_2.png";
import enemy_3 from "../image/enemy_3.png";
import enemy_4 from "../image/enemy_4.png";
import enemy_5 from "../image/enemy_5.png";

export const useEnemyEncounter = () => {
  const [enemy, setEnemy] = useState("");

  useEffect(() => {
    const enemys = [enemy_1, enemy_2, enemy_3, enemy_4, enemy_5];

    const enemyNo = Math.floor(Math.random() * enemys.length);
    setEnemy(enemys[enemyNo]);
  }, []);

  return { enemy };
};
