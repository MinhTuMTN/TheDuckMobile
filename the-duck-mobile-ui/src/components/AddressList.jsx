import { Delete, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import DialogConfirm from "./DialogConfirm";
import DialogForm from "./DialogForm";
import MuiTextFeild from "./MuiTextFeild";

AddressList.propTypes = {
  margin: PropTypes.string,
};

function AddressList(props) {
  const { margin } = props;
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [editDialog, setEditDialog] = React.useState(false);

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
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => {
                    setEditDialog(true);
                  }}
                >
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
        }}
        onCancel={() => {
          console.log("Hủy");
        }}
        onClose={() => setDeleteDialog(false)}
      />

      <DialogForm
        open={editDialog}
        title={"Chỉnh sửa địa chỉ"}
        okText={"Cập nhật"}
        cancelText={"Hủy bỏ"}
        onOk={() => {
          console.log("Xóa địa chỉ");
        }}
        onCancel={() => {
          console.log("Hủy");
        }}
        onClose={() => setEditDialog(false)}
      >
        <Stack width={"30rem"} padding={".5rem 0 0 0"} spacing={2}>
          <Stack spacing={2} direction={"row"} width={"100%"}>
            <Autocomplete
              fullWidth
              options={["Tiền Giang", "Hồ Chí Minh"]}
              renderInput={(params) => (
                <MuiTextFeild
                  {...params}
                  style={{
                    height: "100%",
                  }}
                  label="Tỉnh/Thành phố"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={[
                "Tân Phú Đông",
                "Gò Công Tây",
                "Gò Công Đông",
                "Cai Lậy",
              ]}
              renderInput={(params) => (
                <MuiTextFeild {...params} label="Quận/Huyện" fontSize={14} />
              )}
            />
          </Stack>
          <Autocomplete
            fullWidth
            options={["Tân Thới", "Tân Phú", "Phú Thạnh", "Tân Hương"]}
            renderInput={(params) => (
              <MuiTextFeild {...params} label="Phường/Xã" />
            )}
          />
          <MuiTextFeild fullWidth label="Số nhà, tên đường" />
        </Stack>
      </DialogForm>
    </Box>
  );
}

export default AddressList;
