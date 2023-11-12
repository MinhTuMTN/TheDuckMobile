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
import BorderTextBox from "../../../components/BorderTextBox";

const orderRows = [
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
const RootPageStaffDetail = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const CustomImage = styled('img')(({ theme }) => ({
    border: "2px solid",
    borderRadius: "15px",
    height: "315px",
    width: "auto",
    maxWidth: "315px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
}));

function StaffDetailPage() {
    const image = "https://i.pinimg.com/736x/d4/15/95/d415956c03d9ca8783bfb3c5cc984dde.jpg"

    const [orderPage, setOrderPage] = useState(0);
    const [orderRowsPerPage, setOrderRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyOrderRows =
        orderPage > 0 ?
            Math.max(0, (1 + orderPage) * orderRowsPerPage - orderRows.length) : 0;

    const handleChangeOrderPage = (event, newPage) => {
        setOrderPage(newPage);
    };

    const handleChangeOrderRowsPerPage = (event) => {
        setOrderRowsPerPage(parseInt(event.target.value, 10));
        setOrderPage(0);
    };

    return (
        <RootPageStaffDetail>
            <Typography variant="h3" >Thông tin nhân viên "{ }"</Typography>
            <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                <CustomImage src={image} style={{ width: "38%" }} />
                <BorderTextBox style={{ width: "72%" }} label="Thông tin nhân viên">
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row">
                            <Typography
                                variant="h5"
                                style={{
                                    width: "30%",
                                }}
                            >
                                Mã nhân viên:
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "18px",
                                    flexWrap: "wrap",
                                    width: "70%",
                                }}
                            >
                                MaNhanVien
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Typography
                                variant="h5"
                                style={{
                                    width: "30%",
                                }}
                            >
                                Họ tên nhân viên:
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "18px",
                                    flexWrap: "wrap",
                                    width: "70%",
                                }}
                            >
                                Nguyễn Văn C
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Typography
                                variant="h5"
                                style={{
                                    width: "30%",
                                }}
                            >
                                Giới tính:
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "18px",
                                    flexWrap: "wrap",
                                    width: "70%",
                                }}
                            >
                                Nam
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Typography
                                variant="h5"
                                style={{
                                    width: "30%",
                                }}
                            >
                                Số điện thoại:
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "18px",
                                    flexWrap: "wrap",
                                    width: "70%",
                                }}
                            >
                                0123456987
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Typography
                                variant="h5"
                                style={{
                                    width: "30%",
                                }}
                            >
                                Email:
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "18px",
                                    flexWrap: "wrap",
                                    width: "70%",
                                }}
                            >
                                cnv@theduckmobile.com
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
            </Stack>
            <Typography
                variant="h5"
                sx={{ mt: 3 }}
                style={{
                    fontSize: "18px",
                }}>
                Danh sách đơn hàng:
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
                        {(orderRowsPerPage > 0
                            ? orderRows.slice(orderPage * orderRowsPerPage, orderPage * orderRowsPerPage + orderRowsPerPage)
                            : orderRows
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
                                        to="/admin/order-management/detail"
                                    >
                                        <InfoIcon />
                                    </MuiButton>
                                    <MuiButton
                                        component={Link}
                                        color="teal"
                                        to="/admin/order-management/edit"
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
                        {emptyOrderRows > 0 && (
                            <TableRow style={{ height: 53 * emptyOrderRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={orderRows.length}
                                rowsPerPage={orderRowsPerPage}
                                page={orderPage}
                                onPageChange={handleChangeOrderPage}
                                onRowsPerPageChange={handleChangeOrderRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{ fontSize: 10 }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </RootPageStaffDetail>
    );
}

export default StaffDetailPage;