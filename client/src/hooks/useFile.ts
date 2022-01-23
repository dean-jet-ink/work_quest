import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useFile = (src: string) => {
  const [file, setFile] = useState("");

  useEffect(() => {
    setFile(src);
  }, [src]);

  const fileLoad = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        const selectFiles = e.currentTarget.files;
        if (selectFiles.length > 0) {
          const fr = new FileReader();
          fr.readAsDataURL(selectFiles[0]);
          fr.onload = () => {
            setFile(fr.result as string);
          };
        }
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );

  return { fileLoad, file, setFile };
};
