import React from "react";
import Sliders from "../components/Sliders";
import homeImg from "../assets/home-1.png";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import HomeCatalogs from "../components/HomeCatalogs";
import TabProducts from "../components/TabProducts";

const HomeImage = styled('div')(({ theme }) => ({
  backgroundSize: "cover",
  backgroundRepeat: 'no-repeat',
  height: '620px',
  width: '100%',
  borderRadius: "10px",
  backgroundImage: `url(${homeImg})`,
  "&:hover": {
    cursor: "pointer",
  }
}));

const HomeContainer = styled(Box)(({ theme }) => ({
  padding: "10px 120px 10px 120px",
}));

function Home(props) {
  return (
    <HomeContainer>
        <HomeImage />
      <Sliders />

      <HomeCatalogs />

      <TabProducts/>
    </HomeContainer>
  )
};
export default Home;
