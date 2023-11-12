import { Box, FormControl, FormControlLabel, FormLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const RootPageAddStaff = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddStaff = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "90%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

const AddButton = styled(MuiButton)(({ theme }) => ({
    width: "30%",
    "&:hover": {
        backgroundColor: "#FF6969",
    }
}));

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
    '& input': {
        height: '60px',
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

function AddStaffPage(props) {
    const [store, setStore] = useState('');
    const [date, setDate] = useState(dayjs());
    const [image, setImage] = useState();

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleStoreChange = (event) => {
        setStore(event.target.value);
    };

    return (
        <RootPageAddStaff>
            <FormAddStaff>
                <Typography variant="h3">Thêm nhân viên mới</Typography>
                <Stack direction="row" spacing={3}>
                    <Stack direction="column" style={{ width: "62%" }}>
                        <MuiTextFeild
                            label="Họ tên nhân viên"
                            margin="normal"
                            autoFocus
                            required
                        />
                        <MuiTextFeild
                            label="Email"
                            margin="normal"
                            required
                            type="email"
                        />
                        <MuiTextFeild
                            label="Số điện thoại"
                            margin="normal"
                            required
                            type="tel"
                        />
                        <FormControl
                            style={{
                                marginTop: "15px"
                            }}
                        >
                            <FormLabel><Typography>Giới tính</Typography></FormLabel>
                            <RadioGroup
                                row
                                defaultValue="male"
                                name="gender"
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                <FormControlLabel value="other" control={<Radio />} label="Khác" />
                            </RadioGroup>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <CustomDatePicker
                                label="Ngày sinh"
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                                sx={{ mt: 3 }}
                            />
                        </LocalizationProvider>
                    </Stack>
                    <Stack direction="column" style={{ width: "38%" }}>
                        <CustomImage src={image} />
                        <MuiTextFeild
                            type="file"
                            required
                            onChange={handleImageChange}
                            sx={{ mt: 2 }}
                        />
                    </Stack>
                </Stack>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                    <FormLabel><Typography>Chi nhánh làm việc</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={store}
                        onChange={handleStoreChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Chi Nhánh</em>
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
            </FormAddStaff>
        </RootPageAddStaff>
    );
}

export default AddStaffPage;