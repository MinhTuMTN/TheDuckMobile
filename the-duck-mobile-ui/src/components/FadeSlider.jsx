import React from "react";
import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function FadeSlider(props) {
  const { fadeImages } = props;
  return (
    <div className="slide-container">
      <Slide>
        {fadeImages?.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: "100%" }} src={fadeImage.url} />
            <h2>{fadeImage.caption}</h2>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default FadeSlider;
