import { Box, FormControl, FormLabel, Grid, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { useState } from "react";

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

function AddProductPage() {
    const [brand, setBrand] = useState('');
    const [catalog, setCatalog] = useState('');
    const [os, setOS] = useState('');

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleOSChange = (event) => {
        setOS(event.target.value);
    };

    const handleCatalogChange = (event) => {
        setCatalog(event.target.value);
    };

    return (
        <RootPageAddProduct>
            <FormAddProduct>
                <Typography variant="h3">Thêm sản phẩm mới</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <MuiTextFeild
                            label="Tên sản phẩm"
                            margin="normal"
                            autoFocus
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <MuiTextFeild
                            label="Số lượng"
                            margin="normal"
                            required
                        />
                    </Grid>
                    <MuiTextFeild
                        label="Mô tả"
                        margin="normal"
                        required
                        multiline
                        rows={3}
                    />
                </Grid>

                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Danh mục</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={catalog}
                        onChange={handleCatalogChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Danh Mục</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Thương hiệu</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={brand}
                        onChange={handleBrandChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Thương Hiệu</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2, mb: 2 }}>
                    <FormLabel><Typography>Hệ điều hành</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={os}
                        onChange={handleOSChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Hệ Điều Hành</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </FormAddProduct>
            </RootPageAddProduct>
    );
}

export default AddProductPage;