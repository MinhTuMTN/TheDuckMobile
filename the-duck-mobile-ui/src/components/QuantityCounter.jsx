import styled from "@emotion/styled";
import { Button, Card, Stack } from "@mui/material";
import React from "react";

function QuantityCounter(props) {
  const { quantity, onChange } = props;
  const InputCustom = styled.input`
    border: none;
    width: 1rem;
  `;

  const incrementQuantity = () => {
    onChange(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  return (
    <Card
      variant="elevation"
      sx={{
        border: "1px solid #e0e0e0",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack direction={"row"}>
        <Button variant="text" onClick={decrementQuantity}>
          -
        </Button>
        <InputCustom type="text" value={quantity} readOnly />
        <Button variant="text" onClick={incrementQuantity}>
          +
        </Button>
      </Stack>
    </Card>
  );
}

export default QuantityCounter;
