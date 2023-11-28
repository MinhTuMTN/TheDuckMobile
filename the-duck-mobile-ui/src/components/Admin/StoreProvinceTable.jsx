import {
  Button,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllProvinces } from "../../services/Admin/AddressService";
import { addStoreProvince } from "../../services/Admin/StoreService";
import DialogForm from "../DialogForm";

function StoreProvinceTable(props) {
  const { provinces = [], storeId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [provinceId, setProvinceId] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const [availableProvinces, setAvailableProvinces] = React.useState([]);
  useEffect(() => {
    const handleGetAllProvinces = async () => {
      const response = await getAllProvinces();
      if (response.success) {
        setAvailableProvinces(
          response.data.data.filter(
            (province) =>
              !provinces.find((p) => p.provinceId === province.provinceId)
          )
        );
      }
    };
    handleGetAllProvinces();
  }, [provinces]);

  const handleAddProvince = async () => {
    if (!provinceId) {
      enqueueSnackbar("Vui lòng chọn tỉnh thành", { variant: "error" });
      return;
    }

    const response = await addStoreProvince(storeId, provinceId);

    if (response.success) {
      enqueueSnackbar("Thêm tỉnh thành thành công", { variant: "success" });
      navigate(0);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
    }
  };

  return (
    <Stack spacing={2} mt={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Danh sách tỉnh thành</Typography>
        <Button
          variant="contained"
          color="color1"
          style={{ color: "white" }}
          onClick={() => setOpenDialog(true)}
          disabled={availableProvinces.length === 0}
        >
          Thêm
        </Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: "center" }}>STT</TableCell>
            <TableCell>Tỉnh/Thành phố</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {provinces.map((province, index) => (
            <TableRow key={province.id}>
              <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
              <TableCell>{province.provinceName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DialogForm
        title="Thêm tỉnh thành"
        okText="Thêm"
        cancelText="Hủy"
        onOk={handleAddProvince}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCancel={() => setOpenDialog(false)}
      >
        <Stack spacing={2} m={1} width={600}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={provinceId}
            onChange={(e) => setProvinceId(e.target.value)}
            size="small"
            sx={{
              borderRadius: "10px !important",
              boxShadow: "0px 0px 5px 0px #3f3b3b1a",
              height: "40px",
              fontSize: "14px !important",
            }}
          >
            {availableProvinces.map((province) => (
              <MenuItem
                value={province.provinceId}
                sx={{
                  fontSize: "14px !important",
                }}
                key={province.provinceId}
              >
                {province.provineName}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </DialogForm>
    </Stack>
  );
}

export default StoreProvinceTable;
