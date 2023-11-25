import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Paper,
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
  Stack,
  Box,
  IconButton,
  Button,
  useMediaQuery,
  Popover,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useCallback, useContext, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../layouts/AdminLayout";
import FormatDate from "../../../components/FormatDate";
import { useTheme } from "@emotion/react";
import { addCoupon, updateCoupon } from "../../../services/Admin/CouponService";
import { enqueueSnackbar } from "notistack";
import DialogConfirm from "../../../components/DialogConfirm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& input": {
    height: "55px",
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

function CouponListPage() {
  dayjs.extend(utc);
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [addNew, setAddNew] = useState(true);
  const [existDialog, setExistDialog] = useState(false);
  const [couponId, setCouponId] = useState("");
  const [maxStartDate, setMaxStartDate] = useState(dayjs());
  const [error, setError] = useState({
    status: false,
    errorMessage: {
      couponCode: "",
      discount: "",
      minPrice: "",
      maxDiscount: "",
      maxUse: "",
    },
  });
  const [couponRequest, setCouponRequest] = useState({
    couponCode: "",
    discount: 1,
    minPrice: 1000,
    maxDiscount: 1000,
    maxUse: 1,
    startDate: dayjs(),
    endDate: dayjs(),
    currentUse: 0,
  });

  const navigate = useNavigate();

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
        row.couponCode.toLowerCase().includes(searchString.toLowerCase())
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

  const handleSendCouponRequest = async () => {
    let response;
    let startDateParse = dayjs(couponRequest.startDate);
    let endDateParse = dayjs(couponRequest.endDate);
    let endDateRequest = new Date(endDateParse.format("YYYY-MM-DD"));
    endDateRequest.setUTCHours(23, 59, 59, 0);

    if (addNew) {
      response = await addCoupon({
        couponCode: couponRequest.couponCode,
        discount: parseInt(couponRequest.discount),
        minPrice: parseFloat(couponRequest.minPrice),
        maxDiscount: parseFloat(couponRequest.maxDiscount),
        maxUse: parseInt(couponRequest.maxUse),
        startDate: new Date(startDateParse.format("YYYY-MM-DD")),
        endDate: endDateRequest,
        currentUse: 0,
      });

      if (response.success) {
        enqueueSnackbar("Thêm mã giảm giá thành công", { variant: "success" });
        setOpenPopup(false);
        navigate(0);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      }
    } else {
      response = await updateCoupon(couponId, {
        couponCode: couponRequest.couponCode,
        discount: parseInt(couponRequest.discount),
        minPrice: parseFloat(couponRequest.minPrice),
        maxDiscount: parseFloat(couponRequest.maxDiscount),
        maxUse: parseInt(couponRequest.maxUse),
        startDate: new Date(startDateParse.format("YYYY-MM-DD")),
        endDate: endDateRequest,
        currentUse: parseInt(couponRequest.currentUse),
      });
      if (response.success) {
        enqueueSnackbar("Chỉnh sửa mã giảm giá thành công", {
          variant: "success",
        });
        setOpenPopup(false);
        navigate(0);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      }
    }
  };

  const handleCheckExistCoupon = () => {
    let validData = true;
    if (!couponRequest.couponCode || couponRequest.couponCode.trim().length === 0) {
      validData = false;
      setError((prev) => {
        return {
          ...prev,
          status: true,
          errorMessage: {
            ...prev.errorMessage,
            couponCode: "Mã giảm giá không được để trống",
          }
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          errorMessage: {
            ...prev.errorMessage,
            couponCode: "",
          }
        };
      });
    }

    if (!couponRequest.discount) {
      validData = false;
      setError((prev) => {
        return {
          status: true,
          errorMessage: {
            ...prev.errorMessage,
            discount: "Giảm giá không được để trống",
          }
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          errorMessage: {
            ...prev.errorMessage,
            discount: "",
          }
        };
      });
    }

    if (!couponRequest.minPrice || couponRequest.minPrice.toString().trim().length === 0) {
      validData = false;
      setError((prev) => {
        return {
          status: true,
          errorMessage: {
            ...prev.errorMessage,
            minPrice: "Đơn tối thiểu không được để trống",
          }
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          errorMessage: {
            ...prev.errorMessage,
            minPrice: "",
          }
        };
      });
    }

    if (!couponRequest.maxDiscount || couponRequest.maxDiscount.toString().trim().length === 0) {
      validData = false;
      setError((prev) => {
        return {
          status: true,
          errorMessage: {
            ...prev.errorMessage,
            maxDiscount: "Giảm tối đa không được để trống",
          }
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          errorMessage: {
            ...prev.errorMessage,
            maxDiscount: "",
          }
        };
      });
    }

    if (!couponRequest.maxUse || couponRequest.maxUse.toString().trim().length === 0) {
      validData = false;
      setError((prev) => {
        return {
          status: true,
          errorMessage: {
            ...prev.errorMessage,
            maxUse: "Số lượng không được để trống",
          }
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          errorMessage: {
            ...prev.errorMessage,
            maxUse: "",
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
        couponCode: "",
        discount: "",
        minPrice: "",
        maxDiscount: "",
        maxUse: "",
      }
    });

    let existCoupon = dataFetched.some(coupon => coupon.couponCode === couponRequest.couponCode);
    if (existCoupon && addNew) {
      setExistDialog(existCoupon);
    } else {
      handleSendCouponRequest();
    }
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
    setError({
      error: false,
      errorMessage: {
        couponCode: "",
        discount: "",
        minPrice: "",
        maxDiscount: "",
        maxUse: "",
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
          <Typography variant="h3" paddingX={2} paddingBottom={2}>
            Danh sách mã giảm giá
          </Typography>
          <CustomButton
            variant="contained"
            size="medium"
            startIcon={<AddOutlinedIcon />}
            onClick={() => {
              setAddNew(true);
              setOpenPopup(true);
              setCouponRequest({
                couponCode: "",
                discount: 1,
                minPrice: 1000,
                maxDiscount: 1000,
                maxUse: 1,
                startDate: dayjs(),
                endDate: dayjs(),
              });
              setError({
                status: false,
                errorMessage: {
                  couponCode: "",
                  discount: "",
                  minPrice: "",
                  maxDiscount: "",
                  maxUse: "",
                }
              });
            }}
          >
            Thêm mã mới
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
              placeholder="Tìm kiếm theo mã"
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
                  <CellHead align="left">Mã Coupon</CellHead>
                  <CellHead
                    align="left"
                    sx={{
                      minWidth: "120px",
                    }}
                  >
                    Giảm giá
                  </CellHead>
                  <CellHead align="right">Còn lại</CellHead>
                  <CellHead
                    align="right"
                    sx={{
                      minWidth: "150px",
                    }}
                  >
                    Ngày bắt đầu
                  </CellHead>
                  <CellHead
                    align="right"
                    sx={{
                      minWidth: "100px",
                    }}
                  >
                    Ngày kết thúc
                  </CellHead>
                  <CellHead align="right">Trạng Thái</CellHead>
                  <CellHead align="right">Tuỳ Chọn</CellHead>
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
                    <CellBody style={{ minWidth: 200 }} align="left">
                      {row.couponCode}
                    </CellBody>

                    <CellBody style={{ minWidth: 150 }} align="left">
                      {row.discount}%
                    </CellBody>

                    <CellBody style={{ minWidth: 50 }} align="right">
                      {row.remain == null ? 0 : row.remain}
                    </CellBody>
                    <CellBody style={{ minWidth: 50 }} align="right">
                      <FormatDate dateTime={row.startDate} />
                    </CellBody>
                    <CellBody style={{ minWidth: 50 }} align="right">
                      <FormatDate dateTime={row.endDate} />
                    </CellBody>
                    <CellBody style={{ minWidth: 170 }} align="right">
                      {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
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
                                sx={{
                                  paddingX: 2,
                                  paddingY: 1,
                                  textAlign: "left",
                                }}
                                onClick={(e) => {
                                  navigate(`/admin/coupon-management/${row.couponId}`, {
                                    state: {
                                      id: row.couponId,
                                    },
                                  });
                                }}
                              >
                                Xem
                              </Button>
                              <Button
                                variant="text"
                                size="medium"
                                onClick={(e) => {
                                  setAddNew(false);
                                  setOpenPopup(true);
                                  setCouponId(row.couponId);
                                  setCouponRequest({
                                    couponCode: row.couponCode,
                                    discount: row.discount,
                                    minPrice: row.minPrice,
                                    maxDiscount: row.maxDiscount,
                                    maxUse: row.maxUse,
                                    startDate: row.startDate,
                                    endDate: row.endDate,
                                    currentUse: row.currentUse,
                                  });
                                  setError({
                                    status: false,
                                    errorMessage: {
                                      couponCode: "",
                                      discount: "",
                                      minPrice: "",
                                      maxDiscount: "",
                                      maxUse: "",
                                    }
                                  });
                                  setMaxStartDate(dayjs(row.endDate));
                                }}
                                sx={{
                                  paddingX: 2,
                                  paddingY: 1,
                                  textAlign: "left",
                                }}
                              >
                                Chỉnh sửa
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
                              navigate(`/admin/coupon-management/${row.couponId}`, {
                                state: {
                                  id: row.couponId,
                                },
                              });
                            }}
                          >
                            <InfoOutlinedIcon color="black" />
                          </IconButton>
                          <IconButton
                            color="black"
                            onClick={(e) => {
                              // Xử lý sự kiện cho nút "Chỉnh sửa"
                              setAddNew(false);
                              setOpenPopup(true);
                              setCouponId(row.couponId);
                              setCouponRequest({
                                couponCode: row.couponCode,
                                discount: row.discount,
                                minPrice: row.minPrice,
                                maxDiscount: row.maxDiscount,
                                maxUse: row.maxUse,
                                startDate: row.startDate,
                                endDate: row.endDate,
                                currentUse: row.currentUse,
                              });
                              setError({
                                status: false,
                                errorMessage: {
                                  couponCode: "",
                                  discount: "",
                                  minPrice: "",
                                  maxDiscount: "",
                                  maxUse: "",
                                }
                              });
                              setMaxStartDate(dayjs(row.endDate));
                            }}
                          >
                            <ModeEditIcon color="black" />
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
      <BootstrapDialog
        open={openPopup}
        onClose={handlePopupClose}
        onCancel={handlePopupClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {addNew ? "Thêm mã mới" : "Chỉnh sửa mã"}
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
          <Stack direction={"column"} spacing={1} width={"100%"}>
            <MuiTextFeild
              label="Mã giảm giá"
              value={couponRequest.couponCode}
              margin="normal"
              autoFocus
              error={error.status && error.errorMessage.couponCode.length !== 0}
              helperText={error.errorMessage.couponCode}
              onChange={(e) => {
                setCouponRequest((prev) => {
                  return {
                    ...prev,
                    couponCode: e.target.value,
                  };
                });
              }}
            />
            <Stack direction={"row"} spacing={1} width={"100%"}>
              <MuiTextFeild
                type="number"
                label="Giảm giá"
                value={addNew ? couponRequest.discount.toString() : "1"}
                margin="normal"
                InputProps={{ inputProps: { min: 1, max: 99 } }}
                error={error.status && error.errorMessage.discount.length !== 0}
                helperText={error.errorMessage.discount}
                style={{ width: "50%" }}
                onChange={(e) => {
                  setCouponRequest((prev) => {
                    return {
                      ...prev,
                      discount: e.target.value,
                    };
                  });
                }}
              />
              <MuiTextFeild
                type="number"
                label="Số lượng"
                value={addNew ? couponRequest.maxUse.toString() : "1"}
                margin="normal"
                InputProps={{ inputProps: { min: 1 } }}
                error={error.status && error.errorMessage.maxUse.length !== 0}
                helperText={error.errorMessage.maxUse}
                style={{ width: "50%" }}
                onChange={(e) => {
                  setCouponRequest((prev) => {
                    return {
                      ...prev,
                      maxUse: e.target.value,
                    };
                  });
                }}
              />
            </Stack>
            <Stack direction={"row"} spacing={1} width={"100%"}>
              <MuiTextFeild
                type="number"
                label="Đơn tối thiểu"
                value={addNew ? couponRequest.minPrice.toString() : "1000"}
                margin="normal"
                InputProps={{ inputProps: { min: 1000 } }}
                error={error.status && error.errorMessage.minPrice.length !== 0}
                helperText={error.errorMessage.minPrice}
                style={{ width: "50%" }}
                onChange={(e) => {
                  setCouponRequest((prev) => {
                    return {
                      ...prev,
                      minPrice: e.target.value,
                    };
                  });
                }}
              />
              <MuiTextFeild
                type="number"
                label="Giảm tối đa"
                value={addNew ? couponRequest.maxDiscount.toString() : "1000"}
                margin="normal"
                InputProps={{ inputProps: { min: 1000 } }}
                error={error.status && error.errorMessage.maxDiscount.length !== 0}
                helperText={error.errorMessage.maxDiscount}
                style={{ width: "50%" }}
                onChange={(e) => {
                  setCouponRequest((prev) => {
                    return {
                      ...prev,
                      maxDiscount: e.target.value,
                    };
                  });
                }}
              />
            </Stack>

            <Stack direction={"row"} spacing={1} width={"100%"}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <CustomDatePicker
                  label="Ngày bắt đầu"
                  value={dayjs(couponRequest.startDate)}
                  maxDate={maxStartDate}
                  onChange={(newDate) => {
                    setCouponRequest((prev) => {
                      return {
                        ...prev,
                        startDate: newDate,
                      };
                    });
                  }}
                  sx={{ mt: 2 }}
                />
              </LocalizationProvider>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <CustomDatePicker
                  label="Ngày kết thúc"
                  value={dayjs(couponRequest.endDate)}
                  minDate={dayjs(new Date())}
                  onChange={(newDate) => {
                    setCouponRequest((prev) => {
                      setMaxStartDate(newDate);
                      return {
                        ...prev,
                        endDate: newDate,
                      };
                    });
                  }}
                  sx={{ mt: 2 }}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCheckExistCoupon}>
            {addNew ? "Tạo mới" : "Cập nhật"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <DialogConfirm
        open={existDialog}
        title={"Mã giảm giá đã tồn tại"}
        content={"Mã giảm giá đã tồn tại! Bạn có muốn cập nhật lại thông tin?"}
        okText={"Cập nhật"}
        cancelText={"Hủy"}
        onOk={handleSendCouponRequest}
        onCancel={() => setExistDialog(false)}
        onClose={() => setExistDialog(false)}
      />
    </Grid>
  );
}

export default CouponListPage;
