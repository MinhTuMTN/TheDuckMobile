import styled from "@emotion/styled";
import {
  FacebookOutlined,
  InfoOutlined,
  Instagram,
  LocationOnOutlined,
  PhoneOutlined,
  Twitter,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import MuiTextFeild from "../components/MuiTextFeild";
import Logo from "./Logo";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "#f6f6f8",
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  textAlign: "center",
  marginTop: "auto",

  display: "flex",
  justifyContent: "space-between",
}));

const Item = styled(List)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
}));

const StyledLogo = styled(Logo)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

function Footer(props) {
  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        flex={1}
        alignItems="center"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <StyledLogo />
          <Typography variant="body1">The Duck Mobile</Typography>
        </Stack>
        <Typography
          component={"span"}
          sx={{
            fontSize: "0.7rem !important",
            textAlign: "left",
          }}
        >
          Copyright ©2023 The Duck Mobile
        </Typography>
        <Typography
          component={"span"}
          sx={{
            fontSize: "0.7rem !important",
            textAlign: "left",
          }}
        >
          All rights reserved.
        </Typography>
      </Stack>
      <Item>
        <ListItem disablePadding>
          <Typography variant="body1" fontWeight="bold">
            ABOUT US
          </Typography>
        </ListItem>
        <Divider
          sx={{
            width: "90%",
            height: "1px",
          }}
        />
        <ListItem disablePadding>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="About us" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <LocationOnOutlined />
          </ListItemIcon>
          <ListItemText primary="Store location" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <PhoneOutlined />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
      </Item>
      <Item>
        <ListItem disablePadding>
          <Typography variant="body1" fontWeight="bold">
            FOLLOW US
          </Typography>
        </ListItem>
        <Divider
          sx={{
            width: "90%",
            height: "1px",
          }}
        />
        <ListItem disablePadding>
          <ListItemIcon>
            <FacebookOutlined />
          </ListItemIcon>
          <ListItemText primary="Facebook" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <Twitter />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <Instagram />
          </ListItemIcon>
          <ListItemText primary="Instagram" />
        </ListItem>
      </Item>
      <Item>
        <ListItem disablePadding>
          <Typography variant="body1" fontWeight="bold">
            SUBCRIBE
          </Typography>
        </ListItem>
        <Divider
          sx={{
            width: "90%",
            height: "1px",
          }}
        />
        <Stack spacing={1}>
          <Typography
            sx={{
              fontWeight: "0 !important",
              fontSize: "0.7rem !important",
              textAlign: "left",
            }}
          >
            Đăng ký nhận email để nhận các thông báo mới nhất về các sản phẩm
            mới và khuyến mãi hấp dẫn
          </Typography>
          <MuiTextFeild
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              fontSize: "0.7rem !important",
              width: "35%",
              backgroundColor: "color1.main",
            }}
          >
            Đăng ký
          </Button>
        </Stack>
      </Item>
    </Container>
  );
}

export default Footer;
