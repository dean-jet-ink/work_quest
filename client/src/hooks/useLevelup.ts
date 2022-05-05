import { useCallback, useEffect, useState } from "react";

import { User } from "../types/user";
import { axios } from "../apis/axios";

import villager from "../assets/image/villager.png";
import villagerStrong from "../assets/image/villager_strong.png";
import soldier from "../assets/image/soldier.png";
import soldierStrong from "../assets/image/soldier_strong.png";
import knight from "../assets/image/knight.png";
import royalKnight from "../assets/image/royal_knight.png";
import adventurer from "../assets/image/adventurer.png";
import breaver from "../assets/image/breaver.png";

type Props = {
  onOpen: () => void;
  onClickPraise: () => void;
  onClickParty: () => void;
};

export const useLevelUp = (user: User) => {
  const [experience, setExperience] = useState(0);
  const [experienceRate, setExperienceRate] = useState(0);
  const [level, setLevel] = useState(0);
  const [levelUpFlag, setLevelUpFlag] = useState(false);
  const [title, setTitle] = useState("");
  const [titleImage, setTitleImage] = useState("");
  const [levelComposition, setLevelComposition] = useState<Array<number>>([]);
  const id = user.userId;

  const decideTitle = (lv: number): string => {
    switch (true) {
      case lv < 7:
        return "村人A";

      case lv >= 7 && lv < 12:
        return "村の力自慢";

      case lv >= 12 && lv < 17:
        return "見習い兵士";

      case lv >= 17 && lv < 25:
        return "頼もしい兵士";

      case lv >= 25 && lv < 36:
        return "騎士";

      case lv >= 36 && lv < 41:
        return "近衛騎士";

      case lv >= 41 && lv < 61:
        return "冒険者";

      case lv >= 61 && lv < 102:
        return "勇者";

      case lv >= 102 && lv < 200:
        return "伝説の勇者";

      case lv === 200:
        return "Messiah";

      default:
        return "村人A";
    }
  };

  const decideTitleImage = useCallback((title: string) => {
    switch (true) {
      case title === "村人A":
        setTitleImage(villager);
        break;
      case title === "村の力自慢":
        setTitleImage(villagerStrong);
        break;
      case title === "見習い兵士":
        setTitleImage(soldier);
        break;
      case title === "頼もしい兵士":
        setTitleImage(soldierStrong);
        break;
      case title === "騎士":
        setTitleImage(knight);
        break;
      case title === "近衛騎士":
        setTitleImage(royalKnight);
        break;
      case title === "冒険者":
        setTitleImage(adventurer);
        break;
      case title === "勇者":
        setTitleImage(breaver);
        break;
      case title === "伝説の勇者":
        setTitleImage(breaver);
        break;
      case title === "Messiah":
        setTitleImage(breaver);
        break;
      default:
        setTitleImage(villager);
        break;
    }
  }, []);

  // 次のレベルの必要経験値と、現在の取得経験値の割合を算出し、stateを更新
  const calcExperienceRate = (exp: number, nextlv: number) => {
    const rate = Math.floor((exp / nextlv) * 100);
    if (rate >= 100) {
      setExperienceRate(100);
      setLevelUpFlag(true);
    } else {
      setExperienceRate(rate);
    }
  };

  useEffect(() => {
    // 指数関数を用いた経験値の構成表の作成
    // インデックス0＝レベル1
    const newComposition: Array<number> = [0];
    for (let level = 1; level < 200; level++) {
      const nextLevel = level + 1;
      const exponential = Math.round(3 + 2 * (nextLevel - 2) ** 1.7);
      newComposition.push(exponential);
    }
    setLevelComposition(newComposition);

    const level = user.level;
    const title = user.title;

    setLevel(level);

    const exp = user.totalTime;
    setExperience(exp);

    // 第一引数: 総取得経験値 - 現在レベル必要経験値 = 現在レベル到達以降取得経験値
    // 第二引数: 次回レベル必要総経験値 - 現在レベル必要経験値 = 現在レベルから次回レベルまでの必要経験値
    calcExperienceRate(
      exp - newComposition[level - 1],
      newComposition[level] - newComposition[level - 1]
    );

    setTitle(title);
    decideTitleImage(title);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onClickLevelUp = useCallback(
    (props: Props) => {
      const { onOpen, onClickPraise, onClickParty } = props;

      let base = 1;
      while (experience >= levelComposition[base]) {
        base++;
      }
      setLevel(base);
      axios.put(`/update/user/level/${id}`, { level: base }).then((res) => {
        setLevel(res.data.level);

        calcExperienceRate(
          experience - levelComposition[res.data.level - 1],
          levelComposition[res.data.level] -
            levelComposition[res.data.level - 1]
        );

        const newTitle = decideTitle(res.data.level);
        if (title !== newTitle) {
          axios.put(`/update/user/title/${id}`, {
            title: newTitle,
          });
          setTitle(newTitle);
          decideTitleImage(newTitle);
        }
      });

      setLevelUpFlag(false);
      onOpen();
      onClickPraise();
      onClickParty();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [id, experience, title]
  );

  return {
    experienceRate,
    level,
    levelUpFlag,
    title,
    titleImage,
    decideTitle,
    onClickLevelUp,
  };
};
