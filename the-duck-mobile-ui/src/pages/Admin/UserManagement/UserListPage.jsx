import { Box, Typography, styled } from "@mui/material";

const RootPageUserList = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

function UserListPage() {
    return (
        <RootPageUserList>
            <Typography variant="h3">Danh sách người dùng</Typography>
        </RootPageUserList>
    );
}

export default UserListPage;