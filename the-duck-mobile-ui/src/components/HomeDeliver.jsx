import styled from "@emotion/styled";
import { FormHelperText, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchSelect from "./SearchSelect";
import MuiTextFeild from "./MuiTextFeild";
import ProductInformation from "./ProductInformation";
import Unit from "./Unit";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

const Wrapped = styled(Paper)`
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #838080;
  padding: 1rem;
  border-radius: 4px;
`;
function HomeDeliver(props) {
  const [selectedAddress, setSelectedAddress] = useState({
    city: "",
    district: "",
    ward: "",
  });

  const [showShippingFee, setShowShippingFee] = useState(false);

  useEffect(() => {
    if (
      selectedAddress.city &&
      selectedAddress.district &&
      selectedAddress.ward
    ) {
      setShowShippingFee(true);
    } else {
      setShowShippingFee(false);
    }
  }, [selectedAddress]);

  return (
    <Wrapped elevation={1}>
      <FormHelperText
        sx={{
          marginBottom: "0.5rem",
        }}
      >
        Chọn địa chỉ nhận hàng của bạn:
      </FormHelperText>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SearchSelect
            label={"Thành phố"}
            onChange={(e, newValue) => {
              setSelectedAddress({ ...selectedAddress, city: newValue });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SearchSelect
            disabled={!selectedAddress.city}
            label={"Quận/huyện"}
            onChange={(e, value) =>
              setSelectedAddress({ ...selectedAddress, district: value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SearchSelect
            disabled={!selectedAddress.district}
            label={"Phường/xã"}
            onChange={(e, value) =>
              setSelectedAddress({ ...selectedAddress, ward: value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiTextFeild label={"Địa chỉ"} fontSize={"14px"} size={"small"} />
        </Grid>
      </Grid>
      {showShippingFee && (
        <Stack
          label={"Phí giao hàng"}
          direction={"column"}
          spacing={2}
          marginTop={2}
          sx={{
            borderTop: "1px solid #979696",
            paddingTop: "1rem",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{
              bgcolor: "#dcf5e5",
              padding: "0.2rem",
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            <ElectricBoltIcon sx={{ color: "primary.main" }} />
            <Typography
              variant="body1"
              fontWeight={"600"}
              style={{
                fontSize: "15px",
                color: "#096732",
              }}
            >
              Nhận hàng trong hôm nay (01/10)
            </Typography>
          </Stack>
          <ProductInformation />
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              variant="body1"
              style={{
                fontSize: "15px",
                marginLeft: "0.5rem",
              }}
            >
              Phí giao hàng:{" "}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontSize: "15px",
                marginLeft: "0.5rem",
                color: "red",
              }}
            >
              20.000
            </Typography>
            <Unit color={"red"} />
          </Stack>
        </Stack>
      )}
    </Wrapped>
  );
}

export default HomeDeliver;
