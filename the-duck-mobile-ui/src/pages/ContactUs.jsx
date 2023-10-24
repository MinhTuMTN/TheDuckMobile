import {
  BusinessOutlined,
  EmailOutlined,
  Facebook,
  Instagram,
  PhoneOutlined,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import CustomLink from "../components/CustomLink";
import MuiTextFeild from "../components/MuiTextFeild";

function ContactUs(props) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      mt={10}
      mb={10}
    >
      <Helmet>
        <title>Liên hệ | The Duck Mobile</title>
        <meta name="description" content="Giỏ hàng của bạn" />
      </Helmet>
      <Grid
        container
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
        }}
        mt={10}
        mb={10}
      >
        <Grid
          item
          xs={12}
          sm={4}
          component={Paper}
          elevation={3}
          p={2}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
        >
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Icon style={{ transform: "scale(1.5)" }}>
              <PhoneOutlined />
            </Icon>
            <Stack>
              <Typography variant="body2" component="h5">
                +84 123 456 789
              </Typography>
              <Typography variant="body2" component="h5">
                +84 123 456 789
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Icon style={{ transform: "scale(1.5)" }}>
              <EmailOutlined />
            </Icon>
            <Stack>
              <CustomLink to={"mailto:theduckmobile@theduckmobile.com"}>
                <Typography variant="body2" component="h5">
                  theduckmobile@theduckmobile.com
                </Typography>
              </CustomLink>
            </Stack>
          </Stack>

          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Icon style={{ transform: "scale(1.5)" }}>
              <BusinessOutlined />
            </Icon>
            <Stack>
              <Typography variant="body2" component="h5">
                1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} direction={"column"} alignItems={"center"}>
            <Typography
              variant="h4"
              component="h5"
              textTransform={"uppercase"}
              color={"gray"}
            >
              Theo dõi chúng tôi trên
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-evenly"}
              width={"50%"}
            >
              <Facebook style={{ fontSize: "2rem" }} />
              <YouTube style={{ fontSize: "2rem" }} />
              <Instagram style={{ fontSize: "2rem" }} />
              <Twitter style={{ fontSize: "2rem" }} />
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          component={Paper}
          marginLeft={2}
          p={2}
          elevation={3}
        >
          <Typography variant="h5" component="h2" mb={1}>
            Liên hệ với chúng tôi
          </Typography>
          <Divider />
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
              <MuiTextFeild
                fontSize={15}
                size="medium"
                label="Họ và tên"
                variant="outlined"
                required
              />
              <MuiTextFeild
                fontSize={15}
                label="Email"
                variant="outlined"
                required
              />
            </Stack>
            <MuiTextFeild
              fontSize={15}
              label="Tiêu đề"
              variant="outlined"
              required
            />
            <MuiTextFeild
              fontSize={15}
              label="Nội dung"
              variant="outlined"
              multiline
              rows={4}
              required
            />
            <Button
              variant="contained"
              color="color2"
              style={{ color: "white" }}
            >
              Gửi
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactUs;
