import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function FadeSlider(props) {
  const { fadeImages, height } = props;
  return (
    <div className="slide-container">
      <Fade duration={2000}>
        {fadeImages?.map((fadeImage, index) => (
          <div key={`fade-slider-${index}`}>
            <img
              style={{ width: "100%" }}
              alt="fade-slider"
              src={fadeImage}
              height={height}
            />
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default FadeSlider;
