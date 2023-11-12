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
    styled
} from "@mui/material";
import { useState } from "react";
import MuiButton from "../../../components/MuiButton";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import FormatCurrency from "../../../components/FormatCurrency";
import BorderTextBox from "../../../components/BorderTextBox";

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
const RootPageOrderDetail = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

function OrderDetailPage() {
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
        <RootPageOrderDetail>
            <Typography variant="h3" >Thông tin đơn hàng "{ }"</Typography>
            <Stack direction="column" spacing={4} sx={{ mt: 3 }}>
                <Stack direction="row" spacing={2}>
                    <BorderTextBox label="Thông tin khách hàng" width="60%">
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "35%",
                                    }}
                                >
                                    Mã khách hàng:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "65%",
                                    }}
                                >
                                    MaKhachHang
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "35%",
                                    }}
                                >
                                    Tên khách hàng:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "65%",
                                    }}
                                >
                                    Nguyễn Văn A
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "35%",
                                    }}
                                >
                                    Số điện thoại:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "65%",
                                    }}
                                >
                                    0123456789
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "35%",
                                    }}
                                >
                                    Địa chỉ giao hàng:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "65%",
                                        textAlign: "justify",
                                    }}
                                >
                                    Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
                                </Typography>
                            </Stack>
                        </Stack>
                    </BorderTextBox>

                    <BorderTextBox label="Thông tin đơn hàng" width="40%">
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "40%",
                                    }}
                                >
                                    Mã đơn hàng:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "60%",
                                    }}
                                >
                                    MaDonHang
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "40%",
                                    }}
                                >
                                    Tạm tính:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "60%",
                                    }}
                                >
                                    <FormatCurrency amount="220000" />
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "40%",
                                    }}
                                >
                                    Đã giảm:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "60%",
                                    }}
                                >
                                    <FormatCurrency amount="20000" />
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "40%",
                                    }}
                                >
                                    Thanh toán:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "60%",
                                    }}
                                >
                                    <FormatCurrency amount="200000" />
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "40%",
                                    }}
                                >
                                    Trạng thái:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "60%",
                                    }}
                                >
                                    Đã nhận hàng
                                </Typography>
                            </Stack>
                        </Stack>
                    </BorderTextBox>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <BorderTextBox label="Thông tin chi nhánh" width="60%">
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "30%",
                                    }}
                                >
                                    Mã chi nhánh:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "70%",
                                    }}
                                >
                                    MaChiNhanh
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "30%",
                                    }}
                                >
                                    Tên chi nhánh:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "70%",
                                    }}
                                >
                                    Chi nhánh Hồ Chí Minh
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "30%",
                                    }}
                                >
                                    Địa chỉ:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "70%",
                                        textAlign: "justify",
                                    }}
                                >
                                    Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
                                </Typography>
                            </Stack>
                        </Stack>
                    </BorderTextBox>
                    <BorderTextBox label="Thông tin nhân viên" width="40%">
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "45%",
                                    }}
                                >
                                    Mã nhân viên:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "55%",
                                    }}
                                >
                                    MaNhanVien
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "45%",
                                    }}
                                >
                                    Tên nhân viên:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "55%",
                                    }}
                                >
                                    Nguyễn Văn A
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "45%",
                                    }}
                                >
                                    Số điện thoại:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "18px",
                                        flexWrap: "wrap",
                                        width: "55%",
                                    }}
                                >
                                    0987654321
                                </Typography>
                            </Stack>
                        </Stack>
                    </BorderTextBox>
                </Stack>
            </Stack>

            <Typography
                variant="h5"
                sx={{ mt: 3 }}
                style={{
                    fontSize: "18px",
                }}
            >
                Danh sách sản phẩm:
            </Typography>

            <TableContainer component={Paper} sx={{ maxHeight: 515, minWidth: 1035, maxWidth: 1035 }}>
                <Table stickyHeader sx={{ maxWidth: 1200 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell align="center">Lựa Chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell style={{ minWidth: 100 }}>
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ minWidth: 100 }} align="right">
                                    {row.calories}
                                </TableCell>
                                <TableCell style={{ minWidth: 100 }} align="right">
                                    {row.fat}
                                </TableCell>
                                <TableCell style={{ minWidth: 100 }} align="right">
                                    {row.carbs}
                                </TableCell>
                                <TableCell style={{ minWidth: 100 }} align="right">
                                    {row.protein}
                                </TableCell>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    <MuiButton
                                        component={Link}
                                        color="yellow"
                                        to="/admin/product-management/detail"
                                    >
                                        <InfoIcon />
                                    </MuiButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={rows.length}
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
        </RootPageOrderDetail>
    );
}

export default OrderDetailPage;