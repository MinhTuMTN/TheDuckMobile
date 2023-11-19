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
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "15px",
          marginBottom: 3,
          marginX: 5,
        }}
      >
        <SearchSeller borderRadius="15px" />
      </Box>

      {items &&
        items.map((item) => (
          <OrderItem
            order={item}
            key={item.id}
            handleClick={() => {
              navigate(`/store/order-details?orderId=${item.id}`);
            }}
          />
        ))}
    </>
  );
}

export default ListOrder;
