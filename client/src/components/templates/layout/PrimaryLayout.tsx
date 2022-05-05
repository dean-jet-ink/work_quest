import { memo, ReactNode } from "react";

import { Footer } from "../../molcules/layout/Footer";
import { Header } from "../../organisms/_common/Header";

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
