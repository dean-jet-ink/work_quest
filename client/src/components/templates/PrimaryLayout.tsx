import { memo, ReactNode } from "react";
import { Footer } from "../molcules/Footer";
import { Header } from "../organisms/Header";

type Props = {
  onOpenProfile: () => void;
  onOpenCheer: () => void;
  src: string;
  children: ReactNode;
};

export const PrimaryLayout = memo((props: Props) => {
  const { onOpenProfile, onOpenCheer, src, children } = props;

  return (
    <>
      <Header
        onOpenProfile={onOpenProfile}
        onOpenCheer={onOpenCheer}
        src={src}
      />
      {children}
      <Footer />
    </>
  );
});
