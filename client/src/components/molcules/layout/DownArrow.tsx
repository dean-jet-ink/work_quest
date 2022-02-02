import { memo } from "react";
import { Image } from "@chakra-ui/react";

import { MotionBox } from "../../../animation/MotionBox";
import downArrow from "../../../image/down_arrow.svg";

export const DownArrow = memo(() => {
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
      bottom={{ base: "-20px", md: "-30px" }}
    >
      <Image src={downArrow} boxSize={{ base: "50px", md: "65px" }} alt="" />
    </MotionBox>
  );
});
