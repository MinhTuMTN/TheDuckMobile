import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

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
import MuiTextFeild from "../../../../components/MuiTextFeild";
import TablePaginationActions from "../../../../components/TablePaginationActions";
import { DataContext } from "../../../../layouts/AdminLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { addWard, updateWard } from "../../../../services/Admin/AddressService";
import { enqueueSnackbar } from "notistack";

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

function WardListPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [wardRequest, setWardRequest] = useState({});
  const [addNew, setAddNew] = useState(true);
  const [error, setError] = useState({
    status: false,
    errorMessage: {
      wardName: "",
    }
  });

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

  useEffect(() => {
    setProvince(state.province);
    setDistrict(state.district)
  }, [state.province, state.district]);

  const filterRows = useCallback(
    (searchString) => {
      setPage(0);
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.wardName.toLowerCase().includes(searchString.toLowerCase())
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

  const [openPopup, setOpenPopup] = useState(false);
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSendWardRequest = async () => {
    let validData = true;
    if (!wardRequest.wardName || wardRequest.wardName.trim().length === 0) {
      validData = false;
      setError((prev) => {
        return {
          ...prev,
          status: true,
          errorMessage: {
            ...prev.errorMessage,
            wardName: "Tên phường xã không được để trống",
          }
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          errorMessage: {
            ...prev.errorMessage,
            wardName: "",
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
        wardName: ""
      }
    });

    let response
    if (addNew) {
      response = await addWard({
        wardName: wardRequest.wardName,
        districtId: district.districtId
      });
      if (response.success) {
        enqueueSnackbar("Thêm phường xã thành công", { variant: "success" });
        setOpenPopup(false);
        navigate(0);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      }
    } else {
      response = await updateWard(wardRequest.wardId, {
        wardName: wardRequest.wardName,
        districtId: district.districtId
      });
      if (response.success) {
        enqueueSnackbar("Chỉnh sửa phường xã thành công", { variant: "success" });
        setOpenPopup(false);
        navigate(0);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      }
    }
  };

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
          spacing={0}
          alignItems={"center"}
          marginBottom={3}
        >
          <IconButton
            aria-label="back"
            size="small"
            color="#111927"
            onClick={() =>
              navigate(`/admin/address-management/province/detail?provinceId=${province.provinceId}`,
                {
                  state: {
                    province: province,
                  }
                })}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography
            variant="body1"
            fontWeight={600}
            style={{
              fontSize: "14px",
              color: "#111927",
            }}
          >
            {isSmallScreen
              ? "Danh sách quận huyện"
              : `Danh sách quận huyện của ${province.provineName}`}
          </Typography>
        </Stack>
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
            {isSmallScreen
              ? "Danh sách phường xã"
              : `Danh sách phường xã của ${district.districtName}`}
          </Typography>
          <CustomButton
            variant="contained"
            size="medium"
            startIcon={<AddOutlinedIcon />}
            onClick={(e) => {
              setAddNew(true);
              setOpenPopup(true);
              setWardRequest({
                wardName: "",
              });
              setError({
                status: false,
                errorMessage: {
                  wardName: "",
                }
              });
            }}
          >
            Thêm mới
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
              placeholder="Tìm kiếm theo xã phường"
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
                      width: "20%",
                    }}
                  >
                    Mã xã phường
                  </CellHead>

                  <CellHead
                    align="center"
                    sx={{
                      width: "60%",
                    }}
                  >
                    Tên xã phường
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
                    <CellBody style={{ width: "20%" }} align="center">
                      {row.wardId}
                    </CellBody>

                    <CellBody style={{ width: "60%" }} align="center">
                      {row.wardName}
                    </CellBody>
                    <CellBody
                      style={{
                        minWidth: 50,
                        fontSize: "14px",
                      }}
                      align="center"
                    >
                      <>
                        {(() => {
                          const item = {
                            icon: <ModeEditIcon color="black" />,
                            action: () => {
                              setAddNew(false);
                              setOpenPopup(true);
                              setWardRequest({
                                wardId: row.wardId,
                                wardName: row.wardName,
                              });
                              setError({
                                status: false,
                                errorMessage: {
                                  wardName: "",
                                }
                              });
                            },
                          };

                          return (
                            <IconButton color="black" onClick={item.action}>
                              {item.icon}
                            </IconButton>
                          );
                        })()}
                      </>
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
        onOk={() => { }}
        onClose={() => setOpenPopup(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {addNew ? "Thêm xã/phường mới" : "Chỉnh sửa xã/phường"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenPopup(false)}
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
            label="Tên xã phường"
            value={wardRequest.wardName}
            margin="normal"
            autoFocus
            error={error.status && error.errorMessage.wardName.length !== 0}
            helperText={error.errorMessage.wardName}
            onChange={(e) => {
              setWardRequest((prev) => {
                return {
                  ...prev,
                  wardName: e.target.value,
                }
              })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSendWardRequest}>
            {addNew ? "Tạo mới" : "Cập nhật"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Grid >
  );
}

export default WardListPage;
