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
import React, { useContext, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchProductList from "../../../components/Admin/SearchProductList";
import Filter from "../../../components/Store/Filter";
import ProductsTableBasis from "../../../components/Admin/ProductsTableBasic";
import styled from "@emotion/styled";
import { DataContext } from "../../../layouts/AdminLayout";

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

function ProductListPage(props) {
  const { dataFetched } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState([]);
  const handleChangeCategoryFilter = (event) => {
    if (event.target.checked) {
      setSelectedCategory((prev) => [...prev, event.target.value]);
    } else {
      setSelectedCategory((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  const [selectedStatus, setSelectedStatus] = useState([]);
  const handleChangeStatusFilter = (event) => {
    if (event.target.checked) {
      setSelectedStatus((prev) => [...prev, event.target.value]);
    } else {
      setSelectedStatus((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  const [selectedQuantity, setSelectedQuantity] = useState([]);
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
    <Box component={"main"} sx={{ flexGrow: 1, py: 4 }}>
      <Container maxWidth={"lg"}>
        <Stack spacing={4}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              variant="h3"
              fontWeight={"680"}
              style={{
                fontSize: "32px",
              }}
            >
              Danh sách sản phẩm
            </Typography>
            <CustomButton variant="contained" startIcon={<AddOutlinedIcon />}>
              Thêm
            </CustomButton>
          </Stack>
          <Stack
            component={Paper}
            elevation={3}
            sx={{
              paddingBottom: 2,
              borderRadius: "10px",
            }}
            spacing={"2px"}
          >
            <SearchProductList />
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
              paddingBottom={1}
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
            <ProductsTableBasis
              count={dataFetched.length}
              items={dataFetched}
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

export default ProductListPage;
