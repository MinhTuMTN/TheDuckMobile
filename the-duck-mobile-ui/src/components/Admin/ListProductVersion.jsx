import styled from "@emotion/styled";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import FormatCurrency from "../FormatCurrency";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useTheme } from "@emotion/react";

const Items = [
  {
    id: 1,
    name: "Điện thoại SamSung Galaxy M31",
    creatAt: "20/10/2022",
    price: 100000000,
  },
  {
    id: 2,
    name: "Điện thoại iPhone 14 Pro Max 128GB",
    creatAt: "20/11/2023",
    price: 27290000,
  },
  {
    id: 3,
    name: "Laptop Dell Inspiron 14 T7430 i5 1335U/8GB/512GB/Touch/Pen/OfficeHS/Win11 (N7430I58W1) ",
    creatAt: "12/10/2021",
    price: 23290000,
  },
];

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "14px !important",
  paddingBottom: "14px !important",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "600 !important",
}));

const NoiDung = styled(Typography)(({ theme }) => ({
  fontSize: "14.5px !important",
  variant: "body1",
  fontWeight: "400 !important",
}));

const NameContainer = styled.div({
  overflow: "hidden",
});

const ButtonInPopover = styled(Button)(({ theme }) => ({
  color: "#101828",
  paddingX: 3,
  paddingY: 1,
  justifyContent: "flex-start",
}));

function ListProductVersion(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopup, setOpenPopup] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack>
      <BoxStyle
        sx={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <Grid container>
          <Grid item xs={6} sm={7}>
            <TieuDeCot>SẢN PHẨM</TieuDeCot>
          </Grid>
          <Grid item xs={3} sm={3} textAlign={"center"}>
            <TieuDeCot>NGÀY TẠO</TieuDeCot>
          </Grid>
          <Grid
            item
            xs={3}
            sm={2}
            sx={{
              textAlign: "center",
            }}
          >
            <TieuDeCot>TUỲ CHỌN</TieuDeCot>
          </Grid>
        </Grid>
      </BoxStyle>
      {Items.map((item) => (
        <BoxStyle key={item.id}>
          <Grid container>
            <Grid item xs={6} sm={7}>
              <NameContainer>
                <TieuDeCot
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "95%",
                  }}
                >
                  {item.name}
                </TieuDeCot>
                <NoiDung>
                  <FormatCurrency amount={item.price} />
                </NoiDung>
              </NameContainer>
            </Grid>

            <Grid item xs={3} sm={3} textAlign={"center"}>
              <NoiDung>{item.creatAt}</NoiDung>
            </Grid>
            <Grid item xs={3} sm={2} textAlign={"center"}>
              {isSmallScreen ? (
                // Hiển thị cho màn hình nhỏ
                <>
                  <IconButton
                    color="black"
                    aria-describedby={id}
                    onClick={handleClick}
                    sx={{
                      justifyContent: "center", // Đưa nút về giữa theo chiều ngang
                      alignItems: "center", // Đưa nút về giữa theo chiều dọc
                    }}
                  >
                    <MoreVertIcon color="black" />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Stack direction={"column"} justifyContent={"left"}>
                      <ButtonInPopover
                        variant="text"
                        size="medium"
                        onClick={(e) => {
                          setOpenPopup(true);
                        }}
                      >
                        Chỉnh sửa
                      </ButtonInPopover>
                      <ButtonInPopover
                        variant="text"
                        size="medium"
                        onClick={(e) => {}}
                      >
                        Xoá
                      </ButtonInPopover>
                    </Stack>
                  </Popover>
                </>
              ) : (
                // Hiển thị cho màn hình vừa và lớn
                <>
                  <IconButton
                    color="black"
                    onClick={(e) => {
                      // Xử lý sự kiện cho nút "Chỉnh sửa"
                      setOpenPopup(true);
                    }}
                  >
                    <ModeEditIcon color="black" />
                  </IconButton>
                  <IconButton color="black" onClick={(e) => {}}>
                    <DeleteOutlinedIcon color="black" />
                  </IconButton>
                </>
              )}
            </Grid>
          </Grid>
        </BoxStyle>
      ))}
    </Stack>
  );
}

export default ListProductVersion;
