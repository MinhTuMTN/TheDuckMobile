import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addOS } from "../../../services/Admin/OSService";
import { enqueueSnackbar } from "notistack";

const RootPageAddOS = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddOS = styled(Paper)(({ theme }) => ({
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

function AddOSPage(props) {
    const navigate = useNavigate();
    const [os, setOS] = useState({
        osName: ""
    });

    const handleAddOS = async () => {
        const response = await addOS({
            osName: os.osName
        });

        if (response.success) {
            enqueueSnackbar("Thêm hệ điều hành thành công", { variant: "success" });
            navigate("/admin/os-management/list");
        } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    return (
        <RootPageAddOS>
            <FormAddOS>
                <Typography variant="h3">Thêm hệ điều hành mới</Typography>
                <MuiTextFeild
                    label="Tên hệ điều hành"
                    margin="normal"
                    autoFocus
                    onChange={(e) => {
                        setOS((prev) => ({
                            ...prev,
                            osName: e.target.value,
                        }));
                    }}
                    required
                />
                {/* <MuiTextFeild
                    label="Mô tả"
                    margin="normal"
                    required
                /> */}
                <FlexContainer justifyContent="center">
                    <AddButton
                        variant="contained"
                        color="color1"
                        onClick={handleAddOS}
                    >
                        <Typography color={"white"}>Thêm Mới</Typography>
                    </AddButton>
                </FlexContainer>

            </FormAddOS>
        </RootPageAddOS>
    );
}

export default AddOSPage;