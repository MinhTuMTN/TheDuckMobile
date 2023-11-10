import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useState } from "react";

const RootPageEditBrand = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormEditBrand = styled(Paper)(({ theme }) => ({
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

const CustomImage = styled('img')(({ theme }) => ({
    marginTop: theme.spacing(2),
    border: "1px solid",
    borderRadius: "5px",
    height: "315px",
    width: "auto",
    maxWidth: "315px",
}));

function EditBrandPage(props) {
    const [image, setImage] = useState();

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <RootPageEditBrand>
            <FormEditBrand>
                <Typography variant="h3">Chỉnh sửa thông tin thương hiệu "{ }"</Typography>
                <MuiTextFeild
                    label="Tên thương hiệu"
                    margin="normal"
                    autoFocus
                    required
                />
                <Grid container>
                    <Grid item xs={5}>
                        <CustomImage src={image} />
                    </Grid>
                    <Grid item xs={7}>
                        <MuiTextFeild
                            type="file"
                            required
                            onChange={handleImageChange}
                            sx={{ mt: 2 }}
                        />
                    </Grid>
                </Grid>
                <FlexContainer justifyContent="center">
                    <EditButton variant="contained" color="color1">
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditBrand>
        </RootPageEditBrand>
    );
}

export default EditBrandPage;