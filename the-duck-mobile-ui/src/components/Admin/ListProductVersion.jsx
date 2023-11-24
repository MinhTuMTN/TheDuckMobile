import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import React, { useState } from "react";
import FormatCurrency from "../FormatCurrency";
import FormatDate from "../FormatDate";

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
  const { productVersions } = props;
  const [anchorEl, setAnchorEl] = useState(null);

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
      {productVersions?.map((item, index) => (
        <BoxStyle key={index}>
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
                  {item.versionName}
                </TieuDeCot>
                <NoiDung>
                  <FormatCurrency amount={item.price} />
                </NoiDung>
              </NameContainer>
            </Grid>

            <Grid item xs={3} sm={3} textAlign={"center"}>
              <NoiDung><FormatDate dateTime={item.createdAt} /></NoiDung>
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
                      <ButtonInPopover variant="text" size="medium">
                        Chỉnh sửa
                      </ButtonInPopover>
                      <ButtonInPopover
                        variant="text"
                        size="medium"
                        onClick={(e) => { }}
                      >
                        Xoá
                      </ButtonInPopover>
                    </Stack>
                  </Popover>
                </>
              ) : (
                // Hiển thị cho màn hình vừa và lớn
                <>
                  <IconButton color="black" onClick={(e) => { }}>
                    <ModeEditIcon color="black" />
                  </IconButton>
                  <IconButton color="black" onClick={(e) => { }}>
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
