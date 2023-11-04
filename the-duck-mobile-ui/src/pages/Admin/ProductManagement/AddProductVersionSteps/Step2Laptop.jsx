import { FormControl, FormLabel, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
import FlexContainer from "../../../../components/FlexContainer";
import MuiTextFeild from "../../../../components/MuiTextFeild";
import { useState } from "react";

const FormAddProduct = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "90%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

function Step2Laptop({ value, onChange }) {
    const [typeOfRAM, setTypeOfRAM] = useState('');
    const [busRAM, setBusRAM] = useState('');
    const [hardDriveType, setHardDriveType] = useState('');
    const [graphicCard, setGraphicCard] = useState('');
    const [wifiStandard, setWifiStandard] = useState('');

    const handleChange = (event) => {
        onChange(3, event.target.value);
    };

    const handleTypeOfRAMChange = (event) => {
        setTypeOfRAM(event.target.value);
    };

    const handleBusRAMChange = (event) => {
        setBusRAM(event.target.value);
    };

    const handleHardDriveTypeChange = (event) => {
        setHardDriveType(event.target.value);
    };

    const handleGraphicCardChange = (event) => {
        setGraphicCard(event.target.value);
    };
    
    const handleWifiStandardChange = (event) => {
        setWifiStandard(event.target.value);
    };
    return (
        <FlexContainer justifyContent="center">
            <FormAddProduct>
                <Typography variant="h3">Thêm thông tin sản phẩm chi tiết</Typography>
                {/* <MuiTextFeild
                    label="Mô tả"
                    margin="normal"
                    value={value.valueStep2}
                /> */}

                <FormControl sx={{ mt: 2 }}>
                    <FormLabel><Typography>Loại RAM</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={typeOfRAM}
                        onChange={handleTypeOfRAMChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Loại RAM</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                    <FormLabel><Typography>Bus RAM</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={busRAM}
                        onChange={handleBusRAMChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Bus RAM</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <MuiTextFeild
                    label="Ổ Cứng"
                    margin="normal"
                    required
                    value={value.valueStep3}
                    onChange={handleChange}
                    sx={{ mt: 3 }}
                />
                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Loại ổ cứng</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={hardDriveType}
                        onChange={handleHardDriveTypeChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Loại Ổ Cứng</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                    <FormLabel><Typography>Card đồ họa</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={graphicCard}
                        onChange={handleGraphicCardChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Card Đồ Họa</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                    <FormLabel><Typography>Chuẩn Wifi</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={wifiStandard}
                        onChange={handleWifiStandardChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Chuẩn Wifi</em>
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

export default Step2Laptop;