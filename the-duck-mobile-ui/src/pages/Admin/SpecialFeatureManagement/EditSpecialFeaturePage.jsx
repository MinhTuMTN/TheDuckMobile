import { Box, FormControl, FormLabel, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useState } from "react";

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
    const [catalog, setCatalog] = useState('');

    const handleCatalogChange = (event) => {
        setCatalog(event.target.value);
    };

    return (
        <RootPageEditSpecialFeature>
            <FormEditSpecialFeature>
                <Typography variant="h3">Chỉnh sửa thông tin tính năng "{}"</Typography>
                <MuiTextFeild
                    label="Tên tính năng đặc biệt"
                    margin="normal"
                    autoFocus
                    required
                />
                <MuiTextFeild
                    label="Mô tả"
                    margin="normal"
                    required
                />
                <FormControl sx={{ mt: 2, mb: 2 }}>
                    <FormLabel><Typography>Danh Mục</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={catalog}
                        onChange={handleCatalogChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Danh Mục</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FlexContainer justifyContent="center">
                    <EditButton variant="contained" color="color1">
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditSpecialFeature>
        </RootPageEditSpecialFeature>
    );
}

export default EditSpecialFeaturePage;