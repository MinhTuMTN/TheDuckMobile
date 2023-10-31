import { FormControl, FormLabel, MenuItem, Paper, Select, Typography, styled, useTheme } from "@mui/material";
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
    const [catalog, setCatalog] = useState([]);
    const [os, setOS] = useState('');

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
        const {
            target: { value },
        } = event;

        setCatalog(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FlexContainer justifyContent="center">
            <FormAddProduct>
                <Typography variant="h3">Thêm sản phẩm mới</Typography>
                <MuiTextFeild
                    label="Tên sản phẩm"
                    margin="normal"
                    autoFocus
                    required
                    value={value.valueStep1}
                    onChange={handleChange}
                />
                <MuiTextFeild
                    label="Mô tả"
                    margin="normal"
                />

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

                <FormControl sx={{ mt: 2 }}>
                    <FormLabel><Typography>Danh Mục</Typography></FormLabel>
                    <Select
                        multiple
                        displayEmpty
                        value={catalog}
                        onChange={handleCatalogChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Lựa Chọn Danh Mục</em>;
                            }

                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Danh Mục</em>
                        </MenuItem>
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, catalog, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
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
            </FormAddProduct>
        </FlexContainer>
    );
}

export default Step1;