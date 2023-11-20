import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchSeller from "../../../components/Store/SearchSeller";
import styled from "@emotion/styled";
import BrandsTable from "../../../components/Admin/BrandsTables";
import AddNewBrand from "../../../components/Admin/AddNewBrand";
import CloseIcon from "@mui/icons-material/Close";

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
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

const items = [
  {
    id: "5e887ac47eed253091be10cb",
    brandName: "SamSung",
    brandImage:
      "https://m-cdn.phonearena.com/images/articles/383565-image/Samsung-Logo-with-serif.jpg",
    quantity: 50,
    status: "Đang hoạt động",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    brandName: "Dell Inc",
    brandImage:
      "https://inkythuatso.com/uploads/images/2021/10/dell-logo-inkythuatso-4-01-30-10-17-55.jpg",

    quantity: 0,
    status: "Khoá",
  },
  {
    id: "5e86809283e28b96d2d38537",
    brandName: "Điện thoại Samsung Galaxy S21 Ultra 5G 128GB",
    brandImage:
      "https://smartviets.com/template/plugins/timthumb.php?src=/upload/image/nh%20%C4%91%E1%BA%A1i%20di%E1%BB%87n/s21%20ultra%20titan.jpg&w=770&h=770&q=80",

    quantity: 100,
    status: "Đang hoạt động",
  },
  {
    id: "6e887b203c28ac3dd97f1db5",
    brandName: "Đồng hồ thông minh Apple Watch SE 2022 GPS 40mm",
    brandImage:
      "https://cdn.tgdd.vn/Products/Images/7077/289612/apple-watch-se-2022-40mm-day-silicone-trang-kem-1.jpg",

    quantity: 0,
    status: "Đang hoạt động",
  },
  {
    id: "7e887b209c281c3dd97f6db7",
    brandName: "Đồng hồ thông minh Apple Watch SE 2022 LTE 40mm ",
    brandImage:
      "https://cdn.tgdd.vn/Products/Images/7077/289799/apple-watch-se-2022-lte-40mm-den-xanh-1.jpg",

    quantity: 0,
    status: "Khoá",
  },
  {
    id: "5e887b202c28ac3dd94f6vb5",
    brandName: "Laptop Apple MacBook Pro 13 inch M2 2022",
    brandImage:
      "https://cdn.tgdd.vn/Products/Images/44/282828/apple-macbook-pro-13-inch-m2-2022-1-1.jpg",

    quantity: 0,
    status: "Đang hoạt động",
  },
];

function BrandListPage(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  return (
    <Box component={"main"} sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth={"lg"}>
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h3">Danh sách thương hiệu</Typography>
            <CustomButton
              onClick={() => setOpen(true)}
              variant="contained"
              startIcon={<AddOutlinedIcon />}
            >
              Thêm nhãn hàng
            </CustomButton>
          </Stack>
          <Stack
            component={Paper}
            elevation={3}
            sx={{
              paddingBottom: 2,
              borderRadius: "25px",
            }}
            spacing={"2px"}
          >
            <SearchSeller />

            <BrandsTable
              count={items.length}
              items={items}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Stack>
      </Container>

      <BootstrapDialog
        open={open}
        onOk={() => {}}
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thêm thương hiệu mới
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
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
          <AddNewBrand />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            Tạo mới
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}

export default BrandListPage;
