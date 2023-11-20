import React, { useState } from "react";
import MuiTextFeild from "../MuiTextFeild";
import { Avatar, Stack, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

const CustomImage = styled(Avatar)(({ theme }) => ({
  marginTop: theme.spacing(2),
  border: "1px solid",
  borderRadius: "5px",
  height: "auto",
  width: "auto",
  maxWidth: "250px",
}));
function AddNewBrand(props) {
  const [image, setImage] = useState();
  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <Stack direction={"row"} spacing={2}>
      <Stack direction={"column"}>
        <CustomImage
          sx={{
            mb: 1,
          }}
          src={image}
        />

        <MuiTextFeild
          type="file"
          required
          size={"small"}
          onChange={handleImageChange}
          style={{
            mt: 2,
            maxWidth: "250px",
            padding: "0px !important",
          }}
        />
      </Stack>

      <MuiTextFeild
        size={"medium"}
        label="Tên thương hiệu"
        variant="outlined"
        autoFocus
        required
        sx={{
          marginTop: 2,
        }}
      />
    </Stack>
  );
}

export default AddNewBrand;
