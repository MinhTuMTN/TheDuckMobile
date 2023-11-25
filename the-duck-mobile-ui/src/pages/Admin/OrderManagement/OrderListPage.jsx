import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Popover,
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
  styled,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import MuiTextFeild from "../../../components/MuiTextFeild";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../layouts/AdminLayout";
import { useTheme } from "@emotion/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormatCurrency from "../../../components/FormatCurrency";

const CellHead = styled(TableCell)(({ theme }) => ({
  fontSize: "18px",
  paddingY: "0.2rem ",
}));

const CellBody = styled(TableCell)(({ theme }) => ({
  fontSize: "15px !important",
  paddingX: "0",
  paddingY: "0",
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorId, setAnchorId] = useState(null);

  const statusOptions = {
    0: {
      color: "primary",
      label: "Chờ xác nhận",
    },
    1: {
      color: "info",
      label: "Đang xử lý",
    },
    2: {
      color: "warning",
      label: "Đang giao hàng",
    },
    3: {
      color: "success",
      label: "Đã hoàn thành",
    },
    4: {
      color: "error",
      label: "Đã huỷ",
    },
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Điều này sẽ kiểm tra nếu màn hình lớn hơn hoặc bằng lg breakpoint

  const openPopover = id => (event) => {
    setAnchorId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorId(null);
    setAnchorEl(null);
  };

  const filterRows = useCallback(
    (searchString) => {
      setPage(0);
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.customerName.toLowerCase().includes(searchString.toLowerCase())
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

  const getChipColor = (orderState) => {
    return statusOptions[orderState]?.color || "default";
  }
  return (
    <Grid
      container
      sx={{
        py: 3,
        px: isFullScreen ? 8 : 3,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Grid item xs={12} mb={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: ["20px", "28px"],
            }}
            fontWeight="700"
            paddingX={2}
            paddingBottom={2}
          >
            Danh sách đơn hàng
          </Typography>
        </Stack>
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
              placeholder="Tìm kiếm theo tên khách hàng"
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
                  <CellHead
                    align="center"
                    sx={{
                      width: "20%",
                    }}
                  >
                    Mã đơn hàng
                  </CellHead>
                  <CellHead
                    align="center"
                    sx={{
                      width: "20%",
                    }}
                  >
                    Khách hàng
                  </CellHead>
                  <CellHead
                    align="center"
                    sx={{
                      width: "20%",
                    }}
                  >
                    Nhân viên
                  </CellHead>
                  <CellHead
                    align="center"
                    sx={{
                      width: "20%",
                    }}
                  >
                    Tổng tiền
                  </CellHead>
                  <CellHead
                    align="center"
                    sx={{
                      width: "10%",
                    }}
                  >
                    Trạng thái
                  </CellHead>
                  <CellHead
                    align="center"
                    sx={{
                      width: "10%",
                    }}
                  >
                    Tuỳ Chọn
                  </CellHead>
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
                    <CellBody
                      style={{ width: "20%" }}
                      align="center"
                    >
                      {row.orderId}
                    </CellBody>
                    <CellBody
                      style={{
                        width: "20%",
                      }}
                      align="center"
                    >
                      {row.customerName}
                    </CellBody>
                    <CellBody
                      style={{
                        width: "20%",
                      }}
                      align="center"
                    >
                      {row.staffName}
                    </CellBody>
                    <CellBody
                      style={{
                        width: "20%",
                      }}
                      align="center"
                    >
                      <FormatCurrency amount={row.total} />
                    </CellBody>
                    <CellBody
                      style={{
                        width: "20%",
                      }}
                      align="center"
                    >
                      <Chip
                        color={getChipColor(row.orderState)}
                        label={statusOptions[row.orderState]?.label}
                      />
                    </CellBody>
                    <CellBody
                      style={{
                        minWidth: 50,
                        fontSize: "14px",
                      }}
                      align="center"
                    >
                      {isSmallScreen ? (
                        // Hiển thị cho màn hình nhỏ
                        <>
                          <IconButton
                            color="black"
                            aria-describedby={id}
                            onClick={openPopover(row.orderId)}
                          >
                            <MoreVertIcon color="black" />
                          </IconButton>
                          <Popover
                            id={id}
                            open={anchorId === row.orderId}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <Stack direction={"column"}>
                              <Button
                                variant="text"
                                size="medium"
                                sx={{
                                  paddingX: 2,
                                  paddingY: 1,
                                  textAlign: "left",
                                }}
                                onClick={() => {
                                  navigate(`/admin/order-management/${row.orderId}`, {
                                    state: {
                                      prevURL: "/admin/order-management",
                                      id: row.orderId
                                    }
                                  });
                                }}
                              >
                                Xem
                              </Button>
                            </Stack>
                          </Popover>
                        </>
                      ) : (
                        // Hiển thị cho màn hình vừa và lớn
                        <>
                          <IconButton
                            color="black"
                            onClick={() => {
                              navigate(`/admin/order-management/${row.orderId}`, {
                                state: {
                                  prevURL: "/admin/order-management",
                                  id: row.orderId
                                }
                              });
                            }}
                          >
                            <InfoOutlinedIcon color="black" />
                          </IconButton>
                        </>
                      )}
                    </CellBody>
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
        </Stack>
      </Grid>
    </Grid>
  );
}

export default OrderListPage;
