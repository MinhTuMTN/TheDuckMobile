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
  styled,
} from "@mui/material";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useCallback, useContext, useEffect, useState } from "react";
import MuiButton from "../../../components/MuiButton";
import { Link, useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Search } from "@mui/icons-material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { DataContext } from "../../../layouts/AdminLayout";
import {
  deleteProduct,
  restoreProduct,
} from "../../../services/Admin/ProductService";
import DialogConfirm from "../../../components/DialogConfirm";
import { useSnackbar } from "notistack";

const RootPageProductList = styled(Box)(({ theme }) => ({
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
  },
}));

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

function ProductListPage(props) {
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchString, setSearchString] = useState("");
  const [rowsSearched, setRowsSearched] = useState([]);
  const [isDeleted, setIsDeleted] = useState();
  const [id, setId] = useState("");
  const [index, setIndex] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

  const filterRows = useCallback(
    (searchString) => {
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.productName.toLowerCase().includes(searchString.toLowerCase())
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

  const handleTrashButtonClick = async () => {
    if (isDeleted) {
      const productResponse = await restoreProduct(id);
      console.log(productResponse);
      if (productResponse.success) {
        console.log(productResponse);
        enqueueSnackbar("Khôi phục sản phẩm thành công!", {
          variant: "success",
        });
        const products = [...dataFetched];
        products[index].isDeleted = !isDeleted;
        setRowsSearched(products);
      } else {
        enqueueSnackbar("Khôi phục sản phẩm thất bại!", { variant: "error" });
      }
    } else {
      const productResponse = await deleteProduct(id);
      console.log(productResponse);
      if (productResponse.success) {
        console.log(productResponse);
        enqueueSnackbar("Xóa sản phẩm thành công!", { variant: "success" });
        const products = [...dataFetched];
        products[index].isDeleted = !isDeleted;
        setRowsSearched(products);
      } else {
        enqueueSnackbar("Xóa sản phẩm thất bại!", { variant: "error" });
      }
    }
  };

  return (
    <RootPageProductList>
      <Typography variant="h3">Danh sách sản phẩm</Typography>
      <AddButton
        component={Link}
        variant="contained"
        color="color1"
        to="/admin/product-management/add"
      >
        <Typography color={"white"}>Thêm Sản Phẩm Mới</Typography>
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
              <TableCell align="center">Mã sản phẩm</TableCell>
              <TableCell align="center">Tên sản phẩm</TableCell>
              <TableCell align="center">Hình ảnh</TableCell>
              <TableCell align="center">Tồn kho</TableCell>
              <TableCell align="center">Đã bán</TableCell>
              <TableCell align="center">Lựa Chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rowsSearched.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : rowsSearched
            ).map((row, i) => (
              <TableRow key={row.productId}>
                <TableCell style={{ minWidth: 200 }} align="center">
                  {row.productId}
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  {row.productName}
                </TableCell>
                <TableCell style={{ minWidth: 250 }} align="center">
                  <img
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    alt="thumbnail"
                    src={row.thumbnail}
                  />
                </TableCell>
                <TableCell style={{ minWidth: 50 }} align="center">
                  {row.quantity}
                </TableCell>
                <TableCell style={{ minWidth: 50 }} align="center">
                  {row.sold}
                </TableCell>
                <TableCell style={{ minWidth: 300 }} align="center">
                  <MuiButton
                    color="oldPrimary"
                    onClick={(e) => {
                      navigate("/admin/product-management/detail", {
                        state: {
                          id: row.productId,
                        },
                      });
                    }}
                  >
                    <InfoIcon />
                  </MuiButton>
                  <MuiButton
                    component={Link}
                    color="peach"
                    to="/admin/product-management/add-product-version"
                    state={{ category: "smartwatch" }}
                  >
                    <AddToQueueIcon />
                  </MuiButton>
                  <MuiButton
                    color="teal"
                    onClick={(e) => {
                      navigate("/admin/product-management/edit", {
                        state: {
                          id: row.productId,
                        },
                      });
                    }}
                  >
                    <EditIcon />
                  </MuiButton>
                  <MuiButton
                    component={Link}
                    color="color1"
                    onClick={(e) => {
                      setIndex(i);
                      setId(row.productId);
                      setIsDeleted(row.isDeleted);
                      setDeleteDialog(true);
                    }}
                  >
                    {row.isDeleted ? <RestoreFromTrashIcon /> : <DeleteIcon />}
                  </MuiButton>
                  <DialogConfirm
                    open={deleteDialog}
                    title={isDeleted ? "Khôi phục sản phẩm" : "Xóa sản phẩm"}
                    content={
                      isDeleted
                        ? "Bạn có chắc chắn muốn khôi phục sản phẩm?"
                        : "Bạn có chắc chắn muốn xóa sản phẩm này?"
                    }
                    okText={isDeleted ? "Khôi phục" : "Xóa"}
                    cancelText={"Hủy"}
                    onOk={handleTrashButtonClick}
                    onCancel={() => setDeleteDialog(false)}
                    onClose={() => setDeleteDialog(false)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 50 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
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
    </RootPageProductList>
  );
}

export default ProductListPage;
