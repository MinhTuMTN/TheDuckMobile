import {
    Box,
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
    styled
} from "@mui/material";
import { useState } from "react";
import MuiButton from "../../../components/MuiButton";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatCurrency from "../../../components/FormatCurrency";

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich1', 237, 9.0, 37, 4.3),
    createData('Eclair2', 262, 16.0, 24, 6.0),
    createData('Cupcake3', 305, 3.7, 67, 4.3),
    createData('Gingerbread3', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt4', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich5', 237, 9.0, 37, 4.3),
    createData('Eclair6', 262, 16.0, 24, 6.0),
    createData('Cupcake7', 305, 3.7, 67, 4.3),
    createData('Gingerbread8', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt9', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich0', 237, 9.0, 37, 4.3),
    createData('Eclair11', 262, 16.0, 24, 6.0),
    createData('Cupcake12', 305, 3.7, 67, 4.3),
    createData('Gingerbread13', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt14', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich15', 237, 9.0, 37, 4.3),
    createData('Eclair16', 262, 16.0, 24, 6.0),
    createData('Cupcake17', 305, 3.7, 67, 4.3),
    createData('Gingerbread18', 356, 16.0, 49, 3.9),
];

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const RootPageOrderItemDetail = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormOrderItemDetail = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    padding: theme.spacing(4),
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

function OrderItemDetailPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <RootPageOrderItemDetail>
            <FormOrderItemDetail>
                <Typography variant="h3" >Thông tin sản phẩm "{ }"</Typography>


                {/* <MuiTextFeild
                            label="Tên sản phẩm"
                            margin="normal"
                            autoFocus
                            required
                        /> */}
                <Typography
                    sx={{ mt: 2 }}
                    style={{
                        fontSize: "18px",
                    }}
                >
                    <Typography
                        variant="h5"
                        style={{
                            display: "inline-block"
                        }}
                    >
                        Tên sản phẩm:
                    </Typography>  Đồng hồ thông minh BeFit Watch Ultra 52.6mm dây silicone
                </Typography>
                {/* <MuiTextFeild
                            label="Số lượng"
                            margin="normal"
                            required
                        /> */}
                <Typography
                    sx={{ mt: 1 }}
                    style={{
                        fontSize: "18px",
                    }}
                >
                    <Typography
                        variant="h5"
                        style={{
                            display: "inline-block"
                        }}
                    >
                        Đơn giá:
                    </Typography> <FormatCurrency amount="2000" /></Typography>
                <Typography
                    sx={{ mt: 1 }}
                    style={{
                        fontSize: "18px",
                    }}
                >
                    <Typography
                        variant="h5"
                        style={{
                            display: "inline-block"
                        }}
                    >
                        Số lượng:
                    </Typography>  1000
                </Typography>

                <Typography
                    sx={{ mt: 1 }}
                    style={{
                        fontSize: "18px",
                    }}
                >
                    <Typography
                        variant="h5"
                        style={{
                            display: "inline-block"
                        }}
                    >
                        Thành tiền:
                    </Typography> <FormatCurrency amount="200000" /></Typography>

                <Typography
                    sx={{ mt: 1 }}
                    style={{
                        fontSize: "18px",
                    }}
                >
                    <Typography
                        variant="h5"
                        style={{
                            display: "inline-block"
                        }}
                    >
                        Mã giảm giá đã áp dụng:
                    </Typography> CHUCMUNGNAMMOI2024
                </Typography>

            </FormOrderItemDetail>
        </RootPageOrderItemDetail>
    );
}

export default OrderItemDetailPage;