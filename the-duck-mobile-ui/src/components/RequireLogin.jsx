import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  padding: "5rem 2rem",
  backgroundColor: "#fff",
  borderRadius: "1rem",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
}));

function RequireLogin(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <StyledBox>
      <Typography variant="body1" textAlign={"center"}>
        Bạn cần đăng nhập để có thể tiếp tục thực hiện chức năng này
      </Typography>
      <Button
        variant="contained"
        color="color1"
        size="large"
        sx={{ color: "#fff" }}
        onClick={() =>
          navigate("/login", {
            replace: true,
            state: { from: `${location.pathname}${location.search}` },
          })
        }
      >
        Đăng nhập
      </Button>
    </StyledBox>
  );
}

export default RequireLogin;
