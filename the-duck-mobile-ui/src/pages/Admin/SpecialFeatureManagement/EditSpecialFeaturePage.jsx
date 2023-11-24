import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSpecialFeature } from "../../../services/Admin/SpecialFeatureService";
import { enqueueSnackbar } from "notistack";

const RootPageEditSpecialFeature = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormEditSpecialFeature = styled(Paper)(({ theme }) => ({
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

function EditSpecialFeaturePage(props) {
    const navigate = useNavigate();
    const { editSpecialFeature } = useLocation().state;
    const [specialFeature, setSpecialFeature] = useState({
        specialFeatureName: ""
    });

    useEffect(() => {
        setSpecialFeature((prev) => {
            return {
                ...prev,
                specialFeatureName: editSpecialFeature.specialFeatureName
            };
        });
    }, [editSpecialFeature]);

    const handleEditSpecialFeature = async () => {
        const response = await updateSpecialFeature(editSpecialFeature.specialFeatureId, {
            specialFeatureName: specialFeature.specialFeatureName
        });

        if (response.success) {
            enqueueSnackbar("Chỉnh sửa tính năng đặc biệt thành công", { variant: "success" });
            navigate("/admin/special-feature-management");
        } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };

    return (
        <RootPageEditSpecialFeature>
            <FormEditSpecialFeature>
                <Typography variant="h3">Chỉnh sửa thông tin tính năng "{ }"</Typography>
                <MuiTextFeild
                    label="Tên tính năng đặc biệt"
                    margin="normal"
                    autoFocus
                    value={specialFeature.specialFeatureName}
                    onChange={(e) => {
                        setSpecialFeature((prev) => ({
                            ...prev,
                            specialFeatureName: e.target.value,
                        }));
                    }}
                    required
                />
                <FlexContainer justifyContent="center">
                    <EditButton
                        variant="contained"
                        color="color1"
                        onClick={handleEditSpecialFeature}
                    >
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditSpecialFeature>
        </RootPageEditSpecialFeature>
    );
}

export default EditSpecialFeaturePage;