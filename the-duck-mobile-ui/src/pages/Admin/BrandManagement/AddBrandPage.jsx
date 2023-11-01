import { Box, FormControl, FormLabel, Grid, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useState } from "react";

const RootPageAddBrand = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormAddBrand = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "80%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

const CustomImage = styled('img')(({ theme }) => ({
    marginTop: theme.spacing(2),
    border: "1px solid",
    borderRadius: "5px",
    height: "315px",
    width: "auto",
    maxWidth: "315px",
}));

const AddButton = styled(MuiButton)(({ theme }) => ({
    width: "30%",
    marginTop: theme.spacing(2),
    "&:hover": {
        backgroundColor: "#FF6969",
    }
}));

function AddBrandPage(props) {
    const [image, setImage] = useState();

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <RootPageAddBrand>
            <FormAddBrand>
                <Typography variant="h3">Thêm thương hiệu mới</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <Grid container>
                            <Grid item xs={12}>
                                <MuiTextFeild
                                    label="Tên thương hiệu"
                                    margin="normal"
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MuiTextFeild
                                    label="Mô tả"
                                    margin="normal"
                                    required
                                    multiline
                                    rows={11}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container>
                            <Grid item xs={12}>
                                <CustomImage src={image} />
                            </Grid>
                            <Grid item xs={12}>
                                <MuiTextFeild
                                    type="file"
                                    required
                                    onChange={handleImageChange}
                                    sx={{ mt: 2 }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <FlexContainer justifyContent="center">
                    <AddButton variant="contained" color="color1">
                        <Typography color={"white"}>Thêm Mới</Typography>
                    </AddButton>
                </FlexContainer>

            </FormAddBrand>
        </RootPageAddBrand>
    );
}

export default AddBrandPage;