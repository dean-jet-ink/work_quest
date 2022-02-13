import multer from "multer";

export const fileParser = multer({ dest: "/server/tmp/" });
