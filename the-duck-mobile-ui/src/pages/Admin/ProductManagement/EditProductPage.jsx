import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { useCallback, useEffect, useState } from "react";
import FlexContainer from "../../../components/FlexContainer";
import MuiButton from "../../../components/MuiButton";
import { useLocation } from "react-router-dom";
import { getProductById } from "../../../services/Admin/ProductService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const RootPageAddProduct = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddProduct = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  width: "90%",
  backgroundColor: "white",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

const EditButton = styled(MuiButton)(({ theme }) => ({
  width: "30%",
  "&:hover": {
    backgroundColor: "#FF6969",
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function EditProductPage() {
  const { state } = useLocation();
  const theme = useTheme();
  const [specialFeatures, setSpecialFeatures] = useState([]);
  const [product, setProduct] = useState({});
  const [brand, setBrand] = useState("");
  const [catalog, setCatalog] = useState("");
  const [os, setOS] = useState("");

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleOSChange = (event) => {
    setOS(event.target.value);
  };

  const handleCatalogChange = (event) => {
    setCatalog(event.target.value);
  };

  const handleSpecialFeaturesChange = (event) => {
    const {
      target: { value },
    } = event;

    setSpecialFeatures(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleProductNameChange = (event) => {
    const newName = event.target.value;
    setProduct({
      ...product,
      productName: newName,
    });
  };

  const handleProductDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setProduct({
      ...product,
      productDescription: newDescription,
    });
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setProduct({
      ...product,
      quantity: newQuantity,
    });
  };

  const handleGetProduct = useCallback(async () => {
    const productResponse = await getProductById(state.id);
    if (productResponse.success) {
      setProduct(productResponse.data.data);
    }
  }, [state.id]);

  useEffect(() => {
    handleGetProduct();
  }, [handleGetProduct]);

  return (
    <RootPageAddProduct>
      <FormAddProduct>
        <Typography variant="h3">
          Chỉnh sửa thông tin sản phẩm "{product.productName}"
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <MuiTextFeild
              label="Tên sản phẩm"
              margin="normal"
              value={product.productName}
              autoFocus
              required
              onChange={handleProductNameChange}
              InputLabelProps={{
                shrink: true, // Keep the label always on the outline
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <MuiTextFeild
              label="Số lượng tồn kho"
              margin="normal"
              value={product.quantity}
              required
              onChange={handleQuantityChange}
              InputLabelProps={{
                shrink: true, // Keep the label always on the outline
              }}
            />
          </Grid>
          <MuiTextFeild
            label="Mô tả"
            margin="normal"
            value={product.productDescription}
            required
            multiline
            rows={5}
            onChange={handleProductDescriptionChange}
            InputLabelProps={{
              shrink: true, // Keep the label always on the outline
            }}
          />
        </Grid>

        <FormControl sx={{ mt: 1 }}>
          <FormLabel>
            <Typography>Danh mục</Typography>
          </FormLabel>
          <Select displayEmpty value={catalog} onChange={handleCatalogChange}>
            <MenuItem disabled value="">
              <em>Lựa Chọn Danh Mục</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mt: 1 }}>
          <FormLabel>
            <Typography>Thương hiệu</Typography>
          </FormLabel>
          <Select displayEmpty value={brand} onChange={handleBrandChange}>
            <MenuItem disabled value="">
              <em>Lựa Chọn Thương Hiệu</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mt: 2, mb: 2 }}>
          <FormLabel>
            <Typography>Hệ điều hành</Typography>
          </FormLabel>
          <Select displayEmpty value={os} onChange={handleOSChange}>
            <MenuItem disabled value="">
              <em>Lựa Chọn Hệ Điều Hành</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 2, mb: 2 }}>
          <FormLabel>
            <Typography>Tính Năng Đặc Biệt</Typography>
          </FormLabel>
          <Select
            multiple
            displayEmpty
            value={specialFeatures}
            onChange={handleSpecialFeaturesChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Lựa Chọn Tính Năng Đặc Biệt</em>;
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Lựa Chọn Tính Năng Đặc Biệt</em>
            </MenuItem>
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, specialFeatures, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FlexContainer justifyContent="center">
          <EditButton variant="contained" color="color1">
            <Typography color={"white"}>Cập Nhật</Typography>
          </EditButton>
        </FlexContainer>
      </FormAddProduct>
    </RootPageAddProduct>
  );
}

export default EditProductPage;
