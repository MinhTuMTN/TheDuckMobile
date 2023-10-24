import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import DialogConfirm from "./DialogConfirm";

AddressList.propTypes = {
  margin: PropTypes.string,
};

function AddressList(props) {
  const { margin } = props;
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const address = [
    "1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM",
    "484 Lê Văn Việt, Linh Chiểu, Thủ Đức, TP.HCM",
  ];
  return (
    <Box margin={margin}>
      <Typography variant="h5">Thông tin địa chỉ</Typography>
      <Divider
        style={{
          borderColor: "rgba(0, 0, 0, 0.4)",
          margin: "0.3rem 0",
        }}
      />
      <Stack spacing={1}>
        {address.map((item, index) => (
          <Box key={index}>
            <Stack
              direction={"row"}
              alignContent={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                variant="body1"
                display={"flex"}
                alignItems={"center"}
              >
                {item}
              </Typography>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"space-between"}
              >
                <Button variant="outlined" color="primary" startIcon={<Edit />}>
                  Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="color1"
                  startIcon={<Delete />}
                  onClick={() => {
                    setDeleteDialog(true);
                  }}
                >
                  Xóa
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>

      <DialogConfirm
        open={deleteDialog}
        title={"Xóa địa chỉ"}
        content={"Bạn có chắc chắn muốn xóa địa chỉ này?"}
        okText={"Xóa"}
        cancelText={"Hủy"}
        onOk={() => {
          console.log("Xóa địa chỉ");
          setDeleteDialog(false);
        }}
        onCancel={() => {
          console.log("Hủy");
          setDeleteDialog(false);
        }}
      />
    </Box>
  );
}

export default AddressList;
