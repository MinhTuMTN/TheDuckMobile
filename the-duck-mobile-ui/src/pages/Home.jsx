import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Helmet } from "react-helmet-async";
import homeImg from "../assets/home-1.png";
import HomeCatalogs from "../components/HomeCatalogs";
import Sliders from "../components/Sliders";
import TabProducts from "../components/TabProducts";

const HomeImage = styled("div")(({ theme }) => ({
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "620px",
  width: "100%",
  borderRadius: "10px",
  backgroundImage: `url(${homeImg})`,
  "&:hover": {
    cursor: "pointer",
  },
}));

const HomeContainer = styled(Box)(({ theme }) => ({
  width: "80%",
  margin: "0 auto",
}));

function Home(props) {
  return (
    <>
      <Helmet>
        <title>Trang chủ | The Duck Mobile</title>
        <meta name="description" content="Trang chủ" />
      </Helmet>
      <HomeContainer>
        <HomeImage />
        <Sliders />

        <HomeCatalogs />

        <TabProducts />
      </HomeContainer>
    </>
  );
}
export default Home;
