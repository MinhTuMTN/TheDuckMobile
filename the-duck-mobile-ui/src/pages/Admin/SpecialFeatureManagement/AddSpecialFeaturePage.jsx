import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSpecialFeature } from "../../../services/Admin/SpecialFeatureService";
import { enqueueSnackbar } from "notistack";

const RootPageAddSpecialFeature = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddSpecialFeature = styled(Paper)(({ theme }) => ({
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

function AddSpecialFeaturePage(props) {
    const navigate = useNavigate();
    const [specialFeature, setSpecialFeature] = useState({
        specialFeatureName: ""
    });

    const handleAddSpecialFeature = async () => {
        const response = await addSpecialFeature({
            specialFeatureName: specialFeature.specialFeatureName
        });

        if (response.success) {
            enqueueSnackbar("Thêm hệ điều hành thành công", { variant: "success" });
            navigate("/admin/special-feature-management");
        } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };

    return (
        <RootPageAddSpecialFeature>
            <FormAddSpecialFeature>
                <Typography variant="h3">Thêm tính năng đặc biệt mới</Typography>
                <MuiTextFeild
                    label="Tên tính năng đặc biệt"
                    margin="normal"
                    autoFocus
                    onChange={(e) => {
                        setSpecialFeature((prev) => ({
                            ...prev,
                            specialFeatureName: e.target.value,
                        }));
                    }}
                    required
                />
                <FlexContainer justifyContent="center">
                    <AddButton
                        variant="contained"
                        color="color1"
                        onClick={handleAddSpecialFeature}
                    >
                        <Typography color={"white"}>Thêm Mới</Typography>
                    </AddButton>
                </FlexContainer>

            </FormAddSpecialFeature>
        </RootPageAddSpecialFeature>
    );
}

export default AddSpecialFeaturePage;