import {
  Grid,
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
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useCallback, useContext, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../layouts/AdminLayout";

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({}));
const CellHead = styled(TableCell)(({ theme }) => ({
  fontSize: "18px",
  paddingY: "0.2rem ",
}));

const CellBody = styled(TableCell)(({ theme }) => ({
  fontSize: "15px !important",
  paddingX: "0",
  paddingY: "0",
}));

function CustomerListPage() {
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

  const filterRows = useCallback(
    (searchString) => {
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.fullName.toLowerCase().includes(searchString.toLowerCase())
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
    <Grid
      container
      sx={{
        py: 3,
        px: 4,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h3" paddingX={2} paddingBottom={2}>
          Danh sách khách hàng
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Stack
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: "25px",
          }}
          spacing={"2px"}
        >
          <Box
            sx={{
              padding: 2,
              borderRadius: "25px 25px 0 0 ",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <SearchTextField
              fullWidth
              variant="outlined"
              placeholder="Tìm kiếm theo tên"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                style: { fontSize: 14 },
              }}
            />
          </Box>

          <TableContainer
            sx={{
              paddingX: 3,
              borderRadius: "0 0 25px 25px ",
            }}
            component={Paper}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <CellHead align="left">Họ Tên</CellHead>
                  <CellHead
                    align="left"
                    sx={{
                      minWidth: "120px",
                    }}
                  >
                    Số Điện Thoại
                  </CellHead>
                  <CellHead align="right">Điểm</CellHead>
                  <CellHead
                    align="right"
                    sx={{
                      minWidth: "150px",
                    }}
                  >
                    Số Đánh Giá
                  </CellHead>
                  <CellHead
                    align="right"
                    sx={{
                      minWidth: "100px",
                    }}
                  >
                    Số Đơn
                  </CellHead>
                  <CellHead align="right">Trạng Thái</CellHead>
                  <CellHead align="right">Tuỳ Chọn</CellHead>
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
                  <TableRow
                    key={i}
                    sx={{
                      paddingY: "0",
                    }}
                  >
                    <CellBody style={{ minWidth: 200 }} align="left">
                      {row.fullName}
                    </CellBody>

                    <CellBody style={{ minWidth: 150 }} align="left">
                      {row.phone}
                    </CellBody>

                    <CellBody style={{ minWidth: 50 }} align="right">
                      {row.point == null ? 0 : row.point}
                    </CellBody>
                    <CellBody style={{ minWidth: 50 }} align="right">
                      {row.numberOfVotes}
                    </CellBody>
                    <CellBody style={{ minWidth: 50 }} align="right">
                      {row.numberOfOrder}
                    </CellBody>
                    <CellBody style={{ minWidth: 170 }} align="right">
                      {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
                    </CellBody>
                    <CellBody
                      style={{ minWidth: 50, fontSize: "14px" }}
                      align="center"
                    >
                      <IconButton
                        color="black"
                        onClick={(e) => {
                          navigate(`/admin/customer-management/${row.userId}`, {
                            state: {
                              id: row.userId,
                            },
                          });
                        }}
                      >
                        <InfoOutlinedIcon color="black" />
                      </IconButton>
                    </CellBody>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={11} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={10}
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
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CustomerListPage;
