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
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useState } from "react";
import MuiButton from "../../../components/MuiButton";
import { Link } from "react-router-dom";

const RootPageProductList = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const AddButton = styled(MuiButton)(({ theme }) => ({
    width: "25%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    "&:hover": {
        backgroundColor: "#FF6969",
      }
}));

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function ProductListPage() {
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
        <RootPageProductList>
            <Typography variant="h3">Danh sách sản phẩm</Typography>
            <AddButton component={Link} variant="contained" color="color1" to="/admin/product-management/add">
                <Typography color={"white"}>
                    Thêm Sản Phẩm Mới
                </Typography>
            </AddButton>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell style={{ width: 100 }}>
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="right">
                                    {row.calories}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="right">
                                    {row.fat}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="right">
                                    {row.carbs}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="right">
                                    {row.protein}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={5}
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
        </RootPageProductList>
    );
}

export default ProductListPage;