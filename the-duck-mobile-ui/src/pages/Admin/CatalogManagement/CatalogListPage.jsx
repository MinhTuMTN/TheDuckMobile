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
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import EditIcon from "@mui/icons-material/Edit";
import { Search } from "@mui/icons-material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { DataContext } from "../../../layouts/AdminLayout";
import { enqueueSnackbar } from "notistack";
import { deleteCatalog, restoreCatalog } from "../../../services/Admin/CatalogService";
import DialogConfirm from "../../../components/DialogConfirm";

const RootPageCatalogList = styled(Box)(({ theme }) => ({
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

function CatalogListPage() {
  const navigate = useNavigate();
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isDeleted, setIsDeleted] = useState();
  const [id, setId] = useState("");
  const [index, setIndex] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

  const filterRows = useCallback(
    (searchString) => {
      setPage(0);
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.catalogName.toLowerCase().includes(searchString.toLowerCase())
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
    let response;
    const catalogs = [...dataFetched];
    if (isDeleted) {
      response = await restoreCatalog(id);
      if (response.success) {
        enqueueSnackbar("Khôi phục danh mục thành công!", { variant: "success" });
        catalogs[index + page * rowsPerPage].isDeleted = !isDeleted;
        setRowsSearched(catalogs);
      } else {
        enqueueSnackbar("Khôi phục danh mục thất bại!", { variant: "error" });
      }
    } else {
      response = await deleteCatalog(id);
      if (response.success) {
        enqueueSnackbar("Xóa danh mục thành công!", { variant: "success" });
        catalogs[index + page * rowsPerPage].isDeleted = !isDeleted;
        setRowsSearched(catalogs);
      } else {
        enqueueSnackbar("Xóa danh mục thất bại!", { variant: "error" });
      }
    }
  };
  return (
    <RootPageCatalogList>
      <Typography variant="h3">Danh sách danh mục</Typography>
      <AddButton component={Link} variant="contained" color="color1" to="/admin/catalog-management/add">
        <Typography color={"white"}>
          Thêm Danh Mục Mới
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
              <TableCell align="center">Mã danh mục</TableCell>
              <TableCell align="center">Tên danh mục</TableCell>
              <TableCell align="center">Đường dẫn</TableCell>
              <TableCell align="center">Số lượng sản phẩm</TableCell>
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
                <TableCell style={{ minWidth: 50 }} align="center">
                  {row.catalogId}
                </TableCell>
                <TableCell style={{ minWidth: 200 }} align="center">
                  {row.catalogName}
                </TableCell>
                <TableCell style={{ minWidth: 100 }} align="center">
                  {row.catalogURL}
                </TableCell>
                <TableCell style={{ minWidth: 50 }} align="center">
                  {row.numberOfProducts}
                </TableCell>
                <TableCell style={{ minWidth: 250 }} align="center">
                  {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
                </TableCell>
                <TableCell style={{ minWidth: 200 }} align="center">
                  <MuiButton
                    color="teal"
                    onClick={() => {
                      navigate(`/admin/catalog-management/${row.catalogId}`, {
                        state: {
                          editCatalog: row
                        }
                      })
                    }}
                  >
                    <EditIcon />
                  </MuiButton>
                  <MuiButton
                    component={Link}
                    color="color1"
                    onClick={(e) => {
                      setIndex(i);
                      setId(row.catalogId);
                      setIsDeleted(row.isDeleted);
                      setDeleteDialog(true);
                    }}
                  >
                    {row.isDeleted ? <RestoreFromTrashIcon /> : <DeleteIcon />}
                  </MuiButton>
                  <DialogConfirm
                    open={deleteDialog}
                    title={isDeleted ? "Khôi phục danh mục" : "Xóa danh mục"}
                    content={
                      isDeleted
                        ? "Bạn có chắc chắn muốn khôi phục danh mục này"
                        : "Bạn có chắc chắn muốn xóa danh mục này?"
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
    </RootPageCatalogList>
  );
}

export default CatalogListPage;
