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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
const RootPageProductDetail = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

function ProductDetailPage() {
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
        <RootPageProductDetail>
                <Typography variant="h3" >Thông tin sản phẩm "{ }"</Typography>
                <Stack direction="row">
                    <Typography
                        variant="h5"
                        style={{
                            width: "17%",
                        }}
                    >
                        Mã sản phẩm:
                    </Typography>
                    <Typography
                        style={{
                            fontSize: "18px",
                            flexWrap: "wrap",
                            width: "83%",
                        }}
                    >
                        MaSanPham
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <Typography
                        variant="h5"
                        style={{
                            width: "17%",
                        }}
                    >
                        Tên sản phẩm:
                    </Typography>
                    <Typography
                        style={{
                            fontSize: "18px",
                            flexWrap: "wrap",
                            width: "83%",
                            textAlign: "justify",
                        }}
                    >
                        Đồng hồ thông minh BeFit Watch Ultra 52.6mm dây silicone
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <Typography
                        variant="h5"
                        style={{
                            width: "17%",
                        }}
                    >
                        Số lượng:
                    </Typography>
                    <Typography
                        style={{
                            fontSize: "18px",
                            flexWrap: "wrap",
                            width: "83%",
                        }}
                    >
                        10000
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <Typography
                        variant="h5"
                        style={{
                            width: "17%",
                        }}
                    >
                        Mô tả:
                    </Typography>
                    <Typography
                        style={{
                            fontSize: "18px",
                            flexWrap: "wrap",
                            width: "83%",
                            textAlign: "justify",
                        }}
                    >
                        Đồng hồ thông minh BeFit có thiết kế mạnh mẽ,
                        nam tính với hình dáng mặt hình chữ nhật thời thượng có kích thước 52.6 mm.
                        Phần khung đồng hồ được hoàn thiện từ hợp kim kẽm có khả năng chống ăn mòn cao,
                        giữ cho bề mặt luôn sáng bóng.
                        Cạnh phải được trang bị một nút vật lý cho phép người dùng thao tác nhanh một số chức năng.
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <Typography
                        variant="h5"
                        style={{
                            width: "17%",
                        }}
                    >
                        Danh mục:
                    </Typography>
                    <Typography
                        style={{
                            fontSize: "18px",
                            flexWrap: "wrap",
                            width: "83%",
                        }}
                    >
                        Đồng hồ thông minh
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <Typography
                        variant="h5"
                        style={{
                            width: "17%",
                        }}
                    >
                        Thương hiệu:
                    </Typography>
                    <Typography
                        style={{
                            fontSize: "18px",
                            flexWrap: "wrap",
                            width: "83%",
                        }}
                    >
                        BeFit
                    </Typography>
                </Stack>
                <Stack direction="row">
                    <Typography
                        variant="h5"
                        style={{
                            width: "17%",
                        }}
                    >
                        Hệ điều hành:
                    </Typography>
                    <Typography
                        style={{
                            fontSize: "18px",
                            flexWrap: "wrap",
                            width: "83%",
                        }}
                    >
                        Android
                    </Typography>
                </Stack>

                <Typography
                    variant="h5"
                    sx={{ mt: 1 }}
                    style={{
                        fontSize: "18px",
                    }}>
                    Danh sách phiên bản sản phẩm:
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
                                            to="/admin/product-management/detail/product-version"
                                        >
                                            <InfoIcon />
                                        </MuiButton>
                                        <MuiButton
                                            component={Link}
                                            color="teal"
                                            to="/admin/product-management/edit/product-version"
                                            state={{ category: "smart-watch" }}
                                        >
                                            <EditIcon />
                                        </MuiButton>
                                        <MuiButton
                                            component={Link}
                                            color="color1"
                                        >
                                            <DeleteIcon />
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
        </RootPageProductDetail>
    );
}

export default ProductDetailPage;