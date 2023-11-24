import { Search } from "@mui/icons-material";
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
import { useCallback, useContext, useEffect, useState } from "react";
import MuiButton from "../../../components/MuiButton";
import MuiTextFeild from "../../../components/MuiTextFeild";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../layouts/AdminLayout";

const RootPageOrderList = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

function OrderListPage() {
  const navigate = useNavigate();
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");

  const filterRows = useCallback(
    (searchString) => {
      setPage(0);
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.orderId.toLowerCase().includes(searchString.toLowerCase())
      );
    },
    [dataFetched]
  );

  useEffect(() => {
    const filtered = filterRows(searchString);
    setRowsSearched(filtered);
  }, [searchString, filterRows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <RootPageOrderList>
      <Typography variant="h3">Danh sách đơn hàng</Typography>
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
              <TableCell align="center">Mã đơn hàng</TableCell>
              <TableCell align="center">Tổng tiền</TableCell>
              <TableCell align="center">Khách hàng</TableCell>
              <TableCell align="center">Nhân Viên</TableCell>
              <TableCell align="center">Mã giảm giá</TableCell>
              <TableCell align="center">Lựa chọn</TableCell>
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
              <TableRow key={i}>
                <TableCell style={{ minWidth: 200 }} align="center">
                  {row.orderId}
                </TableCell>
                <TableCell style={{ minWidth: 150 }} align="center">
                  {row.total}
                </TableCell>
                <TableCell style={{ minWidth: 200 }} align="center">
                  {row.customerName}
                </TableCell>
                <TableCell style={{ minWidth: 200 }} align="center">
                  {row.staffName}
                </TableCell>
                <TableCell style={{ minWidth: 100 }} align="center">
                  {row.couponCode}
                </TableCell>
                <TableCell style={{ minWidth: 200 }} align="center">
                  <MuiButton
                    color="oldPrimary"
                    onClick={() => {
                      navigate(`/admin/order-management/${row.orderId}`, {
                        state: {
                          prevURL: "/admin/order-management",
                          id: row.orderId
                        }
                      });
                    }}
                  >
                    <InfoIcon />
                  </MuiButton>
                </TableCell>
              </TableRow>
            ))}
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
    </RootPageOrderList>
  );
}

export default OrderListPage;
