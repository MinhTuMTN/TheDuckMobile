import { FormControl, FormLabel, Grid, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
    '& input': {
        height: '55px',
    },
}));

function Step2({ value, onChange }) {
    const [screenResolution, setScreenResolution] = useState('');
    const [color, setColor] = useState('');
    const [date, setDate] = useState(dayjs());

    const handleChange = (event) => {
        onChange(2, event.target.value);
    };

    const handleScreenResolutionChange = (event) => {
        setScreenResolution(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <FlexContainer justifyContent="center">
            <FormAddProduct>
                <Typography variant="h3">Thêm thông tin sản phẩm chi tiết</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <MuiTextFeild
                            label="Giá"
                            margin="normal"
                            autoFocus
                            required
                            value={value.valueStep2}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <MuiTextFeild
                            label="RAM"
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <MuiTextFeild
                            label="Kích thước màn hình"
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <MuiTextFeild
                            label="Pin"
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <FormLabel><Typography>Màu sắc</Typography></FormLabel>
                            <Select
                                displayEmpty
                                value={color}
                                onChange={handleColorChange}
                            >
                                <MenuItem disabled value="">
                                    <em>Lựa Chọn Màu Sắc</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <FormLabel><Typography>Độ phân giải màn hình</Typography></FormLabel>
                            <Select
                                displayEmpty
                                value={screenResolution}
                                onChange={handleScreenResolutionChange}
                            >
                                <MenuItem disabled value="">
                                    <em>Lựa Chọn Độ Phân Giải</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <MuiTextFeild
                    label="Vật liệu"
                    margin="normal"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <CustomDatePicker
                        label="Ngày phát hành"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                    />
                </LocalizationProvider>
                <MuiTextFeild
                    label="Mô tả"
                    margin="normal"
                />
            </FormAddProduct>
        </FlexContainer>
    );
}

export default Step2;