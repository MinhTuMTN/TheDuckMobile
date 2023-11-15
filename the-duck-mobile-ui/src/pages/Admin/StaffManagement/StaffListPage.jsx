import { Search } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
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
import { useContext, useEffect, useState } from "react";
import MuiButton from "../../../components/MuiButton";
import MuiTextFeild from "../../../components/MuiTextFeild";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../layouts/AdminLayout";

const RootPageStaffList = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const AddButton = styled(MuiButton)(({ theme }) => ({
  width: "25%",
  marginBottom: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#FF6969",
  }
}));

function StaffListPage() {
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

  const filterRows = (searchString) => {
    if (searchString === "") {
      return dataFetched;
    }
    return dataFetched.filter((row) =>
      row.fullName.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  useEffect(() => {
    const filtered = filterRows(searchString);
    setRowsSearched(filtered);
  }, [searchString]);

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
    <RootPageStaffList>
      <Typography variant="h3">Danh sách nhân viên</Typography>
      <AddButton
        component={Link}
        variant="contained"
        color="color1"
        to="/admin/staff-management/add"
      >
        <Typography color={"white"}>
          Thêm Nhân Viên Mới
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
              <TableCell align="center">Mã nhân viên</TableCell>
              <TableCell align="center">Họ tên</TableCell>
              <TableCell align="center">Ảnh đại diện</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Tên chi nhánh làm việc</TableCell>
              <TableCell align="center">Số lượng đơn hàng đã nhận</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
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
              <TableRow key={row.userId}>
                <TableCell style={{ minWidth: 200 }} align="center">
                  {row.userId}
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  {row.fullName}
                </TableCell>
                <TableCell style={{ minWidth: 250 }} align="center">
                  <img
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    alt="avatar"
                    src={row.avatar}
                  />
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  {row.phone}
                </TableCell>
                <TableCell style={{ minWidth: 200 }} align="center">
                  {row.email}
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  {row.storeName}
                </TableCell>
                <TableCell style={{ minWidth: 50 }} align="center">
                  {row.numberOfOrder}
                </TableCell>
                <TableCell style={{ minWidth: 170 }} align="center">
                  {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
                </TableCell>
                <TableCell style={{ minWidth: 225 }} align="center">
                  <MuiButton
                    color="oldPrimary"
                    onClick={(e) => {
                      navigate("/admin/staff-management/detail", {
                        state: {
                          id: row.customerId,
                        },
                      });
                    }}
                  >
                    <InfoIcon />
                  </MuiButton>
                  <MuiButton
                    color="teal"
                    onClick={(e) => {
                      navigate("/admin/staff-management/edit", {
                        state: {
                          id: row.customerId,
                        },
                      });
                    }}
                  >
                    <EditIcon />
                  </MuiButton>
                  <MuiButton color="color1">
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
    </RootPageStaffList>
  );
}

export default StaffListPage;
