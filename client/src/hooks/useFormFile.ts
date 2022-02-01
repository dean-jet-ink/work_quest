import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useFormFile = (src: string) => {
  const [formFile, setFormFile] = useState("");

  useEffect(() => {
    setFormFile(src);
  }, [src]);

  const fileLoad = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        const selectFiles = e.currentTarget.files;
        if (selectFiles.length > 0) {
          const fr = new FileReader();
          fr.readAsDataURL(selectFiles[0]);
          fr.onload = () => {
            setFormFile(fr.result as string);
          };
        }
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [formFile]
  );

  return { fileLoad, formFile, setFormFile };
};
