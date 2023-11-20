import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import DiscountIcon from "@mui/icons-material/Discount";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  position: relative;
  background: #e9e7e7;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;

  &::before {
    content: "";
    width: 15px;
    height: 15px;
    border-top: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
    background: #e9e7e7;
    transform: rotate(-45deg);
    display: block;
    position: absolute;
    top: -7px;
    left: 24px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  }
`;

const StyledButton = styled(Button)`
  &:hover {
    background: teal;
    color: #fff;
  }
`;

function UseCoupon(props) {
  const { couponCode, onCheck, onChange } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Box
      paddingX={4}
      paddingTop={2}
      sx={{
        paddingBottom: "1.5rem",
        borderBottom: "1px solid #838080",
      }}
    >
      <Button
        variant="contained"
        width={"30%"}
        sx={{
          color: "#484B5B",
          backgroundColor: "#ffffff",
          border: "1px solid #484B5B",
          ":hover": {
            backgroundColor: "#ffffff",
          },
        }}
        onClick={() => setOpen(!open)}
        startIcon={<DiscountIcon />}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        Mã giảm giá
      </Button>
      {open && (
        <StyledBox>
          <TextField
            autoComplete="off"
            placeholder="Nhập mã giảm giá"
            InputProps={{
              style: {
                fontSize: "14px",
                height: "100%",
              },
            }}
            sx={{
              background: "#fff",
              borderRadius: "inherit",
              width: "80%",
            }}
            value={couponCode}
            onChange={(e) => onChange(e.target.value)}
          />
          <StyledButton variant="outlined" onClick={onCheck}>
            Áp dụng
          </StyledButton>
        </StyledBox>
      )}
    </Box>
  );
}

export default UseCoupon;
