import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addCatalog } from "../../../services/Admin/CatalogService";
import { enqueueSnackbar } from "notistack";

const RootPageAddCatalog = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddCatalog = styled(Paper)(({ theme }) => ({
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

function AddCatalogPage(props) {
    const navigate = useNavigate();
    const [catalog, setCatalog] = useState({
        catalogName: "",
        catalogURL: "",
    });

    const handleAddCatalog = async () => {
        const response = await addCatalog({
            catalogName: catalog.catalogName,
            catalogURL: catalog.catalogURL,
        });

        if (response.success) {
            enqueueSnackbar("Thêm màu sắc thành công", { variant: "success" });
            navigate("/admin/catalog-management");
        } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    return (
        <RootPageAddCatalog>

            <FormAddCatalog>
                <Typography variant="h3">Thêm danh mục mới</Typography>
                <MuiTextFeild
                    label="Tên danh mục"
                    margin="normal"
                    autoFocus
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
                    onChange={(e) => {
                        setCatalog((prev) => ({
                            ...prev,
                            catalogURL: e.target.value,
                        }));
                    }}
                    required
                />
                <FlexContainer justifyContent="center">
                    <AddButton
                        variant="contained"
                        color="color1"
                        onClick={handleAddCatalog}
                    >
                        <Typography color={"white"}>Thêm Mới</Typography>
                    </AddButton>
                </FlexContainer>

            </FormAddCatalog>
        </RootPageAddCatalog>
    );
}

export default AddCatalogPage;