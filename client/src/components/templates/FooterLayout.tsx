import { memo, ReactNode } from "react";
import { Footer } from "../molcules/Footer";

export const FooterLayout = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <>
      {children}
      <Footer />
    </>
  );
});
