import { FormControl, FormLabel, Grid, MenuItem, Paper, Select, Typography, styled, useTheme } from "@mui/material";
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

const FormAddProductVersion = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "90%",
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

    const [screenResolution, setScreenResolution] = useState('');
    const [color, setColor] = useState('');
    const [date, setDate] = useState(dayjs());
    const [specialFeatures, setSpecialFeatures] = useState([]);
    const [image, setImage] = useState();

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleChange = (event) => {
        onChange(2, event.target.value);
    };

    const handleScreenResolutionChange = (event) => {
        setScreenResolution(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleSpecialFeaturesChange = (event) => {
        const {
            target: { value },
        } = event;

        setSpecialFeatures(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FlexContainer justifyContent="center">
            <FormAddProductVersion>
                <Typography variant="h3">Thêm thông tin sản phẩm chi tiết</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <MuiTextFeild
                            label="Giá"
                            margin="normal"
                            autoFocus
                            required
                            value={value.valueStep2}
                            onChange={handleChange}
                        />
                        <MuiTextFeild
                            label="RAM"
                            margin="normal"
                            required
                        />
                        <MuiTextFeild
                            label="Kích thước màn hình"
                            margin="normal"
                            required
                        />
                        <MuiTextFeild
                            label="Pin"
                            margin="normal"
                            required
                        />
                        <MuiTextFeild
                            label="Vật liệu"
                            margin="normal"
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <CustomImage src={image} />
                        <MuiTextFeild
                            type="file"
                            required
                            onChange={handleImageChange}
                            sx={{ mt: 2.5 }}
                        />
                    </Grid>
                </Grid>
                <FormControl sx={{ mt: 2 }}>
                    <FormLabel><Typography>Tính Năng Đặc Biệt</Typography></FormLabel>
                    <Select
                        multiple
                        displayEmpty
                        value={specialFeatures}
                        onChange={handleSpecialFeaturesChange}
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
                                style={getStyles(name, specialFeatures, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid container spacing={1}>

                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
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
                        <FormControl fullWidth sx={{ mt: 2 }}>
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

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <CustomDatePicker
                        label="Ngày phát hành"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        sx={{ mt: 4 }}
                    />
                </LocalizationProvider>
            </FormAddProductVersion>
        </FlexContainer>
    );
}

export default Step1;