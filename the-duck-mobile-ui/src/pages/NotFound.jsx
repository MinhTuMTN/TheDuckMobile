import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import notFoundImage from "../assets/404.gif";
import CustomLink from "../components/CustomLink";

function NotFound(props) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      mt={10}
      mb={10}
    >
      <Helmet>
        <title>404 | The Duck Mobile</title>
        <meta name="description" content="404 - Not found" />
      </Helmet>
      <Stack direction={"column"} width={"80%"} alignItems={"center"}>
        <Typography component={"img"} src={notFoundImage} width={"50%"} />
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontSize: "2.5rem !important" }}
        >
          404 - Không tìm thấy trang
        </Typography>

        <Typography variant="body1" component="p">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa
        </Typography>
        <Button variant="contained" sx={{ marginTop: "1rem" }}>
          <CustomLink to="/" color={"#fff"} replace>
            Quay lại trang chủ
          </CustomLink>
        </Button>
      </Stack>
    </Box>
  );
}

export default NotFound;
