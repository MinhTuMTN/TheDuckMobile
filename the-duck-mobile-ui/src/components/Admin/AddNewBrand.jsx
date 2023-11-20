import React, { useEffect, useState } from "react";
import MuiTextFeild from "../MuiTextFeild";
import { Avatar, Stack } from "@mui/material";
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
  const { setBrandAdd } = props;
  const [imageSelected, setImageSelected] = useState(null);
  const [urlImage, setUrlImage] = useState("");

  const handleImageChange = (event) => {
    setImageSelected(event.target.files[0]);
  };

  useEffect(() => {
    if (imageSelected === null)
      return;
    const url = URL.createObjectURL(imageSelected);
    setUrlImage(url);
    setBrandAdd((prev) => {
      return {
        ...prev,
        image: imageSelected,
      };
    });
    return () => URL.revokeObjectURL(url);
  }, [imageSelected, setBrandAdd]);

  
  return (
    <Stack direction={"row"} spacing={2}>
      <Stack direction={"column"}>
        <CustomImage
          sx={{
            mb: 1,
          }}
          src={urlImage}
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
        onChange={(e) => {
          setBrandAdd((prev) => ({
              ...prev,
              brandName: e.target.value,
          }));
      }}
        sx={{
          marginTop: 2,
        }}
      />
    </Stack>
  );
}

export default AddNewBrand;
