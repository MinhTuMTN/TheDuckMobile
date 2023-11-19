import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateCatalog } from "../../../services/Admin/CatalogService";
import { enqueueSnackbar } from "notistack";

const RootPageEditCatalog = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormEditCatalog = styled(Paper)(({ theme }) => ({
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

function EditCatalogPage(props) {
    const navigate = useNavigate();
    const { editCatalog } = useLocation().state;
    const [catalog, setCatalog] = useState({
        catalogName: "",
        catalogURL: "",
    });

    useEffect(() => {
        setCatalog((prev) => {
            return {
                ...prev,
                catalogName: editCatalog.catalogName,
                catalogURL: editCatalog.catalogURL,
            };
        });
    }, [editCatalog]);

    const handleEditCatalog = async () => {
        const response = await updateCatalog(editCatalog.catalogId, {
            catalogName: catalog.catalogName,
            catalogURL: catalog.catalogURL,
        });

        if (response.success) {
            enqueueSnackbar("Chỉnh sửa danh mục thành công", { variant: "success" });
            navigate("/admin/catalog-management/list");
        } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    return (
        <RootPageEditCatalog>

            <FormEditCatalog>
                <Typography variant="h3">Chỉnh sửa thông tin danh mục "{ }"</Typography>
                <MuiTextFeild
                    label="Tên danh mục"
                    margin="normal"
                    autoFocus
                    value={catalog.catalogName}
                    onChange={(e) => {
                        setCatalog((prev) => ({
                            ...prev,
                            catalogName: e.target.value,
                        }));
                    }}
                    required
                />
                <MuiTextFeild
                    label="Đường dẫn"
                    margin="normal"
                    value={catalog.catalogURL}
                    onChange={(e) => {
                        setCatalog((prev) => ({
                            ...prev,
                            catalogURL: e.target.value,
                        }));
                    }}
                    required
                />
                <FlexContainer justifyContent="center">
                    <EditButton
                        variant="contained"
                        color="color1"
                        onClick={handleEditCatalog}
                    >
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditCatalog>
        </RootPageEditCatalog>
    );
}

export default EditCatalogPage;