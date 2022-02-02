import { memo, ReactNode } from "react";
import { Footer } from "../../molcules/layout/Footer";
import { HeaderGoBack } from "../../organisms/_common/HeaderGoBack";

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
