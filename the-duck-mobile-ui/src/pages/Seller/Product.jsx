import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchSeller from "../../components/Store/SearchSeller";
import Filter from "../../components/Store/Filter";
import ProductsTable from "../../components/Store/ProductsTable";

const items = [
  {
    id: "5e887ac47eed253091be10cb",
    productName: "Điện thoại iPhone 14 Pro Max 128GB",
    productImage:
      "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/iPhone-15-pink1.jpg",
    price: 10000000,
    quantity: 50,
    status: "Còn bán",
    category: "Điện thoại",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    productName: "Laptop Dell XPS 13",
    productImage:
      "https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-vivobook-15-oled-a1505za-l1245w-5_9a8ca184f97545c9bbb80529c69735a8.png",
    price: 15000000,
    quantity: 0,
    status: "Ngưng bán",
    category: "Laptop",
  },
  {
    id: "5e86809283e28b96d2d38537",
    productName: "Điện thoại Samsung Galaxy S21 Ultra 5G 128GB",
    productImage:
      "https://smartviets.com/template/plugins/timthumb.php?src=/upload/image/nh%20%C4%91%E1%BA%A1i%20di%E1%BB%87n/s21%20ultra%20titan.jpg&w=770&h=770&q=80",
    price: 15000000,
    quantity: 100,
    status: "Còn bán",
    category: "Điện thoại",
  },
  {
    id: "6e887b203c28ac3dd97f1db5",
    productName: "Đồng hồ thông minh Apple Watch SE 2022 GPS 40mm",
    productImage:
      "https://cdn.tgdd.vn/Products/Images/7077/289612/apple-watch-se-2022-40mm-day-silicone-trang-kem-1.jpg",
    price: 6900000,
    quantity: 0,
    status: "Còn bán",
    category: "Đồng hồ",
  },
  {
    id: "7e887b209c281c3dd97f6db7",
    productName: "Đồng hồ thông minh Apple Watch SE 2022 LTE 40mm ",
    productImage:
      "https://cdn.tgdd.vn/Products/Images/7077/289799/apple-watch-se-2022-lte-40mm-den-xanh-1.jpg",
    price: 15000000,
    quantity: 0,
    status: "Ngưng bán",
    category: "Đồng hồ",
  },
  {
    id: "5e887b202c28ac3dd94f6vb5",
    productName: "Laptop Apple MacBook Pro 13 inch M2 2022",
    productImage:
      "https://cdn.tgdd.vn/Products/Images/44/282828/apple-macbook-pro-13-inch-m2-2022-1-1.jpg",
    price: 29890000,
    quantity: 0,
    status: "Còn bán",
    category: "Laptop",
  },
];

function Product(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const handleChangeCategoryFilter = (event) => {
    if (event.target.checked) {
      setSelectedCategory((prev) => [...prev, event.target.value]);
    } else {
      setSelectedCategory((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  const [selectedStatus, setSelectedStatus] = React.useState([]);
  const handleChangeStatusFilter = (event) => {
    if (event.target.checked) {
      setSelectedStatus((prev) => [...prev, event.target.value]);
    } else {
      setSelectedStatus((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  const [selectedQuantity, setSelectedQuantity] = React.useState([]);
  const handleChangeQuantityFilter = (event) => {
    if (event.target.checked) {
      setSelectedQuantity((prev) => [...prev, event.target.value]);
    } else {
      setSelectedQuantity((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };
  return (
    <Box component={"main"} sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth={"lg"}>
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h3">Danh sách sản phẩm</Typography>
            <Button
              variant="contained"
              color="color2"
              sx={{ borderRadius: "15px" }}
              startIcon={<AddOutlinedIcon />}
            >
              Thêm sản phẩm
            </Button>
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
            <Box py={2} px={3}>
              {selectedCategory.length === 0 &&
                selectedQuantity.length === 0 &&
                selectedStatus.length === 0 && (
                  <TextField
                    disabled
                    variant="standard"
                    fullWidth
                    size="medium"
                    InputProps={{
                      disableUnderline: true,
                      fontSize: "14px",
                    }}
                    placeholder="Không có bộ lọc nào được chọn"
                  />
                )}
              {selectedCategory.map((item) => (
                <Chip
                  color="primary"
                  label={item}
                  onDelete={() =>
                    setSelectedCategory((prev) =>
                      prev.filter((i) => i !== item)
                    )
                  }
                />
              ))}

              {selectedStatus.map((item) => (
                <Chip
                  color="secondary"
                  label={item}
                  onDelete={() =>
                    setSelectedStatus((prev) => prev.filter((i) => i !== item))
                  }
                />
              ))}

              {selectedQuantity.map((item) => (
                <Chip
                  color="warning"
                  label={item}
                  onDelete={() =>
                    setSelectedQuantity((prev) =>
                      prev.filter((i) => i !== item)
                    )
                  }
                />
              ))}
            </Box>
            <Stack
              direction={"row"}
              spacing={1}
              paddingLeft={2}
              sx={{
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Filter
                label={"Category"}
                options={["Điện thoại", "Laptop", "Máy tính bảng", "Phụ kiện"]}
                value={selectedCategory}
                onChange={handleChangeCategoryFilter}
              />
              <Filter
                label={"Trạng thái"}
                options={["Đang bán", "Ngưng bán"]}
                value={selectedStatus}
                onChange={handleChangeStatusFilter}
              />
              <Filter
                label={"Số lượng"}
                options={["Còn hàng", "Sắp hết", "Hết hàng"]}
                value={selectedQuantity}
                onChange={handleChangeQuantityFilter}
              />
            </Stack>
            <ProductsTable
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
    </Box>
  );
}

export default Product;
