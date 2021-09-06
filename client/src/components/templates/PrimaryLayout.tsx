import { memo, ReactNode } from "react";
import { Footer } from "../molcules/Footer";
import { Header } from "../organisms/Header";

type Props = {
  onClick: () => void;
  src: string;
  children: ReactNode;
};

export const PrimaryLayout = memo((props: Props) => {
  const { onClick, src, children } = props;

  return (
    <>
      <Header onClick={onClick} src={src} />
      {children}
      <Footer />
    </>
  );
});
