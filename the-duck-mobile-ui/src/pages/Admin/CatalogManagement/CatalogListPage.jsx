import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DialogConfirm from "../../../components/DialogConfirm";
import DialogForm from "../../../components/DialogForm";
import MuiButton from "../../../components/MuiButton";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { DataContext } from "../../../layouts/AdminLayout";
import {
  addCatalog,
  deleteCatalog,
  restoreCatalog,
} from "../../../services/Admin/CatalogService";
import MuiTextFeild from "../../../components/MuiTextFeild";
import React from "react";

const RootPageCatalogList = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const CustomText = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "15px",
  height: "42px",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

function CatalogListPage() {
  const navigate = useNavigate();
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsSearched, setRowsSearched] = useState([]);
  const [isDeleted, setIsDeleted] = useState();
  const [id, setId] = useState("");
  const [index, setIndex] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // State for Dialog Form (Add Catalog)
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [catalog, setCatalog] = useState({
    catalogName: "",
    catalogURL: "",
  });
  const handleAddCatalog = async () => {
    const response = await addCatalog({
      catalogName: catalog.catalogName,
      catalogURL: catalog.catalogURL,
    });

    if (response.success) {
      enqueueSnackbar("Thêm màu sắc thành công", { variant: "success" });
      navigate(0);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  useEffect(() => {
    setRowsSearched(dataFetched);
  }, [dataFetched]);

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
        enqueueSnackbar("Khôi phục danh mục thành công!", {
          variant: "success",
        });
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
      <Stack direction={"row"} justifyContent={"space-between"} marginTop={4}>
        <Typography
          variant="h3"
          fontWeight={"680"}
          style={{
            fontSize: "32px",
          }}
        >
          Danh sách danh mục
        </Typography>
        <CustomButton
          onClick={() => setOpenDialogForm(true)}
          variant="contained"
          startIcon={<AddOutlinedIcon />}
        >
          Thêm
        </CustomButton>
      </Stack>

      <Table
        sx={{
          "& .MuiTableCell-sizeMedium": {
            paddingX: "20px !important",
          },
          marginTop: 5,
        }}
      >
        <TableHead
          sx={{
            bgcolor: "#F5F6FA",
          }}
        >
          <TableRow>
            <TableCell align="center">
              <CustomText color={"#101828"}>Mã danh mục</CustomText>
            </TableCell>
            <TableCell align="left">
              <CustomText color={"#101828"}>Tên danh mục</CustomText>
            </TableCell>
            <TableCell align="left">
              <CustomText color={"#101828"}>Đường dẫn</CustomText>
            </TableCell>
            <TableCell align="center">
              <CustomText color={"#101828"}>Số lượng sản phẩm</CustomText>
            </TableCell>
            <TableCell align="left">
              <CustomText color={"#101828"}>Trạng thái</CustomText>
            </TableCell>
            <TableCell align="center">
              <CustomText color={"#101828"}>Lựa chọn</CustomText>
            </TableCell>
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
              <TableCell style={{ minWidth: 50 }} align="center">
                <CustomText color={"#101828"}>{row.catalogId}</CustomText>
              </TableCell>
              <TableCell style={{ minWidth: 200 }}>
                <CustomText color={"#101828"}>{row.catalogName}</CustomText>
              </TableCell>
              <TableCell style={{ minWidth: 100 }}>
                <CustomText
                  color={"#101828"}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/catalog/${row.catalogURL}`)}
                >
                  {`/catalog/${row.catalogURL}`}
                </CustomText>
              </TableCell>
              <TableCell style={{ minWidth: 50 }} align="center">
                <CustomText color={"#101828"}>
                  {row.numberOfProducts}
                </CustomText>
              </TableCell>
              <TableCell style={{ minWidth: 250 }} align="left">
                <CustomText color={"#101828"}>
                  {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
                </CustomText>
              </TableCell>
              <TableCell style={{ minWidth: 200 }} align="center">
                <MuiButton
                  color="teal"
                  onClick={() => {
                    navigate(`/admin/catalog-management/${row.catalogId}`, {
                      state: {
                        editCatalog: row,
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
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={rowsSearched.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              sx={{ fontSize: "14px !important" }}
            />
          </TableRow>
        </TableFooter>
      </Table>

      <DialogForm
        cancelText={"Hủy"}
        content={"Điền các thông tin sau để thêm danh mục sản phẩm mới"}
        okText={"Thêm"}
        onCancel={() => {
          setOpenDialogForm(false);
          setCatalog({
            catalogName: "",
            catalogURL: "",
          });
        }}
        onOk={handleAddCatalog}
        open={openDialogForm}
        title={"Thêm danh mục sản phẩm"}
        onClose={() => setOpenDialogForm(false)}
      >
        <Stack width={"30rem"} mt={3} spacing={4}>
          <MuiTextFeild
            label={"Tên danh mục"}
            autoFocus
            color={"color4"}
            autoComplete="off"
            value={catalog.catalogName}
            className={"custom-text-feild"}
            onChange={(e) => {
              setCatalog((prev) => ({
                ...prev,
                catalogName: e.target.value,
              }));
            }}
            required
          />
          <MuiTextFeild
            label="Đường dẫn"
            className={"custom-text-feild"}
            value={catalog.catalogURL}
            autoComplete="off"
            onChange={(e) => {
              setCatalog((prev) => ({
                ...prev,
                catalogURL: e.target.value,
              }));
            }}
            required
          />
        </Stack>
      </DialogForm>
    </RootPageCatalogList>
  );
}

export default CatalogListPage;
