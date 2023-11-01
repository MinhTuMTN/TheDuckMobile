import { Box, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";

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
    width: "80%",
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
    return (
        <RootPageAddCatalog>

            <FormAddCatalog>
                <Typography variant="h3">Thêm danh mục mới</Typography>
                <MuiTextFeild
                    label="Tên danh mục"
                    margin="normal"
                    autoFocus
                    required
                />
                <MuiTextFeild
                    label="Mô tả"
                    margin="normal"
                    required
                />
                <FlexContainer justifyContent="center">
                    <AddButton variant="contained" color="color1">
                        <Typography color={"white"}>Thêm Mới</Typography>
                    </AddButton>
                </FlexContainer>

            </FormAddCatalog>
        </RootPageAddCatalog>
    );
}

export default AddCatalogPage;