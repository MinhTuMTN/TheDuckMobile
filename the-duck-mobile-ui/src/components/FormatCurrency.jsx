import React, { memo } from "react";
import PropTypes from "prop-types";

FormatCurrency.propTypes = {
  amount: PropTypes.number,
};

FormatCurrency.defaultProps = {
  amount: 0,
};

function FormatCurrency(props) {
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formatter.format(amount);
  };

  const { amount } = props;
  return <>{formatCurrency(amount)}</>;
}

export default memo(FormatCurrency);
