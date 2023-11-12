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
import { useEffect, useState } from "react";
import MuiButton from "../../../components/MuiButton";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { Link, useLocation } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BorderTextBox from "../../../components/BorderTextBox";
import { getProductById } from "../../../services/Admin/ProductService";
import FormatDateTime from "../../../components/FormatDateTime";

const productVersionRows = [
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

const rateRows = [
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
    const { state } = useLocation();
    const [productVersionPage, setProductVersionPage] = useState(0);
    const [productVersionRowsPerPage, setProductVersionRowsPerPage] = useState(5);
    const [ratePage, setRatePage] = useState(0);
    const [rateRowsPerPage, setRateRowsPerPage] = useState(5);
    const [product, setProduct] = useState({});

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyProductVersionRows =
        productVersionPage > 0 ? Math.max(0, (1 + productVersionPage) * productVersionRowsPerPage - productVersionRows.length) : 0;

    const emptyRateRows =
        ratePage > 0 ? Math.max(0, (1 + ratePage) * rateRowsPerPage - rateRows.length) : 0;

    const handleChangeProductVersionPage = (event, newPage) => {
        setProductVersionPage(newPage);
    };

    const handleChangeRatePage = (event, newPage) => {
        setRatePage(newPage);
    };

    const handleChangeProductVersionRowsPerPage = (event) => {
        setProductVersionRowsPerPage(parseInt(event.target.value, 10));
        setProductVersionPage(0);
    };

    const handleChangeRateRowsPerPage = (event) => {
        setRateRowsPerPage(parseInt(event.target.value, 10));
        setRatePage(0);
    };

    const handleGetProduct = async () => {
        const productResponse = await getProductById(state.id);
        if (productResponse.success) {
            setProduct(productResponse.data.data);
        }
    };

    useEffect(() => {
        handleGetProduct();
    }, []);
    return (
        <RootPageProductDetail>
            <Typography variant="h3" >Thông tin sản phẩm "{product.productName}"</Typography>
            <BorderTextBox marginTop="15px" label="Thông tin sản phẩm">
                <Stack spacing={1}>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Mã sản phẩm:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            {product.productId}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Tên sản phẩm:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                                textAlign: "justify",
                            }}
                        >
                            {product.productName}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Số lượng tồn kho:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            {product.quantity}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Số lượng đã bán:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            {product.sold}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Mô tả:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                                textAlign: "justify",
                            }}
                        >
                           {product.productDescription}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Danh mục:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            {product.catalogName}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Thương hiệu:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            {product.brandName}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Hệ điều hành:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            {product.osName}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Tính năng đặc biệt:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            {product.specialFeatures}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Đánh giá:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            {product.rate}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Thời gian tạo:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            <FormatDateTime dateTime={product.createdAt} />
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography
                            variant="h5"
                            style={{
                                width: "22%",
                            }}
                        >
                            Thời gian chỉnh sửa:
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "18px",
                                flexWrap: "wrap",
                                width: "78%",
                            }}
                        >
                            <FormatDateTime dateTime={product.lastModifiedAt} />
                        </Typography>
                    </Stack>
                </Stack>
            </BorderTextBox>
            <Typography
                variant="h5"
                sx={{ mt: 3 }}
                style={{
                    fontSize: "18px",
                }}>
                Danh sách phiên bản sản phẩm:
            </Typography>

            <TableContainer component={Paper} sx={{ maxHeight: 515, minWidth: 1035, maxWidth: 1035 }}>
                <Table sx={{ maxWidth: 1200 }}>
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
                        {(productVersionRowsPerPage > 0
                            ? productVersionRows.slice(productVersionPage * productVersionRowsPerPage, productVersionPage * productVersionRowsPerPage + productVersionRowsPerPage)
                            : productVersionRows
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
                        {emptyProductVersionRows > 0 && (
                            <TableRow style={{ height: 53 * emptyProductVersionRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={productVersionRows.length}
                                rowsPerPage={productVersionRowsPerPage}
                                page={productVersionPage}
                                onPageChange={handleChangeProductVersionPage}
                                onRowsPerPageChange={handleChangeProductVersionRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{ fontSize: 10 }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <Typography
                variant="h5"
                sx={{ mt: 3 }}
                style={{
                    fontSize: "18px",
                }}>
                Danh sách đánh giá:
            </Typography>

            <TableContainer component={Paper} sx={{ maxHeight: 515, minWidth: 1035, maxWidth: 1035 }}>
                <Table sx={{ maxWidth: 1200 }}>
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
                        {(rateRowsPerPage > 0
                            ? rateRows.slice(ratePage * rateRowsPerPage, ratePage * rateRowsPerPage + rateRowsPerPage)
                            : rateRows
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
                        {emptyRateRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRateRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={rateRows.length}
                                rowsPerPage={rateRowsPerPage}
                                page={ratePage}
                                onPageChange={handleChangeRatePage}
                                onRowsPerPageChange={handleChangeRateRowsPerPage}
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