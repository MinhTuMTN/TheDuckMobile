import { Box, Button, Paper, styled } from "@mui/material";
import { EditCatalogPage } from "./EditCatalogPage.1";

export const RootPageEditCatalog = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

export const FormEditCatalog = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  width: "100%",
  borderRadius: "6px",
  marginTop: theme.spacing(2),
  backgroundColor: "white",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#FF6969",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "15px",
  height: "42px",
  "&:hover": {
    backgroundColor: "#ea4545 !important",
  },
}));

export default EditCatalogPage;
