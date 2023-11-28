import { Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";

ProductDetailsShortDesc.propTypes = {
  desc: PropTypes.string,
};

ProductDetailsShortDesc.defaultProps = {
  desc: "Không có mô tả",
};

function ProductDetailsShortDesc(props) {
  const { desc } = props;
  const [shortDesc, setShortDesc] = useState("");

  useEffect(() => {
    setShortDesc(desc.split(' ').slice(0, 150).join(' '));
  }, [desc]);

  return (
    <div
      style={{
        marginBottom: "1.5rem",
        marginTop: "10px",
        paddingBottom: "37px",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <Typography
        variant="body2"
        color={"#121111ca"}
        style={{
          fontSize: "15px",
          width: "95%",
          textAlign: "justify",
        }}
        component={"p"}
      >
        {shortDesc + "... "}
      </Typography>
    </div >
  );
}

export default memo(ProductDetailsShortDesc);
