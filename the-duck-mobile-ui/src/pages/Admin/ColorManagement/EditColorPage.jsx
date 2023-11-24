import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { updateColor } from "../../../services/Admin/ColorService";
import { useLocation, useNavigate } from "react-router-dom";

const RootPageEditColor = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormEditColor = styled(Paper)(({ theme }) => ({
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

function EditColorPage(props) {
    const navigate = useNavigate();
    const { editColor } = useLocation().state;
    const [color, setColor] = useState({
        colorName: "",
        colorCode: "",
    });

    useEffect(() => {
        setColor((prev) => {
            return {
                ...prev,
                colorName: editColor.colorName,
                colorCode: editColor.colorCode,
            };
        });
    }, [editColor]);

    const handleEditColor = async () => {
        const response = await updateColor(editColor.colorId, {
            colorName: color.colorName,
            colorCode: color.colorCode,
        });

        if (response.success) {
            enqueueSnackbar("Chỉnh sửa màu sắc thành công", { variant: "success" });
            navigate("/admin/color-management");
        } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    return (
        <RootPageEditColor>
            <FormEditColor>
                <Typography variant="h3">Chỉnh sửa thông tin màu sắc "{ }"</Typography>
                <MuiTextFeild
                    label="Tên màu sắc"
                    margin="normal"
                    value={color.colorName}
                    onChange={(e) => {
                        setColor((prev) => ({
                            ...prev,
                            colorName: e.target.value,
                        }));
                    }}
                    autoFocus
                    required
                />
                <MuiTextFeild
                    label="Mã màu"
                    margin="normal"
                    value={color.colorCode}
                    onChange={(e) => {
                        setColor((prev) => ({
                            ...prev,
                            colorCode: e.target.value,
                        }));
                    }}
                    required
                />
                <FlexContainer justifyContent="center">
                    <EditButton
                        variant="contained"
                        color="color1"
                        onClick={handleEditColor}
                    >
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditColor>
        </RootPageEditColor>
    );
}

export default EditColorPage;