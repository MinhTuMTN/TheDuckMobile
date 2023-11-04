import { FormControl, FormLabel, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
import FlexContainer from "../../../../components/FlexContainer";
import MuiTextFeild from "../../../../components/MuiTextFeild";
import { useState } from "react";

const FormAddProduct = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "80%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

function Step2Tablet({ value, onChange }) {
    const [networkType, setNetWorkType] = useState('');
    const [chargingPort, setChargingPort] = useState('');

    const handleChange = (event) => {
        onChange(3, event.target.value);
    };

    const handleNetWorkTypeChange = (event) => {
        setNetWorkType(event.target.value);
    };

    const handleChargingPortChange = (event) => {
        setChargingPort(event.target.value);
    };

    return (
        <FlexContainer justifyContent="center">
            <FormAddProduct>
            <Typography variant="h3">Thêm thông tin sản phẩm chi tiết</Typography>
                <MuiTextFeild
                    label="Bộ nhớ trong"
                    margin="normal"
                    autoFocus
                    required
                    value={value.valueStep3}
                    onChange={handleChange}
                />
                <MuiTextFeild
                    label="Camera trước"
                    margin="normal"
                />
                <MuiTextFeild
                    label="Camera sau"
                    margin="normal"
                />
                <MuiTextFeild
                    label="Số lượng Sim"
                    margin="normal"
                />

                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Loại mạng</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={networkType}
                        onChange={handleNetWorkTypeChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Loại Mạng</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2, mb: 2 }}>
                    <FormLabel><Typography>Cổng sạc</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={chargingPort}
                        onChange={handleChargingPortChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Cổng Sạc</em>
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

export default Step2Tablet;