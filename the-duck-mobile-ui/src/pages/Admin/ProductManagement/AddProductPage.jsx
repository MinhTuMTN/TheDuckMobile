import { Box, FormControl, FormLabel, MenuItem, Paper, Select, Typography, styled, useTheme } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

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
    width: "80%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

const AddButton = styled(MuiButton)(({ theme }) => ({
    width: "30%",
    "&:hover": {
        backgroundColor: "#FF6969",
    }
}));

function AddProductPage(props) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [personName2, setPersonName2] = useState([]);
    const [age, setAge] = useState('');

    const handleChange3 = (event) => {
        setAge(event.target.value);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange2 = (event) => {
        const {
            target: { value },
        } = event;

        setPersonName2(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <RootPageAddProduct>

            <FormAddProduct>
                <Typography variant="h3">Thêm sản phẩm mới</Typography>
                <MuiTextFeild
                    label="Tên sản phẩm"
                    margin="normal"
                    autoFocus
                    required
                />
                <MuiTextFeild
                    label="Mô tả"
                    margin="normal"
                />

                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Thương Hiệu</Typography></FormLabel>
                    <Select
                        multiple
                        displayEmpty
                        value={personName}
                        onChange={handleChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Lựa Chọn Thương Hiệu</em>;
                            }

                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Thương Hiệu</em>
                        </MenuItem>
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2 }}>
                    <FormLabel><Typography>Danh Mục</Typography></FormLabel>
                    <Select
                        multiple
                        displayEmpty
                        value={personName2}
                        onChange={handleChange2}
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
                                style={getStyles(name, personName2, theme)}
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
                        value={age}
                        onChange={handleChange3}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Hệ Điều Hành</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FlexContainer justifyContent="center">
                    <AddButton variant="contained" color="color1">
                        <Typography color={"white"}>Thêm Mới</Typography>
                    </AddButton>
                </FlexContainer>

            </FormAddProduct>
        </RootPageAddProduct>
    );
}

export default AddProductPage;