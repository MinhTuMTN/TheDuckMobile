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
import React, { useEffect } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchSeller from "../../components/Store/SearchSeller";
import Filter from "../../components/Store/Filter";
import ProductsTable from "../../components/Store/ProductsTable";
import styled from "@emotion/styled";
import { GetStoreProduct } from "../../services/Store/StoreProductService";
import { getCatalogItems } from "../../services/Store/StoreCatalogService";
import { useSnackbar } from "notistack";
import Loading from "../../components/Loading";

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "15px",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

const statusOptions = [
  {
    name: "Đang bán",
    value: true,
  },
  {
    name: "Ngưng bán",
    value: false,
  },
];

const quantityOptions = [
  {
    name: "Còn hàng",
    value: 0,
  },
  {
    name: "Sắp hết",
    value: 1,
  },
  {
    name: "Hết hàng",
    value: 2,
  },
];
function Product(props) {
  const [productItems, setProductItems] = React.useState([]);
  const [totalItems, setTotalItems] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const handleChangeCategoryFilter = (event) => {
    if (event.target.checked) {
      setSelectedCategory((prev) => [...prev, parseInt(event.target.value)]);
    } else {
      setSelectedCategory((prev) =>
        prev.filter((item) => item !== parseInt(event.target.value))
      );
    }
  };

  const [selectedStatus, setSelectedStatus] = React.useState([]);
  const handleChangeStatusFilter = (event) => {
    if (event.target.checked) {
      setSelectedStatus((prev) => [...prev, event.target.value === "true"]);
    } else {
      setSelectedStatus((prev) =>
        prev.filter((item) => item !== (event.target.value === "true"))
      );
    }
  };

  const [selectedQuantity, setSelectedQuantity] = React.useState([]);
  const handleChangeQuantityFilter = (event) => {
    if (event.target.checked) {
      setSelectedQuantity((prev) => [...prev, parseInt(event.target.value)]);
    } else {
      setSelectedQuantity((prev) =>
        prev.filter((item) => item !== parseInt(event.target.value))
      );
    }
  };

  const [catalogs, setCatalogs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    const handleGetCatalogs = async () => {
      const response = await getCatalogItems();
      if (!response.success) return;
      setCatalogs(response?.data?.data);
      setTotalItems(response.data.data.totalObjects);
    };
    handleGetCatalogs();
  }, []);
  useEffect(() => {
    const handleGetStoreProduct = async () => {
      setIsLoading(true);
      const response = await GetStoreProduct({
        page: page - 1,
        limit: limit,
        catalogIds: selectedCategory,
        storeProductStatus: selectedStatus,
        storeProductQuantity: selectedQuantity,
      });
      if (response.success) {
        setProductItems(response.data.data.objects);
        setPage(parseInt(response.data.data.page) + 1);
        setTotalItems(response.data.data.totalObjects);
        setLimit(response.data.data.limit);
      } else
        enqueueSnackbar("Đã có lỗi xảy ra khi lấy thông tin sản phẩm", {
          variant: "error",
        });
      setIsLoading(false);
    };

    handleGetStoreProduct();
  }, [
    selectedCategory,
    selectedStatus,
    selectedQuantity,
    enqueueSnackbar,
    page,
    limit,
  ]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box component={"main"} sx={{ flexGrow: 1, py: 8 }}>
          <Container maxWidth={"lg"}>
            <Stack spacing={3}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h3">Danh sách sản phẩm</Typography>
                <CustomButton
                  variant="contained"
                  startIcon={<AddOutlinedIcon />}
                >
                  Thêm sản phẩm
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
                      label={catalogs.find((i) => i.value === item).name}
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
                      label={statusOptions.find((i) => i.value === item).name}
                      onDelete={() =>
                        setSelectedStatus((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}

                  {selectedQuantity.map((item) => (
                    <Chip
                      color="warning"
                      label={quantityOptions.find((i) => i.value === item).name}
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
                    options={catalogs}
                    value={selectedCategory}
                    onChange={handleChangeCategoryFilter}
                  />
                  <Filter
                    label={"Trạng thái"}
                    options={statusOptions}
                    value={selectedStatus}
                    onChange={handleChangeStatusFilter}
                  />
                  <Filter
                    label={"Số lượng"}
                    options={quantityOptions}
                    value={selectedQuantity}
                    onChange={handleChangeQuantityFilter}
                  />
                </Stack>
                <ProductsTable
                  count={totalItems}
                  items={productItems}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={limit}
                />
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
}

export default Product;
