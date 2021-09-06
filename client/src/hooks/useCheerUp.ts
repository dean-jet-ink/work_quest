import { useCallback, useState } from "react";
import { useShowMessage } from "./useShowMessage";

export const useCheerUp = (userName: string) => {
  const [cheer, setCheer] = useState<boolean>(false);
  const { showMessage } = useShowMessage();

  const onClickCheerUp = useCallback(() => {
    if (cheer) {
      setCheer(false);
    } else {
      setCheer(true);
      showMessage({
        description: `${userName}さんを応援しました`,
        status: "success",
      });
    }
  }, [cheer]);

  return { cheer, onClickCheerUp };
};
