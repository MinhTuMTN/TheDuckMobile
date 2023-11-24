import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";

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
