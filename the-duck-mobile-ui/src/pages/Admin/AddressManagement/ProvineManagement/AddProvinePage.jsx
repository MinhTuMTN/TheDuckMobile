import { Box, Paper, Typography, styled } from "@mui/material";
import FlexContainer from "../../../../components/FlexContainer";
import MuiButton from "../../../../components/MuiButton";
import MuiTextFeild from "../../../../components/MuiTextFeild";

const RootPageAddProvine = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddProvine = styled(Paper)(({ theme }) => ({
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
  marginTop: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#FF6969",
  },
}));

function AddProvinePage(props) {
  return (
    <RootPageAddProvine>
      <FormAddProvine>
        <Typography variant="h3">Thêm tỉnh mới</Typography>
        <MuiTextFeild
          label="Tên tỉnh"
          margin="normal"
          autoFocus
          required
        />
        <FlexContainer justifyContent="center">
          <AddButton variant="contained" color="color1">
            <Typography color={"white"}>Thêm Mới</Typography>
          </AddButton>
        </FlexContainer>
      </FormAddProvine>
    </RootPageAddProvine>
  );
}

export default AddProvinePage;
