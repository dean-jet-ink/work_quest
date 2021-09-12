import { useEffect, useState } from "react";

export const useDefaultPicture = (
  picture: string | null,
  key: "member/" | "guild/"
) => {
  const [inspectedPicture, setInspectedPicture] = useState("");
  const [keyName, setKeyName] = useState("");

  useEffect(() => {
    if (picture) {
      setInspectedPicture(picture);
      setKeyName(key);
    } else {
      setInspectedPicture("user_default.png");
      setKeyName("static/");
    }
  }, [picture]);

  return { inspectedPicture, keyName };
};
