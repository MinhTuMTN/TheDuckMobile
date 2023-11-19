import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const SlideContainer = styled(Box)(({ theme }) => ({
  padding: "20px 0 5px 0",
}));

const StyledSlide = styled(Slide)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

Sliders.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  arrows: PropTypes.bool,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  urls: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
  infinite: PropTypes.bool,
  onClick: PropTypes.func,
};

Sliders.defaultProps = {
  duration: 3000,
  transitionDuration: 500,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  urls: [],
  width: "100%",
  height: "100%",
  infinite: true,
  onClick: () => {},
};

function Sliders(props) {
  const {
    duration,
    transitionDuration,
    slidesToShow,
    slidesToScroll,
    arrows,
    urls,
    width,
    height,
    infinite,
    onClick,
  } = props;
  return (
    <SlideContainer>
      <StyledSlide
        infinite={infinite}
        duration={duration}
        transitionDuration={transitionDuration}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        arrows={arrows}
      >
        {urls &&
          urls.map((url, index) => {
            return (
              <img
                key={"slider" + index}
                component={"img"}
                alt="slider"
                src={url}
                width={width}
                height={height}
                onClick={onClick}
              />
            );
          })}
      </StyledSlide>
    </SlideContainer>
  );
}

export default Sliders;
