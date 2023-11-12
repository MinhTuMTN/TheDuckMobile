import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const RootPageAddPromotion = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddPromotion = styled(Paper)(({ theme }) => ({
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
        height: '55px',
    },
}));

function AddPromotionPage(props) {
    const [date, setDate] = useState(dayjs());
    
    return (
        <RootPageAddPromotion>
            <FormAddPromotion>
                <Typography variant="h3">Thêm mã giảm giá mới</Typography>
                <MuiTextFeild
                    label="Mã giảm giá"
                    margin="normal"
                    autoFocus
                    required
                />
                <MuiTextFeild
                    label="Phần trăm giảm giá"
                    margin="normal"
                    required
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <CustomDatePicker
                        label="Ngày bắt đầu"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        sx={{ mt: 3 }}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <CustomDatePicker
                        label="Ngày kết thúc"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        sx={{ mt: 4 }}
                    />
                </LocalizationProvider>
                <FlexContainer justifyContent="center">
                    <AddButton variant="contained" color="color1">
                        <Typography color={"white"}>Thêm Mới</Typography>
                    </AddButton>
                </FlexContainer>
            </FormAddPromotion>
        </RootPageAddPromotion>
    );
}

export default AddPromotionPage;