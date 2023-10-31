import { Box, Divider, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { UserInfoContext } from "../layouts/ProfileLayout";

ProfileInformation.propTypes = {
  margin: PropTypes.string,
};

function ProfileInformation(props) {
  const { margin } = props;
  const info = useContext(UserInfoContext);
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
        <Typography variant="body1">{info && info.fullName}</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} mt={1}>
        <Typography variant="body1" fontWeight={"bold"} flexBasis={"15%"}>
          Ngày sinh:
        </Typography>
        <Typography variant="body1">
          {info &&
            new Date(info.dateOfBirth).toLocaleDateString("vi-VN", {
              dateStyle: "short",
            })}
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} mt={1}>
        <Typography variant="body1" fontWeight={"bold"} flexBasis={"15%"}>
          Giới tính:
        </Typography>
        <Typography variant="body1">
          {info &&
            (info.gender == 0 ? "Nam" : info.gender == 1 ? "Nữ" : "Khác")}
        </Typography>
      </Stack>
    </Box>
  );
}

export default ProfileInformation;
