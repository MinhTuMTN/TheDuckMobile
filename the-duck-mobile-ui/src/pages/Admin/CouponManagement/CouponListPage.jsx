import {
    Box,
    InputAdornment,
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
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useCallback, useContext, useEffect, useState } from "react";
import MuiButton from "../../../components/MuiButton";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiTextFeild from "../../../components/MuiTextFeild";
import { Search } from "@mui/icons-material";
import { DataContext } from "../../../layouts/AdminLayout";

const RootPageCouponList = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const AddButton = styled(MuiButton)(({ theme }) => ({
    width: "25%",
    marginBottom: theme.spacing(1),
    "&:hover": {
        backgroundColor: "#FF6969",
    }
}));

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

function CouponListPage() {
    const { dataFetched } = useContext(DataContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsSearched, setRowsSearched] = useState([]);
    const [searchString, setSearchString] = useState("");

    const filterRows = useCallback(
        (searchString) => {
            if (searchString === "") {
                return dataFetched;
            }
            return dataFetched.filter((row) =>
                row.couponCode.toLowerCase().includes(searchString.toLowerCase())
            );
        },
        [dataFetched]
    );

    useEffect(() => {
        const filtered = filterRows(searchString);
        setRowsSearched(filtered);
    }, [searchString, filterRows]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsSearched.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <RootPageCouponList>
            <Typography variant="h3">Danh sách mã giảm giá</Typography>
            <AddButton component={Link} variant="contained" color="color1" to="/admin/coupon-management/add">
                <Typography color={"white"}>
                    Thêm Mã Giảm Giá Mới
                </Typography>
            </AddButton>
            <SearchTextField
                type="text"
                variant="outlined"
                component={Paper}
                placeholder="Tìm kiếm theo tên"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    style: { fontSize: 18 },
                }}
            />
            <TableContainer
                component={Paper}
                sx={{ maxHeight: 1070, minWidth: 1035, maxWidth: 1035 }}
            >
                <Table stickyHeader sx={{ maxWidth: 1200 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Mã giảm giá</TableCell>
                            <TableCell align="center">Code</TableCell>
                            <TableCell align="center">Số lượng</TableCell>
                            <TableCell align="center">Giảm giá</TableCell>
                            <TableCell align="center">Ngày bắt đầu</TableCell>
                            <TableCell align="center">Ngày kết thúc</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Lựa chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rowsSearched.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rowsSearched
                        ).map((row, i) => (
                            <TableRow key={i}>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    {row.couponId}
                                </TableCell>
                                <TableCell style={{ minWidth: 150 }} align="center">
                                    {row.couponCode}
                                </TableCell>
                                <TableCell style={{ minWidth: 100 }} align="center">
                                    {row.currentUse}
                                </TableCell>
                                <TableCell style={{ minWidth: 50 }} align="center">
                                    {row.discount}
                                </TableCell>
                                <TableCell style={{ minWidth: 150 }} align="center">
                                    {row.startDate}
                                </TableCell>
                                <TableCell style={{ minWidth: 150 }} align="center">
                                    {row.endDate}
                                </TableCell>
                                <TableCell style={{ minWidth: 250 }} align="center">
                                    {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
                                </TableCell>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    <MuiButton component={Link} color="oldPrimary"><InfoIcon /></MuiButton>
                                    <MuiButton component={Link} color="teal" to="/admin/promotion-management/edit"><EditIcon /></MuiButton>
                                    <MuiButton component={Link} color="color1"><DeleteIcon /></MuiButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={9} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={8}
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
        </RootPageCouponList>
    );
}

export default CouponListPage;