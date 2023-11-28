import styled from "@emotion/styled";
import {
  InfoOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablePaginationActions from "../TablePaginationActions";
import MuiTextFeild from "../MuiTextFeild";
import {
  getAllDistricts,
  getAllProvinces,
  getAllWards,
} from "../../services/Admin/AddressService";
import {
  deleteStore,
  restoreStore,
  updateStore,
} from "../../services/Admin/StoreService";
import { useSnackbar } from "notistack";
import DialogConfirm from "../DialogConfirm";

import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

const ButtonCustom = styled(Button)`
  border-radius: 0.7rem;
  padding: 0.6rem 1.2rem;
`;
function Row(props) {
  const { row, provinces } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [editStore, setEditStore] = useState({
    storeName: row?.storeName,
    provinceId: row?.address?.provinceId,
    districtId: row?.address?.districtId,
    wardId: row?.address?.wardId,
    street: row?.address?.street,
  });

  useEffect(() => {
    const handleGetDistricts = async () => {
      const response = await getAllDistricts(editStore.provinceId);

      if (response.success) {
        setDistricts(response.data.data);
        if (editStore.provinceId !== row?.address?.provinceId) {
          setEditStore((prev) => ({
            ...prev,
            districtId: "",
            wardId: "",
          }));
        }
      }
    };
    handleGetDistricts();
  }, [editStore.provinceId, row?.address?.provinceId]);

  useEffect(() => {
    const handleGetWards = async () => {
      if (editStore.districtId === "") return;
      const response = await getAllWards(editStore.districtId);

      if (response.success) {
        setWards(response.data.data);
        if (editStore.districtId !== row?.address?.districtId) {
          setEditStore((prev) => ({
            ...prev,
            wardId: "",
          }));
        }
      }
    };
    handleGetWards();
  }, [editStore.districtId, row?.address?.districtId]);

  const handleUpdateStore = async () => {
    if (editStore.storeName === "") {
      enqueueSnackbar("Tên cửa hàng không được để trống", {
        variant: "error",
      });
      return;
    }

    if (editStore.wardId === "") {
      enqueueSnackbar("Địa chỉ không được để trống", {
        variant: "error",
      });
      return;
    }

    if (editStore.street === "") {
      enqueueSnackbar("Tên đường không được để trống", {
        variant: "error",
      });
      return;
    }

    const response = await updateStore(row.storeId, {
      storeName: editStore.storeName,
      wardId: parseInt(editStore.wardId),
      streetName: editStore.street,
    });

    if (response.success) {
      enqueueSnackbar("Cập nhật thông tin cửa hàng thành công", {
        variant: "success",
      });
      setOpen(false);
      // Reload page
      navigate(0);
    } else {
      enqueueSnackbar("Cập nhật thông tin cửa hàng thất bại", {
        variant: "error",
      });
    }
  };
  const handleDeleteStore = async (storeId) => {
    const response = await deleteStore(storeId);
    if (response.success) {
      enqueueSnackbar("Xóa chi nhánh thành công", { variant: "success" });
      navigate(0);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  };

  const handleRestoreStore = async (storeId) => {
    const response = await restoreStore(storeId);
    if (response.success) {
      enqueueSnackbar("Khôi phục chi nhánh thành công", { variant: "success" });
      navigate(0);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "" } }}>
        <TableCell sx={{ padding: 0 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.storeName}
        </TableCell>
        <TableCell align="right">{row.numberOfStaffs}</TableCell>
        <TableCell align="right">{row.numberOfOrders}</TableCell>
        <TableCell align="right">
          {row.isDeleted ? "Khóa" : "Đang hoạt động"}
        </TableCell>
        <TableCell align="center">
          <Stack
            direction={"row"}
            spacing={0}
            alignItems={"center"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            <IconButton onClick={() => navigate(row.storeId)}>
              <InfoOutlined />
            </IconButton>
            <IconButton onClick={() => setOpenConfirm(true)}>
              {row.isDeleted ? <RestoreFromTrashIcon /> : <DeleteIcon />}
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          sx={{
            borderLeft: "4px solid #d54949c3",
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                marginY: "1rem",
                fullWidth: true,
              }}
            >
              <Stack
                direction={"column"}
                spacing={0}
                sx={{
                  paddingX: "0rem",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "1rem",
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  style={{
                    fontSize: "1rem",
                  }}
                  marginBottom={1.5}
                >
                  Cập nhật thông tin cửa hàng
                </Typography>
                <Stack direction={"column"} spacing={2}>
                  <MuiTextFeild
                    size={"medium"}
                    label="Tên chi nhánh"
                    variant="outlined"
                    autoFocus
                    value={editStore.storeName}
                    onChange={(e) =>
                      setEditStore((prev) => ({
                        ...prev,
                        storeName: e.target.value,
                      }))
                    }
                    required
                    style={{
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  />
                  <Stack direction={"row"} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="select-label">Tỉnh</InputLabel>
                      <Select
                        labelId="select-label"
                        id="demo-simple-select"
                        label="Province"
                        size="medium"
                        style={{
                          fontSize: "14px !important",
                        }}
                        value={editStore.provinceId}
                        onChange={(e) => {
                          setEditStore((prev) => ({
                            ...prev,
                            provinceId: e.target.value,
                          }));
                        }}
                      >
                        {provinces?.map((province) => (
                          <MenuItem
                            value={province.provinceId}
                            key={province.provinceId}
                          >
                            <Typography
                              style={{
                                fontSize: "14px !important",
                              }}
                            >
                              {province.provineName}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="select-label">Quận/Huyện</InputLabel>
                      <Select
                        labelId="select-label"
                        id="demo-simple-select"
                        label="Province"
                        size="medium"
                        style={{
                          fontSize: "14px !important",
                        }}
                        value={editStore.districtId}
                        onChange={(e) => {
                          setEditStore((prev) => ({
                            ...prev,
                            districtId: e.target.value,
                          }));
                        }}
                      >
                        {districts.map((districts) => (
                          <MenuItem
                            value={districts.districtId}
                            key={districts.districtId}
                          >
                            <Typography
                              style={{
                                fontSize: "14px !important",
                              }}
                            >
                              {districts.districtName}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="select-label">Xã/Phường</InputLabel>
                      <Select
                        labelId="select-label"
                        id="demo-simple-select"
                        label="Province"
                        size="medium"
                        style={{
                          fontSize: "14px !important",
                        }}
                        value={editStore.wardId}
                        onChange={(e) =>
                          setEditStore((prev) => ({
                            ...prev,
                            wardId: e.target.value,
                          }))
                        }
                      >
                        {wards.map((wards) => (
                          <MenuItem value={wards.wardId} key={wards.wardId}>
                            <Typography
                              style={{
                                fontSize: "14px !important",
                              }}
                            >
                              {wards.wardName}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>

                  <MuiTextFeild
                    size={"medium"}
                    label="Tên đường"
                    variant="outlined"
                    autoFocus
                    required
                    value={editStore.street}
                    onChange={(e) =>
                      setEditStore((prev) => ({
                        ...prev,
                        street: e.target.value,
                      }))
                    }
                    style={{
                      minWidth: "300px",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  />
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                marginTop={2}
              >
                <Stack direction={"row"} spacing={2}>
                  <ButtonCustom
                    variant="contained"
                    color="color1"
                    sx={{
                      color: "#fff",
                    }}
                    onClick={handleUpdateStore}
                  >
                    Cập nhật
                  </ButtonCustom>
                  <ButtonCustom
                    variant="text"
                    color="color4"
                    onClick={() => setOpen(!open)}
                  >
                    Huỷ
                  </ButtonCustom>
                </Stack>
                {/* <ButtonCustom variant="text" color="color5">
                  Xoá thương hiệu
                </ButtonCustom> */}
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DialogConfirm
        open={openConfirm}
        okText={"Đồng ý"}
        cancelText={"Huỷ"}
        onClose={() => setOpenConfirm(false)}
        onCancel={() => setOpenConfirm(false)}
        onOk={() => {
          row.isDeleted
            ? handleRestoreStore(row.storeId)
            : handleDeleteStore(row.storeId);
          setOpenConfirm(false);
        }}
        title={"Xác nhận"}
        content={
          row.isDeleted
            ? `Bạn có chắc chắn muốn khôi phục ${row.storeName}`
            : `Bạn có chắc chắn muốn khóa ${row.storeName}`
        }
      />
    </React.Fragment>
  );
}

function StoresTable(props) {
  const {
    count,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    items,
    error,
    setError,
    rowsPerPageOptions,
  } = props;

  const [provinces, setProvinces] = useState([]);

  const handleGetAllProvinces = async () => {
    const response = await getAllProvinces();

    if (response.success) setProvinces(response.data.data);
  };

  useEffect(() => {
    handleGetAllProvinces();
  }, []);

  return (
    <>
      <Box paddingX={2} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: 0, width: "20px !important" }} />
                <TableCell style={{ width: "180px" }}>Tên chi nhánh</TableCell>
                <TableCell style={{ width: "100px" }} align="right">
                  Số nhân viên
                </TableCell>
                <TableCell style={{ width: "100px" }} align="right">
                  Số đơn hàng
                </TableCell>
                <TableCell style={{ width: "120px" }} align="right">
                  Trạng thái
                </TableCell>
                <TableCell sx={{ width: "30px" }} align="center">
                  Tuỳ chọn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? items.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : items
              ).map((row, index) => (
                <Row
                  key={`store-${index}`}
                  row={row}
                  provinces={provinces}
                  error={error}
                  setError={setError}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
}

StoresTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  rowsPerPageOptions: PropTypes.array,
};

export default StoresTable;
