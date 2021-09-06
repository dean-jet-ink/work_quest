import { memo } from "react";
import { Image } from "@chakra-ui/react";

import { MotionBox } from "../../animation/MotionBox";
import down_arrow from "../../image/down_arrow.svg";

type Props = {
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
};

export const DownArrow = memo((props: Props) => {
  const { top, bottom, right, left } = props;

  return (
    <MotionBox
      as="div"
      animate={{
        translateY: [0, 20, 0],
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1.3,
      }}
      position="absolute"
      top={top}
      bottom={bottom}
      right={right}
      left={left}
    >
      <Image src={down_arrow} boxSize="50px" alt="" />
    </MotionBox>
  );
});
