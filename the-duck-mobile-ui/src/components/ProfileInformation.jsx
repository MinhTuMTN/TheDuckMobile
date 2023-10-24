import { Box, Divider, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

ProfileInformation.propTypes = {
  margin: PropTypes.string,
};

function ProfileInformation(props) {
  const { margin } = props;
  return (
    <Box margin={margin}>
      <Typography variant="h5">Thông tin cá nhân</Typography>
      <Divider
        style={{
          borderColor: "rgba(0, 0, 0, 0.4)",
          margin: "0.3rem 0",
        }}
      />

      <Stack direction={"row"} spacing={2} mt={1}>
        <Typography variant="body1" fontWeight={"bold"} flexBasis={"15%"}>
          Họ tên:
        </Typography>
        <Typography variant="body1">Nguyễn Minh Tú</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} mt={1}>
        <Typography variant="body1" fontWeight={"bold"} flexBasis={"15%"}>
          Ngày sinh:
        </Typography>
        <Typography variant="body1">01/01/1900</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} mt={1}>
        <Typography variant="body1" fontWeight={"bold"} flexBasis={"15%"}>
          Giới tính:
        </Typography>
        <Typography variant="body1">Nam</Typography>
      </Stack>
    </Box>
  );
}

export default ProfileInformation;
