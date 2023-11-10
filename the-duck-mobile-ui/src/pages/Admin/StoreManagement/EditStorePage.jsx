import { Box, FormControl, FormLabel, MenuItem, Paper, Select, Typography, styled, useTheme } from "@mui/material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import MuiButton from "../../../components/MuiButton";
import FlexContainer from "../../../components/FlexContainer";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const RootPageEditStore = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const FormEditStore = styled(Paper)(({ theme }) => ({
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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function EditStorePage(props) {
    const theme = useTheme();

    const [staffs, setStaffs] = useState([]);

    const handleStaffsChange = (event) => {
        const {
            target: { value },
        } = event;

        setStaffs(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <RootPageEditStore>
            <FormEditStore>
                <Typography variant="h3">Chỉnh sửa thông tin chi nhánh "{}"</Typography>
                <MuiTextFeild
                    label="Tên chi nhánh"
                    margin="normal"
                    autoFocus
                    required
                />
                <MuiTextFeild
                    label="Thời gian mở cửa"
                    margin="normal"
                    required
                />
                <MuiTextFeild
                    label="Địa chỉ"
                    margin="normal"
                    required
                />
                <FormControl sx={{ mt: 2, mb: 3 }}>
                    <FormLabel><Typography>Danh sách nhân viên</Typography></FormLabel>
                    <Select
                        multiple
                        displayEmpty
                        value={staffs}
                        onChange={handleStaffsChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Lựa Chọn Nhân Viên</em>;
                            }

                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Nhân Viên</em>
                        </MenuItem>
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, staffs, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FlexContainer justifyContent="center">
                    <EditButton variant="contained" color="color1">
                        <Typography color={"white"}>Cập Nhật</Typography>
                    </EditButton>
                </FlexContainer>

            </FormEditStore>
        </RootPageEditStore>
    );
}

export default EditStorePage;