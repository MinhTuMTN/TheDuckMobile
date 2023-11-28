import styled from "@emotion/styled";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoresTable from "../../../components/Admin/StoresTable";
import MuiTextFeild from "../../../components/MuiTextFeild";
import {
  getAllStores,
  addStore as addStoreService,
} from "../../../services/Admin/StoreService";
import {
  getAllDistricts,
  getAllProvinces,
  getAllWards,
} from "../../../services/Admin/AddressService";
import DialogConfirm from "../../../components/DialogConfirm";

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
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

function StoresPage(props) {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  //Lay danh sach chi nhanh tu api
  const handleGetStores = async () => {
    const response = await getAllStores();
    if (response.success) {
      setStores(response.data.data);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  };
  //Hien thi danh sach chi nhanh lan dau tien
  useEffect(() => {
    handleGetStores();
  }, []);

  const [error, setError] = useState({
    status: false,
    errorMessage: {
      storeName: "",
      province: "",
      district: "",
      ward: "",
    },
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePopupClose = () => {
    setOpen(false);
    setError({
      error: false,
      errorMessage: {
        storeName: "",
      },
    });
  };

  const [addStore, setAddStore] = useState({
    storeName: "",
    wardId: "",
    streetName: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  //Hàm lay danh sach tinh thanh
  const handleGetAllProvince = async () => {
    const response = await getAllProvinces();
    if (response.success) {
      setProvinces(response.data.data);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  };
  //Hien thi danh sach tinh thanh lan dau tien
  useEffect(() => {
    handleGetAllProvince();
  }, []);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);

  //Hàm lấy danh sách quận huyện theo id tỉnh thành
  useEffect(() => {
    const handleGetDistrictByProvinceId = async () => {
      if (selectedProvince === "") return;

      const response = await getAllDistricts(selectedProvince);
      if (response.success) {
        setDistricts(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      }
    };

    handleGetDistrictByProvinceId();
  }, [selectedProvince]);

  const [wards, setWards] = useState([]);

  useEffect(() => {
    const handleGetWardByDistrictId = async () => {
      if (selectedDistrict === "") return;

      const response = await getAllWards(selectedDistrict);
      if (response.success) {
        setWards(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
      }
    };
    handleGetWardByDistrictId();
  }, [selectedDistrict]);

  const handleAddStore = async () => {
    const response = await addStoreService(addStore);
    if (response.success) {
      enqueueSnackbar("Thêm chi nhánh thành công", { variant: "success" });
      handleGetStores();
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
    navigate(0);
  };

  return (
    <Box component={"main"} sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth={"lg"}>
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h3">Danh sách chi nhánh</Typography>
            <CustomButton
              onClick={() => {
                setError({
                  status: false,
                  errorMessage: {
                    storeName: "",
                  },
                });
                setOpen(true);
              }}
              variant="contained"
              startIcon={<AddOutlinedIcon />}
            >
              Thêm chi nhánh
            </CustomButton>
          </Stack>
          <Stack
            component={Paper}
            elevation={3}
            sx={{
              paddingBottom: 2,
              borderRadius: "25px",
            }}
            spacing={"2px"}
          >
            <StoresTable
              count={stores.length}
              items={stores}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              error={error}
              setError={setError}
            />
          </Stack>
        </Stack>
      </Container>

      <BootstrapDialog
        open={open}
        onClose={handlePopupClose}
        aria-labelledby="customized-dialog-title"
        sx={{ "& .MuiDialog-paper": { width: "650px" } }}
      >
        <DialogTitle sx={{ m: 0, px: 2, py: 2.2 }} id="customized-dialog-title">
          <Typography
            variant="h5"
            style={{
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Thêm chi nhánh mới
          </Typography>
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
          <Stack direction={"column"} spacing={1}>
            <MuiTextFeild
              size={"medium"}
              label="Tên chi nhánh"
              variant="outlined"
              autoFocus
              required
              style={{
                minWidth: "300px",
                fontSize: "14px",
                marginTop: "10px",
              }}
              onChange={(e) => {
                setAddStore({
                  ...addStore,
                  storeName: e.target.value,
                });
              }}
            />
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Tỉnh</InputLabel>
                  <Select
                    labelId="select-label"
                    id="demo-simple-select"
                    label="Province"
                    size="medium"
                    style={{
                      fontSize: "14px !important",
                      overflow: "hidden", // Ẩn nội dung vượt quá chiều cao đã định
                    }}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                  >
                    {provinces?.map((province) => (
                      <MenuItem
                        value={province.provinceId}
                        key={province.provinceId}
                      >
                        <Typography
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis", // Hiển thị dấu ba chấm khi vượt quá chiều rộng
                          }}
                        >
                          {province.provineName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Quận/Huyện</InputLabel>
                  <Select
                    labelId="select-label"
                    id="demo-simple-select"
                    label="Province"
                    size="medium"
                    style={{
                      fontSize: "14px !important",
                      overflow: "hidden", // Ẩn nội dung vượt quá chiều cao đã định
                    }}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                  >
                    {districts?.map((district) => (
                      <MenuItem
                        value={district.districtId}
                        key={district.districtId}
                      >
                        <Typography
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis", // Hiển thị dấu ba chấm khi vượt quá chiều rộng
                          }}
                        >
                          {district.districtName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Phường/Xã</InputLabel>
                  <Select
                    labelId="select-label"
                    id="demo-simple-select"
                    label="Province"
                    size="medium"
                    style={{
                      fontSize: "14px !important",
                      overflow: "hidden", // Ẩn nội dung vượt quá chiều cao đã định
                    }}
                    onChange={(e) =>
                      setAddStore({
                        ...addStore,
                        wardId: e.target.value,
                      })
                    }
                  >
                    {wards?.map((ward) => (
                      <MenuItem value={ward.wardId} key={ward.wardId}>
                        <Typography
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis", // Hiển thị dấu ba chấm khi vượt quá chiều rộng
                          }}
                        >
                          {ward.wardName}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <MuiTextFeild
              size={"medium"}
              label="Tên đường"
              variant="outlined"
              autoFocus
              required
              style={{
                minWidth: "300px",
                fontSize: "14px",
                marginTop: "10px",
              }}
              onChange={(e) => {
                setAddStore({
                  ...addStore,
                  streetName: e.target.value,
                });
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleAddStore();
            }}
          >
            Tạo mới
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <DialogConfirm
        open={error.status}
        title={"Lỗi"}
        content={error.errorMessage.storeName}
        onClose={() => {
          setError({
            status: false,
            errorMessage: {
              storeName: "",
            },
          });
        }}
      />
    </Box>
  );
}

export default StoresPage;
