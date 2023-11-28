import {
  Box,
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
} from "@mui/material";
import { useEffect, useState } from "react";
import MuiButton from "../../../components/MuiButton";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { Link, useParams } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BorderTextBox from "../../../components/BorderTextBox";
import { getStoreById } from "../../../services/Admin/StoreService";
import StoreStaffTable from "../../../components/Admin/StoreStaffTable";
import StoreProvinceTable from "../../../components/Admin/StoreProvinceTable";

const staffRows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich1", 237, 9.0, 37, 4.3),
  createData("Eclair2", 262, 16.0, 24, 6.0),
  createData("Cupcake3", 305, 3.7, 67, 4.3),
  createData("Gingerbread3", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt4", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich5", 237, 9.0, 37, 4.3),
  createData("Eclair6", 262, 16.0, 24, 6.0),
  createData("Cupcake7", 305, 3.7, 67, 4.3),
  createData("Gingerbread8", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt9", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich0", 237, 9.0, 37, 4.3),
  createData("Eclair11", 262, 16.0, 24, 6.0),
  createData("Cupcake12", 305, 3.7, 67, 4.3),
  createData("Gingerbread13", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt14", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich15", 237, 9.0, 37, 4.3),
  createData("Eclair16", 262, 16.0, 24, 6.0),
  createData("Cupcake17", 305, 3.7, 67, 4.3),
  createData("Gingerbread18", 356, 16.0, 49, 3.9),
];

const storeProductRows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich1", 237, 9.0, 37, 4.3),
  createData("Eclair2", 262, 16.0, 24, 6.0),
  createData("Cupcake3", 305, 3.7, 67, 4.3),
  createData("Gingerbread3", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt4", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich5", 237, 9.0, 37, 4.3),
  createData("Eclair6", 262, 16.0, 24, 6.0),
  createData("Cupcake7", 305, 3.7, 67, 4.3),
  createData("Gingerbread8", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt9", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich0", 237, 9.0, 37, 4.3),
  createData("Eclair11", 262, 16.0, 24, 6.0),
  createData("Cupcake12", 305, 3.7, 67, 4.3),
  createData("Gingerbread13", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt14", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich15", 237, 9.0, 37, 4.3),
  createData("Eclair16", 262, 16.0, 24, 6.0),
  createData("Cupcake17", 305, 3.7, 67, 4.3),
  createData("Gingerbread18", 356, 16.0, 49, 3.9),
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const RootPageStoreDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

function StoreDetailPage() {
  const { storeId } = useParams();
  const [storeDetail, setStoreDetail] = useState({});

  useEffect(() => {
    const handleGetStoreDetail = async () => {
      const response = await getStoreById(storeId);

      if (response.success) setStoreDetail(response.data.data);
    };
    handleGetStoreDetail();
  }, [storeId]);

  return (
    <RootPageStoreDetail>
      <Typography variant="h4">
        Thông tin cửa hàng {storeDetail.storeName}
      </Typography>

      <StoreStaffTable
        staffs={storeDetail?.staffs}
        storeId={storeDetail?.store?.storeId}
      />

      <StoreProvinceTable
        provinces={storeDetail?.provinces}
        storeId={storeDetail?.store?.storeId}
      />
    </RootPageStoreDetail>
  );
}

export default StoreDetailPage;
