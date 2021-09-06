import { memo, ReactNode } from "react";
import { Footer } from "../molcules/Footer";
import { HeaderGoBack } from "../organisms/HeaderGoBack";

export const SecondaryLayout = memo((props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <HeaderGoBack />
      {children}
      <Footer />
    </>
  );
});
