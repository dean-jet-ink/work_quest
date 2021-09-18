import { useEffect, useState } from "react";

export const useDefaultPicture = (
  picture: string | null,
  key: "member/" | "guild/"
) => {
  const [inspectedPicture, setInspectedPicture] = useState("");

  useEffect(() => {
    if (picture) {
      setInspectedPicture(
        `https://work-quest.s3.ap-northeast-3.amazonaws.com/${key}${picture}`
      );
    } else {
      setInspectedPicture(
        "https://work-quest.s3.ap-northeast-3.amazonaws.com/static/user_default.png"
      );
    }
  }, [picture]);

  return { inspectedPicture };
};
