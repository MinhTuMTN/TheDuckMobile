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

const staffRows = [
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

const storeProductRows = [
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
const RootPageStoreDetail = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

function StoreDetailPage() {
    const [staffPage, setStaffPage] = useState(0);
    const [storeProductPage, setStoreProductPage] = useState(0);
    const [staffRowsPerPage, setStaffRowsPerPage] = useState(5);
    const [storeProductRowsPerPage, setStoreProductRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyStoreProductRows =
        storeProductPage > 0 ?
            Math.max(0, (1 + storeProductPage) * storeProductRowsPerPage - storeProductRows.length) : 0;

    const emptyStaffRows =
        staffPage > 0 ?
            Math.max(0, (1 + staffPage) * staffRowsPerPage - staffRows.length) : 0;

    const handleChangeStoreProductPage = (event, newPage) => {
        setStoreProductPage(newPage);
    };

    const handleChangeStaffPage = (event, newPage) => {
        setStaffPage(newPage);
    };

    const handleChangeStaffRowsPerPage = (event) => {
        setStaffRowsPerPage(parseInt(event.target.value, 10));
        setStaffPage(0);
    };

    const handleChangeStoreProductRowsPerPage = (event) => {
        setStoreProductRowsPerPage(parseInt(event.target.value, 10));
        setStoreProductPage(0);
    };

    return (
        <RootPageStoreDetail>
            <Typography variant="h3" >Thông tin chi nhánh "{ }"</Typography>
            <Stack direction="row">
                <Typography
                    variant="h5"
                    style={{
                        width: "20%",
                    }}
                >
                    Mã chi nhánh:
                </Typography>
                <Typography
                    style={{
                        fontSize: "18px",
                        flexWrap: "wrap",
                        width: "80%",
                    }}
                >
                    MaChiNhanh
                </Typography>
            </Stack>
            <Stack direction="row">
                <Typography
                    variant="h5"
                    style={{
                        width: "20%",
                    }}
                >
                    Tên chi nhánh:
                </Typography>
                <Typography
                    style={{
                        fontSize: "18px",
                        flexWrap: "wrap",
                        width: "80%",
                    }}
                >
                    Chi nhánh Hồ Chí Minh
                </Typography>
            </Stack>
            <Stack direction="row">
                <Typography
                    variant="h5"
                    style={{
                        width: "20%",
                    }}
                >
                    Thời gian mở cửa:
                </Typography>
                <Typography
                    style={{
                        fontSize: "18px",
                        flexWrap: "wrap",
                        width: "80%",
                    }}
                >
                    Mỗi ngày từ 7h sáng tới 21h tối
                </Typography>
            </Stack>
            <Stack direction="row">
                <Typography
                    variant="h5"
                    style={{
                        width: "20%",
                    }}
                >
                    Địa chỉ:
                </Typography>
                <Typography
                    style={{
                        fontSize: "18px",
                        flexWrap: "wrap",
                        width: "80%",
                        textAlign: "justify",
                    }}
                >
                    Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
                </Typography>
            </Stack>

            <Typography
                variant="h5"
                sx={{ mt: 1 }}
                style={{
                    fontSize: "18px",
                }}>
                Danh sách nhân viên:
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
                        {(staffRowsPerPage > 0
                            ? staffRows.slice(staffPage * staffRowsPerPage, staffPage * staffRowsPerPage + staffRowsPerPage)
                            : staffRows
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
                                        to="/admin/staff-management/detail"
                                    >
                                        <InfoIcon />
                                    </MuiButton>
                                    <MuiButton
                                        component={Link}
                                        color="teal"
                                        to="/admin/staff-management/edit"
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
                        {emptyStaffRows > 0 && (
                            <TableRow style={{ height: 53 * emptyStaffRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={staffRows.length}
                                rowsPerPage={staffRowsPerPage}
                                page={staffPage}
                                onPageChange={handleChangeStaffPage}
                                onRowsPerPageChange={handleChangeStaffRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{ fontSize: 10 }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <Typography
                variant="h5"
                sx={{ mt: 2 }}
                style={{
                    fontSize: "18px",
                }}>
                Danh sách sản phẩm của chi nhánh:
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
                        {(storeProductRowsPerPage > 0
                            ? storeProductRows.slice(storeProductPage * storeProductRowsPerPage, storeProductPage * storeProductRowsPerPage + storeProductRowsPerPage)
                            : storeProductRows
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
                                    <MuiButton
                                        component={Link}
                                        color="teal"
                                        to="/admin/product-management/edit"
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
                        {emptyStoreProductRows > 0 && (
                            <TableRow style={{ height: 53 * emptyStoreProductRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={storeProductRows.length}
                                rowsPerPage={storeProductRowsPerPage}
                                page={storeProductPage}
                                onPageChange={handleChangeStoreProductPage}
                                onRowsPerPageChange={handleChangeStoreProductRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{ fontSize: 10 }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </RootPageStoreDetail>
    );
}

export default StoreDetailPage;