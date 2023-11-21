import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
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
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import MuiTextFeild from "../../../../components/MuiTextFeild";
import TablePaginationActions from "../../../../components/TablePaginationActions";
import { DataContext } from "../../../../layouts/AdminLayout";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "15px",
  height: "2.5rem",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

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

function WardListPage() {
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

  const filterRows = useCallback(
    (searchString) => {
      if (searchString === "") {
        return dataFetched;
      }
      return dataFetched.filter((row) =>
        row.provineName.toLowerCase().includes(searchString.toLowerCase())
      );
    },
    [dataFetched]
  );

  useEffect(() => {
    const filtered = filterRows(searchString);
    setRowsSearched(filtered);
  }, [searchString, filterRows]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsSearched.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [editWard, setEditWard] = useState("");

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
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
          spacing={0}
          alignItems={"center"}
          marginBottom={3}
        >
          <IconButton
            aria-label="back"
            size="small"
            color="#111927"
            onClick={(e) => {
              // Xử lý sự kiện cho nút "Xem"
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography
            variant="body1"
            fontWeight={600}
            style={{
              fontSize: "14px",
              color: "#111927",
            }}
          >
            Danh sách quận huyện
          </Typography>
        </Stack>
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
            Danh sách phường xã
          </Typography>
          <CustomButton
            variant="contained"
            size="medium"
            startIcon={<AddOutlinedIcon />}
            onClick={(e) => {
              setOpenPopup(true);
              setEditWard("");
            }}
          >
            Thêm mới
          </CustomButton>
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
              placeholder="Tìm kiếm theo xã phường"
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
                    Mã xã phường
                  </CellHead>

                  <CellHead
                    align="center"
                    sx={{
                      width: "60%",
                    }}
                  >
                    Tên xã phường
                  </CellHead>
                  <CellHead
                    align="center"
                    sx={{
                      width: "20%",
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
                    <CellBody style={{ width: "20%" }} align="center">
                      {row.districtId}
                    </CellBody>

                    <CellBody style={{ width: "60%" }} align="center">
                      {row.districtName}
                    </CellBody>
                    <CellBody
                      style={{
                        minWidth: 50,
                        fontSize: "14px",
                      }}
                      align="center"
                    >
                      <>
                        {(() => {
                          const item = {
                            icon: <ModeEditIcon color="black" />,
                            action: () => {
                              setOpenPopup(true);
                              setEditWard(row.provineName);
                            },
                          };

                          return (
                            <IconButton color="black" onClick={item.action}>
                              {item.icon}
                            </IconButton>
                          );
                        })()}
                      </>
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
      <BootstrapDialog
        open={openPopup}
        onOk={() => {}}
        onClose={() => setOpenPopup(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {editWard === "" ? "Thêm xã/phường mới" : "Chỉnh sửa xã/phường"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenPopup(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <MuiTextFeild
            label="Tên xã phường"
            value={editWard}
            margin="normal"
            autoFocus
            required
            onChange={(e) => {
              editWard === ""
                ? setEditWard(e.target.value)
                : setEditWard(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenPopup(false)}>
            {editWard === "" ? "Tạo mới" : "Cập nhật"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Grid>
  );
}

export default WardListPage;
