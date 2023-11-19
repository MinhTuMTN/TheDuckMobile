import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateOS } from "../../../services/Admin/OSService";
import { enqueueSnackbar } from "notistack";

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

function EditOSPage(props) {
    const navigate = useNavigate();
    const { editOS } = useLocation().state;
    const [os, setOS] = useState({
        osName: ""
    });

    useEffect(() => {
        setOS((prev) => {
            return {
                ...prev,
                osName: editOS.osName
            };
        });
    }, [editOS]);

    const handleEditOS = async () => {
        const response = await updateOS(editOS.osId, {
            osName: os.osName
        });

        if (response.success) {
            enqueueSnackbar("Chỉnh sửa hệ điều hành thành công", { variant: "success" });
            navigate("/admin/os-management/list");
        } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    return (
        <RootPageEditOS>
            <FormEditOS>
                <Typography variant="h3">Chỉnh sửa thông tin hệ điều hành "{ }"</Typography>
                <MuiTextFeild
                    label="Tên hệ điều hành"
                    margin="normal"
                    autoFocus
                    value={os.osName}
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
                    <EditButton
                        variant="contained"
                        color="color1"
                        onClick={handleEditOS}
                    >
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditOS>
        </RootPageEditOS>
    );
}

export default EditOSPage;