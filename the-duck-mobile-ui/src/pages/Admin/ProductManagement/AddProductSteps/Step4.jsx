import { FormControl, FormLabel, Grid, MenuItem, Paper, Select, Typography, styled, useTheme } from "@mui/material";
import FlexContainer from "../../../../components/FlexContainer";
import MuiTextFeild from "../../../../components/MuiTextFeild";
import { useState } from "react";

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
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const FormAddProduct = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "80%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

const CustomImage = styled('img')(({ theme }) => ({
    marginTop: theme.spacing(2),
    border: "1px solid",
    borderRadius: "5px",
    height: "315px",
    width: "auto",
    maxWidth: "315px",
}));

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function Step1({ value, onChange }) {
    const theme = useTheme();

    const [brand, setBrand] = useState('');
    const [catalog, setCatalog] = useState('');
    const [os, setOS] = useState('');
    const [image, setImage] = useState();
    const [specialFeature, setSpecialFeature] = useState([]);

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleChange = (event) => {
        onChange(1, event.target.value);
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleOSChange = (event) => {
        setOS(event.target.value);
    };

    const handleCatalogChange = (event) => {
        setCatalog(event.target.value);
    };

    const handleSpecialFeatureChange = (event) => {
        const {
            target: { value },
        } = event;

        setSpecialFeature(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <FlexContainer justifyContent="center">
            <FormAddProduct>
                <Typography variant="h3">Thêm sản phẩm mới</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={7}>

                        <MuiTextFeild
                            label="Tên sản phẩm"
                            margin="normal"
                            autoFocus
                            required
                            value={value.valueStep1}
                            onChange={handleChange}
                        />

                        <MuiTextFeild
                            label="Số lượng"
                            margin="normal"
                            required
                        />

                        <MuiTextFeild
                            label="Mô tả"
                            margin="normal"
                            required
                            multiline
                            rows={8}
                        />

                    </Grid>
                    <Grid item xs={5}>

                        <CustomImage src={image} />

                        <MuiTextFeild
                            type="file"
                            required
                            onChange={handleImageChange}
                            sx={{ mt: 2 }}
                        />
                    </Grid>
                </Grid>

                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Danh Mục</Typography></FormLabel>
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
                    <FormLabel><Typography>Thương Hiệu</Typography></FormLabel>
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
                    <FormLabel><Typography>Hệ Điều Hành</Typography></FormLabel>
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
                <FormControl sx={{ mt: 2 }}>
                    <FormLabel><Typography>Tính Năng Đặc Biệt</Typography></FormLabel>
                    <Select
                        multiple
                        displayEmpty
                        value={specialFeature}
                        onChange={handleSpecialFeatureChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Lựa Chọn Tính Năng Đặc Biệt</em>;
                            }

                            return selected.join(', ');
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
                                style={getStyles(name, specialFeature, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormAddProduct>
        </FlexContainer>
    );
}

export default Step1;