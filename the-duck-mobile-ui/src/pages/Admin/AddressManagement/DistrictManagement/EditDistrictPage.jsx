import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../../components/MuiTextFeild";
import MuiButton from "../../../../components/MuiButton";
import FlexContainer from "../../../../components/FlexContainer";
import { useState } from "react";

const RootPageEditDistrict = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormEditDistrict = styled(Paper)(({ theme }) => ({
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

function EditDistrictPage(props) {

    return (
        <RootPageEditDistrict>
            <FormEditDistrict>
                <Typography variant="h3">Chỉnh sửa thông tin huyện "{ }"</Typography>
                <MuiTextFeild
                    label="Tên huyện"
                    margin="normal"
                    autoFocus
                    required
                />
                <FlexContainer justifyContent="center">
                    <EditButton variant="contained" color="color1">
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditDistrict>
        </RootPageEditDistrict>
    );
}

export default EditDistrictPage;