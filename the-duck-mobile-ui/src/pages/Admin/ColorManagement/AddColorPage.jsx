import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useState } from "react";
import { addColor } from "../../../services/Admin/ColorService";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const RootPageAddColor = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddColor = styled(Paper)(({ theme }) => ({
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

function AddColorPage(props) {
    const navigate = useNavigate();
    const [color, setColor] = useState({
        colorName: "",
        colorCode: "",
    });

    const handleAddColor = async () => {
        const response = await addColor({
            colorName: color.colorName,
            colorCode: color.colorCode,
        });

        if (response.success) {
            enqueueSnackbar("Thêm màu sắc thành công", { variant: "success" });
            navigate("/admin/color-management");
        } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    return (
        <RootPageAddColor>

            <FormAddColor>
                <Typography variant="h3">Thêm màu sắc mới</Typography>
                <MuiTextFeild
                    label="Tên màu sắc"
                    margin="normal"
                    autoFocus
                    required
                    onChange={(e) => {
                        setColor((prev) => ({
                            ...prev,
                            colorName: e.target.value,
                        }));
                    }}
                />
                <MuiTextFeild
                    label="Mã màu"
                    margin="normal"
                    required
                    onChange={(e) => {
                        setColor((prev) => ({
                            ...prev,
                            colorCode: e.target.value,
                        }));
                    }}
                />
                <FlexContainer justifyContent="center">
                    <AddButton
                        variant="contained"
                        color="color1"
                        onClick={handleAddColor}
                    >
                        <Typography color={"white"}>Thêm Mới</Typography>
                    </AddButton>
                </FlexContainer>

            </FormAddColor>
        </RootPageAddColor>
    );
}

export default AddColorPage;