import styled from "@emotion/styled";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import OrderItem from "../Store/OrderItem";
import { useNavigate } from "react-router-dom";
const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  variant: "subtitle1",
  fontWeight: "720 !important",
  width: "100%",
}));

ListOrdersCustomer.propTypes = {
  items: PropTypes.array,
};
function ListOrdersCustomer(props) {
  const { items } = props;
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        borderRadius: "15px",
        paddingTop: 1,
      }}
    >
      <BoxStyle>
        <TieuDe>Danh sách đơn hàng</TieuDe>
      </BoxStyle>
      {items &&
        items.map((item) => (
          <OrderItem
            order={item}
            key={item.orderId}
            handleClick={() => {
              navigate(`/admin/order-details?orderId=${item.orderId}`);
            }}
          />
        ))}
      <Pagination
        count={10}
        showFirstButton
        showLastButton
        sx={{
          paddingX: 2,
          display: "flex",
          paddingY: 2,
          justifyContent: "flex-end",
        }}
      />
    </Stack>
  );
}

export default ListOrdersCustomer;
