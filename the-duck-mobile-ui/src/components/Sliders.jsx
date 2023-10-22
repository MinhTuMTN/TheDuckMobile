import { styled } from "@mui/material/styles";
import React from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img1 from "../assets/slider/img1-1.png";
import img2 from "../assets/slider/img2-1.png";
import img3 from "../assets/slider/img3-1.png";
import img4 from "../assets/slider/img4-1.png";
import { Box } from "@mui/material";


const Image = styled('div')(({ theme, image }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    height: '160px',
    width: '535px',
    borderRadius: "25px",
    backgroundImage: `url(${image})`,
}));

const SlideContainer = styled(Box)(({ theme }) => ({
    padding: "0 200px 200px 200px",

}));

const sliderImages = [
    img1,
    img2,
    img3,
    img4,
]

const Sliders = () => {

    return (
        <SlideContainer>
            <Slide
                duration={3000}
                transitionDuration={500}
                slidesToShow={2}
                slidesToScroll={2}
                indicators={{
                    '1': 'img1',
                    '2': 'img2',
                    '3': 'img3',
                    '4': 'img4'
                }}
            >
                {sliderImages.map((silderImage, index) => {
                    return (
                        <Image key={index} image={silderImage} />
                    )
                })}
            </Slide>
        </SlideContainer>
    );
};

export default Sliders;
