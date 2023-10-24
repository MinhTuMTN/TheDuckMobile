import styled from "@emotion/styled";
import React from "react";
import CustomBreadcrumb from "../components/CustomBreadcrumb";
import {
  Box,
  Card,
  Grid,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

const Wrapper = styled.div``;
const ShopArea = styled.div`
  padding-top: 30px;
  color: rgba(0, 0, 0, 0.65);
  padding-bottom: 100px;
`;

const Container = styled.div`
  display: block;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
  overflow: hidden;

  @media (min-width: 960px) {
    max-width: 1100px;
  }

  @media (max-width: 959px) and (min-width: 720px) {
    max-width: 720px;
  }

  @media (max-width: 719px) and (min-width: 540px) {
    max-width: 540px;
  }
`;
const PageContainer = styled.div`
  width: 100%;
  padding-right: 0;
  margin-bottom: 5rem;
`;

const RadioCustom = styled(Radio)`
  accent-color: #232323;
`;
function ProductDetails(props) {
  const urlImage =
    "https://minhtumtn.github.io/Demo-Template/assets/img/product/fashion/1.jpg";

  const [value, setValue] = React.useState(2);
  return (
    <Wrapper>
      <CustomBreadcrumb />
      <ShopArea>
        <Container>
          <PageContainer>
            <Grid direction={"row"} container width={"100%"}>
              <Grid
                container
                item
                md={6}
                xs={12}
                direction={"column"}
                height={"700px"}
                paddingLeft={"15px"}
                paddingRight={"15px"}
              >
                <Grid item xs={8} width={"100%"} overflow={"hidden"}>
                  <Card sx={{ height: "100%" }}>
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        backgroundImage: `url(${urlImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></Box>
                  </Card>
                </Grid>
                <Grid item xs={2} width={"100%"} overflow={"hidden"}>
                  <div>Day la o bo slider</div>
                </Grid>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                direction={"column"}
                //style={{ backgroundColor: "yellow" }}

                paddingLeft={"15px"}
                paddingRight={"15px"}
              >
                <Stack
                  direction={"column"}
                  width={"100%"}
                  sx={{
                    marginLeft: {
                      xs: "0",
                      md: "10%",
                    },
                  }}
                >
                  <Typography
                    variant={"h4"}
                    color={"#121111ca"}
                    fontWeight="150"
                  >
                    Sound Intone I65 Earphone White Version
                  </Typography>
                  <Box margin={"0.5% 0 3%"}>
                    <span
                      style={{
                        fontSize: "24px",
                        color: "#fe5252",
                        marginRight: "20px",
                      }}
                    >
                      $11.2{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#333333",
                        textDecoration: "line-through",
                      }}
                    >
                      $12.2
                    </span>
                  </Box>
                  <Box
                    marginBottom={"2rem"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Rating
                      name="rating"
                      precision={0.5}
                      size="medium"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    <span style={{ marginLeft: "10px" }}>(3 Reviews)</span>
                  </Box>
                  <div
                    style={{
                      marginBottom: "2.5rem",
                      marginTop: "20px",
                      paddingBottom: "37px",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color={"#121111ca"}
                      style={{
                        fontSize: "15px",
                        width: "95%",
                        textAlign: "justify",
                      }}
                      component={"p"}
                    >
                      Học ngay 40 đoạn hội thoại tiếng Anh giao tiếp thông dụng
                      trong đời sống sau đây để cải thiện trình độ tiếng Anh
                      nhé. Chắc chắn rằng sau khi học xong bài viết này, bạn sẽ
                      up level ngay lập tức mà bạn không kịp nhận ra, đừng quên
                      bookmark để lưu học dần mỗi ngày nha! Nếu bạn đang muốn
                      tăng khả năng phản xạ khi giao tiếp bằng Tiếng Anh thì
                      việc học các đoạn hội thoại thông dụng là rất cần thiết.
                      Dưới đây là 70 đoạn hội thoại Tiếng Anh cơ bản thông dụng
                      sử dụng hàng ngày, công sở, du lịch. Những đoạn hội thoại
                      này sẽ giúp bạn up level ngay trong 1 tuần.
                    </Typography>
                  </div>
                  <Stack direction={"row"}>
                    <Box style={{ marginRight: "20px" }}>
                      <Typography variant={"h6"}>Color</Typography>
                      <RadioGroup>
                        <Typography
                          variant="div"
                          component={"input"}
                          type="radio"
                          name="color"
                          value="red"
                          style={{ color: "red" }}
                        />
                      </RadioGroup>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </PageContainer>
        </Container>
      </ShopArea>
    </Wrapper>
  );
}

export default ProductDetails;
