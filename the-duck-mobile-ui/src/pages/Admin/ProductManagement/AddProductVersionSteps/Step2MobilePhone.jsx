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

function Step2MobilePhone({ value, onChange }) {
    const [networkType, setNetWorkType] = useState('');
    const [chargingPort, setChargingPort] = useState('');
    const [waterResistance, setWaterResistance] = useState('');
    const [security, setSecurity] = useState('');
    const [wifiChecked, setWifiChecked] = useState(false);
    const [gpsChecked, setGPSChecked] = useState(false);
    const [bluetoothChecked, setBluetoothChecked] = useState(false);
    const [headphoneJackChecked, setHeadphoneJackChecked] = useState(false);

    const handleChange = (event) => {
        onChange(3, event.target.value);
    };

    const handleNetWorkTypeChange = (event) => {
        setNetWorkType(event.target.value);
    };

    const handleChargingPortChange = (event) => {
        setChargingPort(event.target.value);
    };

    const handleWifiCheckedChange = (event) => {
        setWifiChecked(event.target.checked);
    };

    const handleGPSCheckedChange = (event) => {
        setGPSChecked(event.target.checked);
    };

    const handleBluetoothCheckedChange = (event) => {
        setBluetoothChecked(event.target.checked);
    };

    const handleHeadphoneJackChange = (event) => {
        setHeadphoneJackChecked(event.target.checked);
    };

    const handleWaterResistanceChange = (event) => {
        setWaterResistance(event.target.value);
    };

    const handleSecurityChange = (event) => {
        setSecurity(event.target.value);
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
                <Grid container spacing={1} sx={{ mt: 2, ml: 0.5 }}>
                    <Grid xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={wifiChecked}
                                    onChange={handleWifiCheckedChange} />
                            }
                            label="Wifi" />
                    </Grid>
                    <Grid xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={gpsChecked}
                                    onChange={handleGPSCheckedChange} />
                            }
                            label="GPS" />
                    </Grid>
                    <Grid xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={bluetoothChecked}
                                    onChange={handleBluetoothCheckedChange} />
                            }
                            label="Bluetooth" />
                    </Grid>
                    <Grid xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={headphoneJackChecked}
                                    onChange={handleHeadphoneJackChange} />
                            }
                            label="Phích cắm tai nghe"
                            sx={{ width: 250 }} />
                    </Grid>
                </Grid>
                <FormControl sx={{ mt: 1 }}>
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
                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Bảo mật</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={security}
                        onChange={handleSecurityChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Bảo Mật</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 2, mb: 2 }}>
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

            </FormAddProduct>
        </FlexContainer>
    );
}

export default Step2MobilePhone;