import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
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

function Step2SmartWatch({ value, onChange }) {
    const [waterResistance, setWaterResistance] = useState('');
    const [watchFaceShape, setWatchFaceShape] = useState('');
    const [wireMaterial, setWireMaterial] = useState('');
    const [wifiChecked, setWifiChecked] = useState(false);
    const [gpsChecked, setGPSChecked] = useState(false);

    const handleChange = (event) => {
        onChange(3, event.target.value);
    };

    const handleWaterResistanceChange = (event) => {
        setWaterResistance(event.target.value);
    };

    const handleWatchFaceShapeChange = (event) => {
        setWatchFaceShape(event.target.value);
    };

    const handleWireMaterialChange = (event) => {
        setWireMaterial(event.target.value);
    };

    const handleWifiCheckedChange = (event) => {
        setWifiChecked(event.target.checked);
    };

    const handleGPSCheckedChange = (event) => {
        setGPSChecked(event.target.checked);
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
                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Độ kháng nước</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={waterResistance}
                        onChange={handleWaterResistanceChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Độ Kháng Nước</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Hình dáng mặt đồng hồ</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={watchFaceShape}
                        onChange={handleWatchFaceShapeChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Hình Dáng Mặt Đồng Hồ</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Grid container spacing={1} sx={{ mt: 2, ml: 0.5 }}>
                    <Grid xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={wifiChecked}
                                    onChange={handleWifiCheckedChange} />
                            }
                            label="Wifi" />
                    </Grid>
                    <Grid xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={gpsChecked}
                                    onChange={handleGPSCheckedChange} />
                            }
                            label="GPS" />
                    </Grid>

                </Grid>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                    <FormLabel><Typography>Chất liệu dây</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={wireMaterial}
                        onChange={handleWireMaterialChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Chất Liệu Dây</em>
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

export default Step2SmartWatch;