import { Box } from "@mui/material";
import React from "react";
import SearchSeller from "./SearchSeller";
import OrderItem from "./OrderItem";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

ListOrder.propTypes = {
  items: PropTypes.array,
};

function ListOrder(props) {
  const { items } = props;
  const navigate = useNavigate();
  return (
    <>
      {items?.map((item) => (
        <OrderItem
          order={item}
          key={item.orderId}
          handleClick={() => {
            navigate(`/store/orders/order-details?orderId=${item.orderId}`);
          }}
        />
      ))}
    </>
  );
}

export default ListOrder;
