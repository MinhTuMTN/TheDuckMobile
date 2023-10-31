import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductInformation from "../components/ProductInformation";
import Unit from "../components/Unit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MuiTextFeild from "../components/MuiTextFeild";
import HomeDeliver from "../components/HomeDeliver";
import AtStoreDeliver from "../components/AtStoreDeliver";

const Wrapped = styled.div`
  color: rgba(0, 0, 0, 0.65);
  padding-top: 64px;
`;
const Container = styled(Paper)`
  display: block;
  width: 40%;
  background: #ffff;
  margin: 0px auto;
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

function BuyProduct(props) {
  const [selectedOption, setSelectedOption] = useState("AtHome"); // Mặc định là 'Giao tận nơi'

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <Wrapped>
      <Container elevation={4}>
        <Box
          paddingLeft={4}
          paddingRight={4}
          sx={{
            paddingBottom: "0.4rem",
            borderBottom: "1px solid #838080",
          }}
        >
          {/* Phần tiêu đề */}
          <Stack
            direction={"row"}
            marginBottom={"2.5rem"}
            alignItems={"center"}
          >
            <IconButton aria-label="back">
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h4" textAlign={"center"} width={"100%"}>
              Giỏ Hàng Của Bạn
            </Typography>
          </Stack>

          {/* Phần thông tin sản phẩm */}
          <Stack direction={"column"} spacing={3}>
            <ProductInformation color={"red"} fontWeight={"bold"} />
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} spacing={1}>
                <Typography variant={"textcustom"}>Tạm tính</Typography>
                <Typography variant={"textcustom"}>(1 sản phẩm):</Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography variant={"textcustom"}>39.000.000</Typography>
                <Unit />
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Stack
          direction={"column"}
          paddingLeft={4}
          paddingRight={4}
          paddingTop={2}
          spacing={0}
        >
          <Typography
            variant={"h6"}
            fontWeight={"600"}
            style={{
              fontSize: "16px",
            }}
          >
            THÔNG TIN KHÁCH HÀNG
          </Typography>
          <FormControl>
            <RadioGroup row name="row-radio-buttons-group">
              <FormControlLabel
                value="female"
                className="custom-radio"
                control={<Radio size="small" />}
                label={<span style={{ fontSize: "14px" }}>Anh</span>}
              />
              <FormControlLabel
                value="male"
                control={<Radio size="small" />}
                label={<span style={{ fontSize: "14px" }}>Chị</span>}
              />
            </RadioGroup>
          </FormControl>
          <Grid container direction={"row"} spacing={2}>
            <Grid item xs={7}>
              <MuiTextFeild
                required
                variant="outlined"
                fullWidth
                label="Họ tên"
                size="medium"
                fontSize={"14px"}
              />
            </Grid>
            <Grid item xs={5}>
              <MuiTextFeild
                required
                variant="outlined"
                fullWidth
                label="Số điện thoại"
                size="medium"
                fontSize={"14px"}
              />
            </Grid>
          </Grid>
        </Stack>
        <Stack
          direction={"column"}
          paddingLeft={4}
          paddingRight={4}
          paddingTop={3}
          spacing={0}
        >
          <Typography
            variant={"h6"}
            fontWeight={"600"}
            style={{
              fontSize: "16px",
            }}
          >
            CÁCH THỨC NHẬN HÀNG
          </Typography>
          <FormControl>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              value={selectedOption}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="AtHome"
                className="custom-radio"
                control={<Radio size="small" />}
                label={<span style={{ fontSize: "14px" }}>Giao tận nơi</span>}
              />
              <FormControlLabel
                value="AtStore"
                control={<Radio size="small" />}
                label={
                  <span style={{ fontSize: "14px" }}>Nhận tại cửa hàng</span>
                }
              />
            </RadioGroup>
          </FormControl>
          {selectedOption === "AtHome" && <HomeDeliver />}
          {selectedOption === "AtStore" && <AtStoreDeliver />}
        </Stack>
      </Container>
    </Wrapped>
  );
}

export default BuyProduct;
