import React, { Fragment } from "react";
import Sliders from "../components/Sliders";
import homeImg from "../assets/home-1.png";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const HomeImageContainer = styled(Box)(({ theme }) => ({
  padding: "10px 150px 10px 150px",
}));
const HomeImage = styled('div')(({ theme }) => ({
  backgroundSize: "cover",
  backgroundRepeat: 'no-repeat',
  height: '600px',
  width: '100%',
  borderRadius: "10px",
  backgroundImage: `url(${homeImg})`,
}));

function Home(props) {
  return (
    <Fragment>
      <HomeImageContainer>
        <HomeImage />
      </HomeImageContainer>
      <Sliders />

      {/* <BannerOne spaceTopClass="pt-60" spaceBottomClass="pb-65" />
       
        <TabProductFive spaceBottomClass="pb-60" category="accessories" /> */}
    </Fragment>
  )
};
export default Home;
