import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";

const RootPageEditOS = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormEditOS = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "80%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

const EditButton = styled(MuiButton)(({ theme }) => ({
    width: "30%",
    "&:hover": {
        backgroundColor: "#FF6969",
    }
}));

function EditOSPage(props) {
    return (
        <RootPageEditOS>
            <FormEditOS>
                <Typography variant="h3">Chỉnh sửa thông tin hệ điều hành "{}"</Typography>
                <MuiTextFeild
                    label="Tên hệ điều hành"
                    margin="normal"
                    autoFocus
                    required
                />
                {/* <MuiTextFeild
                    label="Mô tả"
                    margin="normal"
                    required
                /> */}
                <FlexContainer justifyContent="center">
                    <EditButton variant="contained" color="color1">
                        <Typography color={"white"}>Chỉnh Sửa</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditOS>
        </RootPageEditOS>
    );
}

export default EditOSPage;