import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";

const RootPageEditStore = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormEditStore = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "90%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

const EditButton = styled(MuiButton)(({ theme }) => ({
    width: "30%",
    "&:hover": {
        backgroundColor: "#FF6969",
    }
}));

function EditStorePage(props) {
    return (
        <RootPageEditStore>
            <FormEditStore>
                <Typography variant="h3">Chỉnh sửa thông tin chi nhánh "{}"</Typography>
                <MuiTextFeild
                    label="Tên chi nhánh"
                    margin="normal"
                    autoFocus
                    required
                />
                <MuiTextFeild
                    label="Thời gian mở cửa"
                    margin="normal"
                    required
                />
                <MuiTextFeild
                    label="Địa chỉ"
                    margin="normal"
                    required
                />
                <FlexContainer justifyContent="center">
                    <EditButton variant="contained" color="color1">
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditStore>
        </RootPageEditStore>
    );
}

export default EditStorePage;