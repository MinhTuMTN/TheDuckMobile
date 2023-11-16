import styled from "@emotion/styled/macro";
import { SearchOutlined } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Card, InputAdornment, Menu, Typography } from "@mui/material";
import React, { memo, useEffect } from "react";
import MuiTextFeild from "../components/MuiTextFeild";
import CustomLink from "./CustomLink";
import Logo from "./Logo";
import { getAllCatalog } from "../services/CatalogService";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100vw",
  backgroundColor: "white",
  display: "flex",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 100,
  boxShadow: "0 0 25px 0 rgba(0,0,0,.06)",
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2) + " " + theme.spacing(0),
  width: "80%",
  maxHeight: "80px",
  margin: "0 auto",
}));

const Left = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: 1,
}));

const Center = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: 2,
  justifyContent: "space-around",
}));

const Right = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flex: 2,
}));

const SubMenu = styled(Card)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: "0",
  display: "none",
  flexDirection: "column",
  textAlign: "left",
  backgroundColor: "#fff",
  boxShadow: "0 1px 7px -2px rgba(0,0,0,.3)",

  "& a": {
    fontSize: "0.8rem",
    padding: "7px 20px",
    display: "block",
  },
}));

const StyledLogo = styled(Logo)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginRight: "10px",
}));

const MenuItem = styled("span")(({ theme }) => ({
  position: "relative",
  "&:hover": {
    [SubMenu]: {
      display: "flex",
    },
  },
}));

const NavBar = ({ strings, menuWhiteClass, sidebarMenu }) => {
  const [catalogs, setCatalogs] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();
  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    const handleGetCatalogs = async () => {
      const response = await getAllCatalog();
      if (response.success) setCatalogs(response.data.data);
    };
    handleGetCatalogs();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Left>
          <CustomLink to={"/"}>
            <StyledLogo />
          </CustomLink>
          <Typography variant="h5" component="h1">
            <CustomLink to={"/"}>The Duck Mobile</CustomLink>
          </Typography>
        </Left>
        <Center>
          <MenuItem>
            <CustomLink to={"/"}>Trang chủ</CustomLink>
          </MenuItem>
          <MenuItem>
            <CustomLink onMouseOver={handleClick}>Danh mục</CustomLink>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              className="menu-dropdown"
            >
              {catalogs.map((item, index) => (
                <MenuItem style={{ padding: ".5rem" }} key={`catalog-${index}`}>
                  <CustomLink
                    to={`/catalog/${item.catalogURL}`}
                    fontWeight={"none"}
                  >
                    {item.catalogName}
                  </CustomLink>
                </MenuItem>
              ))}
            </Menu>
          </MenuItem>

          <MenuItem>
            <CustomLink to={"/contact"}>Liên hệ</CustomLink>
          </MenuItem>
        </Center>
        <Right>
          <MuiTextFeild
            id="search-box"
            placeholder="Tìm kiếm"
            variant="outlined"
            className="search-box"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchOutlined />
                </InputAdornment>
              ),
              style: {
                fontSize: "1rem",
              },
            }}
            sx={{
              marginRight: "5px",
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${searchText}`);
              }
            }}
          />

          <CustomLink to={"/cart"}>
            <ShoppingCartOutlinedIcon
              sx={{
                fontSize: "1.75rem",
                marginRight: "10px",
              }}
            />
          </CustomLink>
          <CustomLink to={"/profile"}>
            <AccountCircleOutlinedIcon
              sx={{
                fontSize: "1.75rem",
              }}
            />
          </CustomLink>
        </Right>
      </Container>
    </Wrapper>
  );
};

export default memo(NavBar);
