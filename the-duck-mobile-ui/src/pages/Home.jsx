import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Helmet } from "react-helmet-async";
import FadeSlider from "../components/FadeSlider";
import HomeCatalogs from "../components/HomeCatalogs";
import TabProducts from "../components/TabProducts";

// const HomeImage = styled("div")(({ theme }) => ({
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   height: "620px",
//   width: "100%",
//   borderRadius: "10px",
//   backgroundImage: `url(${homeImg})`,
//   "&:hover": {
//     cursor: "pointer",
//   },
// }));

const HomeContainer = styled(Box)(({ theme }) => ({
  width: "80%",
  margin: "0 auto",
}));

function Home(props) {
  const urlsSlider = [
    "https://res.cloudinary.com/dccypeoxt/image/upload/v1698738317/Light_Blue_Modern_Laptop_Sale_Facebook_Cover_1_xsaocd.png",
    "https://res.cloudinary.com/dccypeoxt/image/upload/v1698738317/Blue_and_White_Modern_Smart_Phone_Blog_Banner_1_vlgxtm.png",
    "https://res.cloudinary.com/dccypeoxt/image/upload/v1698738316/Green_Smartwatch_Review_Youtube_Thumbnail_1_btn7p1.png",
  ];
  return (
    <>
      <Helmet>
        <title>Trang chủ | The Duck Mobile</title>
        <meta name="description" content="Trang chủ" />
      </Helmet>
      <HomeContainer>
        <FadeSlider fadeImages={urlsSlider} height={"500rem"} />

        <HomeCatalogs />

        <TabProducts />
      </HomeContainer>
    </>
  );
}
export default Home;
