import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import TablePaginationActions from "../../../components/TablePaginationActions";

import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";

import MuiTextFeild from "../../../components/MuiTextFeild";
import { DataContext } from "../../../layouts/AdminLayout";
import { enqueueSnackbar } from "notistack";
import DialogConfirm from "../../../components/DialogConfirm";
import { addSpecialFeature, deleteSpecialFeature, restoreSpecialFeature, updateSpecialFeature } from "../../../services/Admin/SpecialFeatureService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "15px",
  height: "2.5rem",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

const CellHead = styled(TableCell)(({ theme }) => ({
  fontSize: "18px",
  paddingY: "0.2rem ",
}));

const CellBody = styled(TableCell)(({ theme }) => ({
  fontSize: "15px !important",
  paddingX: "0",
  paddingY: "0",
}));

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

function SpecialFeatureListPage() {
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [addNew, setAddNew] = useState(true);
  const [specialFeatureId, setSpecialFeatureId] = useState("");
  const [isDeleted, setIsDeleted] = useState();
  const [index, setIndex] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState({
    status: false,
    errorMessage: {
      specialFeatureName: "",
    },
  });

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

  const filterRows = useCallback(
    (searchString) => {
      setPage(0);
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.specialFeatureName.toLowerCase().includes(searchString.toLowerCase())
      );
    },
    [dataFetched]
  );

  useEffect(() => {
    const filtered = filterRows(searchString);
    setRowsSearched(filtered);
  }, [searchString, filterRows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Điều này sẽ kiểm tra nếu màn hình lớn hơn hoặc bằng lg breakpoint

  const handleSendRequest = async () => {
    let validData = true;
    if (!name || name.trim().length === 0) {
      validData = false;
      setError((prev) => {
        return {
          status: true,
          errorMessage: {
            specialFeatureName: "Tên tính năng không được để trống",
          }
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          errorMessage: {
            specialFeatureName: "",
          }
        };
      });
    }

    if (!validData) {
      return;
    }

    setError({
      status: false,
      errorMessage: {
        specialFeatureName: "",
      }
    });

    let response;
    if (addNew) {
      response = await addSpecialFeature({
        specialFeatureName: name,
      });

      if (response.success) {
        enqueueSnackbar("Thêm tính năng thành công", { variant: "success" });
        setOpenPopup(false);
        window.location.reload();
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    } else {
      response = await updateSpecialFeature(specialFeatureId, {
        specialFeatureName: name,
      });

      if (response.success) {
        enqueueSnackbar("Chỉnh sửa tính năng thành công", { variant: "success" });
        setOpenPopup(false);
        window.location.reload();
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  };

  const handleTrashButtonClick = async () => {
    let response;
    const specialFeatures = [...dataFetched];
    if (isDeleted) {
      response = await restoreSpecialFeature(specialFeatureId);
      if (response.success) {
        enqueueSnackbar("Mở khóa tính năng thành công!", { variant: "success" });
        specialFeatures[index + page * rowsPerPage].isDeleted = !isDeleted;
        setRowsSearched(specialFeatures);
      } else {
        enqueueSnackbar("Mở khóa tính năng thất bại!", { variant: "error" });
      }
    } else {
      response = await deleteSpecialFeature(specialFeatureId);
      if (response.success) {
        enqueueSnackbar("Khóa tính năng thành công!", { variant: "success" });
        specialFeatures[index + page * rowsPerPage].isDeleted = !isDeleted;
        setRowsSearched(specialFeatures);
      } else {
        enqueueSnackbar("Khóa tính năng thất bại!", { variant: "error" });
      }
    }
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
    setError({
      error: false,
      errorMessage: {
        specialFeatureName: "",
      }
    });
  }

  return (
    <Grid
      container
      sx={{
        py: 3,
        px: isFullScreen ? 8 : 3,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Grid item xs={12} mb={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: ["20px", "28px"],
            }}
            fontWeight="700"
            paddingX={2}
            paddingBottom={2}
          >
            Danh sách tính năng
          </Typography>
          <CustomButton
            variant="contained"
            size="medium"
            startIcon={<AddOutlinedIcon />}
            onClick={() => {
              setAddNew(true);
              setOpenPopup(true);
              setName("");
              setError({
                error: false,
                errorMessage: {
                  specialFeatureName: "",
                }
              });
            }}
          >
            Thêm tính năng mới
          </CustomButton>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: "25px",
          }}
          spacing={"2px"}
        >
          <Box
            sx={{
              padding: 2,
              borderRadius: "25px 25px 0 0 ",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <SearchTextField
              fullWidth
              variant="outlined"
              placeholder="Tìm kiếm theo tên tính năng"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                style: { fontSize: 14 },
              }}
            />
          </Box>

          <TableContainer
            sx={{
              paddingX: 3,
              borderRadius: "0 0 25px 25px ",
            }}
            component={Paper}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <CellHead
                    align="center"
                    sx={{
                      width: "50%",
                    }}
                  >
                    Tên tính năng
                  </CellHead>
                  <CellHead
                    align="center"
                    sx={{
                      width: "30%",
                    }}
                  >
                    Trạng thái
                  </CellHead>
                  <CellHead
                    align="center"
                    sx={{
                      width: "20%",
                    }}
                  >
                    Tuỳ Chọn
                  </CellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rowsSearched.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : rowsSearched
                ).map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      paddingY: "0",
                    }}
                  >
                    <CellBody
                      style={{ width: "50%" }}
                      align="center"
                    >
                      {row.specialFeatureName}
                    </CellBody>
                    <CellBody
                      style={{ width: "30%" }}
                      align="center"
                    >
                      {row.isDeleted ? "Khóa" : "Còn hoạt động"}
                    </CellBody>
                    <CellBody
                      style={{
                        minWidth: 50,
                        fontSize: "14px",
                      }}
                      align="center"
                    >
                      {isSmallScreen ? (
                        // Hiển thị cho màn hình nhỏ
                        <>
                          <IconButton
                            color="black"
                            aria-describedby={id}
                            onClick={handleClick}
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
                            <Stack direction={"column"}>
                              <Button
                                variant="text"
                                size="medium"
                                onClick={(e) => {
                                  setOpenPopup(true);
                                  setSpecialFeatureId(row.specialFeatureId);
                                  setName(row.specialFeatureName);
                                  setAddNew(false);
                                  setError({
                                    error: false,
                                    errorMessage: {
                                      specialFeatureName: "",
                                    }
                                  });
                                }}
                                sx={{
                                  paddingX: 2,
                                  paddingY: 1,
                                  textAlign: "left",
                                }}
                              >
                                Chỉnh sửa
                              </Button>
                              <Button
                                variant="text"
                                size="medium"
                                sx={{
                                  paddingX: 2,
                                  paddingY: 1,
                                  textAlign: "left",
                                }}
                                onClick={(e) => {
                                  setIndex(i);
                                  setSpecialFeatureId(row.specialFeatureId);
                                  setIsDeleted(row.isDeleted);
                                  setDeleteDialog(true);
                                }}
                              >
                                {row.isDeleted ? "Mở khóa" : "Khóa"}
                              </Button>
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
                              setSpecialFeatureId(row.specialFeatureId);
                              setName(row.specialFeatureName);
                              setAddNew(false);
                              setError({
                                error: false,
                                errorMessage: {
                                  specialFeatureName: "",
                                }
                              });
                            }}
                          >
                            <ModeEditIcon color="black" />
                          </IconButton>
                          <IconButton
                            color="black"
                            onClick={(e) => {
                              setIndex(i);
                              setSpecialFeatureId(row.specialFeatureId);
                              setIsDeleted(row.isDeleted);
                              setDeleteDialog(true);
                            }}
                          >
                            {/* <InfoOutlinedIcon color="black" /> */}
                            {row.isDeleted ? <RestoreFromTrashIcon color="black" /> : <DeleteIcon color="black" />}
                          </IconButton>
                        </>
                      )}
                    </CellBody>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={10}
                    count={rowsSearched.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    sx={{ fontSize: 10 }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Stack>
      </Grid>

      <DialogConfirm
        open={deleteDialog}
        title={isDeleted ? "Mở khóa tính năng" : "Khóa tính năng"}
        content={
          isDeleted
            ? "Bạn có chắc chắn muốn mở khóa tính năng này"
            : "Bạn có chắc chắn muốn khóa tính năng này?"
        }
        okText={isDeleted ? "Mở khóa" : "Khóa"}
        cancelText={"Hủy"}
        onOk={handleTrashButtonClick}
        onCancel={() => setDeleteDialog(false)}
        onClose={() => setDeleteDialog(false)}
      />

      <BootstrapDialog
        open={openPopup}
        onOk={() => { }}
        onClose={handlePopupClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {addNew ? "Thêm tính năng mới" : "Chỉnh sửa tính năng"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handlePopupClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <MuiTextFeild
            label="Tên tính năng"
            value={name}
            margin="normal"
            autoFocus
            style={{
              minWidth: "300px",
            }}
            error={error.status && error.errorMessage.specialFeatureName?.length !== 0}
            helperText={error.errorMessage.specialFeatureName}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSendRequest}>
            {addNew ? "Tạo mới" : "Cập nhật"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Grid>
  );
}

export default SpecialFeatureListPage;
