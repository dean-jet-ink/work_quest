import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactNode } from "react";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { Box } from "@chakra-ui/react";
import { Settings } from "react-slick";

type Props = {
  children: ReactNode[];
  color: string;
};

export const Slider = (props: Props) => {
  const { children, color } = props;

  const settings: Settings = {
    infinite: false,
    fade: true,
    dots: true,
    speed: 500,
    lazyLoad: "ondemand",
  };

  return <Slick {...settings}>{children}</Slick>;
};
