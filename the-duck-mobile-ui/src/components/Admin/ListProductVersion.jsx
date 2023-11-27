import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
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
import {
  deleteProductVersion,
  restoreProductVersion,
} from "../../services/Admin/ProductVersionService";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import DialogConfirm from "../DialogConfirm";

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
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
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

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedProductVersionId, setSelectedProductVersionId] =
    useState(null);
  const handleDeleteProductVersion = async (productVersionId) => {
    const response = await deleteProductVersion(productVersionId);

    if (response.success) {
      enqueueSnackbar("Xóa phiên bản sản phẩm thành công", {
        variant: "success",
      });
      // Refresh lại trang
      navigate(0, { replace: true });
    } else {
      enqueueSnackbar("Xóa phiên bản sản phẩm thất bại", {
        variant: "error",
      });
    }
  };

  const handleRestoreProductVersion = async (productVersionId) => {
    const response = await restoreProductVersion(productVersionId);

    if (response.success) {
      enqueueSnackbar("Khôi phục phiên bản sản phẩm thành công", {
        variant: "success",
      });
      // Refresh lại trang
      navigate(0, { replace: true });
    } else {
      enqueueSnackbar("Khôi phục phiên bản sản phẩm thất bại", {
        variant: "error",
      });
    }
  };

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
              <NoiDung>
                <FormatDate dateTime={item.createdAt} />
              </NoiDung>
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
                        onClick={() => {
                          navigate(
                            `/admin/product-management/product-version/${item.productVersionId}`,
                            {
                              state: {
                                productId: item.productId,
                              },
                            }
                          );
                        }}
                      >
                        Chỉnh sửa
                      </ButtonInPopover>
                      <ButtonInPopover
                        variant="text"
                        size="medium"
                        onClick={(e) => {
                          if (item.isDeleted) setIsDelete(false);
                          else setIsDelete(true);

                          setOpenDialogConfirm(true);
                          setSelectedProductVersionId(item.productVersionId);
                        }}
                      >
                        {item.isDeleted ? "Khôi phục" : "Xóa"}
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
                      navigate(
                        `/admin/product-management/product-version/${item.productVersionId}`,
                        {
                          state: {
                            productId: item.productId,
                          },
                        }
                      );
                    }}
                  >
                    <ModeEditIcon color="black" />
                  </IconButton>
                  <IconButton
                    color="black"
                    onClick={(e) => {
                      if (item.isDeleted) setIsDelete(false);
                      else setIsDelete(true);

                      setOpenDialogConfirm(true);
                      setSelectedProductVersionId(item.productVersionId);
                    }}
                  >
                    {item.isDeleted ? (
                      <RestoreFromTrashOutlinedIcon color="black" />
                    ) : (
                      <DeleteOutlinedIcon color="black" />
                    )}
                  </IconButton>
                </>
              )}
            </Grid>
          </Grid>
        </BoxStyle>
      ))}

      <DialogConfirm
        open={openDialogConfirm}
        cancelText={"Hủy"}
        content={
          isDelete
            ? "Bạn có chắc chắn muốn xóa phiên bản sản phẩm này?"
            : "Bạn có chắc chắn muốn khôi phục phiên bản sản phẩm này?"
        }
        onOk={
          isDelete
            ? () => handleDeleteProductVersion(selectedProductVersionId)
            : () => handleRestoreProductVersion(selectedProductVersionId)
        }
        onCancel={() => setOpenDialogConfirm(false)}
        okText={isDelete ? "Xóa" : "Khôi phục"}
        title={
          isDelete ? "Xóa phiên bản sản phẩm" : "Khôi phục phiên bản sản phẩm"
        }
        onClose={() => setOpenDialogConfirm(false)}
      />
    </Stack>
  );
}

export default ListProductVersion;
