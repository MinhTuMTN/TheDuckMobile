import { AddOutlined, Delete, Edit } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { memo, useEffect } from "react";
import DialogConfirm from "./DialogConfirm";
import UserAddAddress from "./UserAddAddress";
import { useSnackbar } from "notistack";
import { deleteAddress, getAddresses } from "../services/AddressService";

AddressList.propTypes = {
  margin: PropTypes.string,
};

function AddressList(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { margin } = props;
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editAddress, setEditAddress] = React.useState(null);
  const [address, setAddress] = React.useState([]);

  const handleDeleteAddress = async () => {
    const response = await deleteAddress(editAddress.addressId);
    if (response.success) {
      enqueueSnackbar("Xóa địa chỉ thành công", { variant: "success" });
      setDeleteDialog(false);
      setEditAddress(null);
      setAddress(response.data.data);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  useEffect(() => {
    const handleGetAddress = async () => {
      const response = await getAddresses();
      if (response.success) {
        setAddress(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    if (address.length === 0) handleGetAddress();
  }, [address.length, enqueueSnackbar]);

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
        {address.length > 0 ? (
          address.map((item, index) => (
            <Box key={item.addressId}>
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
                  {item.street}, {item.wardName}, {item.districtName},
                  {item.provinceName}
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
                      setOpen(true);
                      setEditAddress(item);
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
                      setEditAddress(item);
                    }}
                  >
                    Xóa
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))
        ) : (
          <Typography variant="body1">Bạn chưa có địa chỉ nào</Typography>
        )}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddOutlined />}
        sx={{ marginTop: 1 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Thêm địa chỉ mới
      </Button>

      <DialogConfirm
        open={deleteDialog}
        title={"Xóa địa chỉ"}
        content={"Bạn có chắc chắn muốn xóa địa chỉ này?"}
        okText={"Xóa"}
        cancelText={"Hủy"}
        onOk={() => {
          handleDeleteAddress();
        }}
        onCancel={() => {
          setEditAddress(null);
        }}
        onClose={() => setDeleteDialog(false)}
      />

      {open && (
        <UserAddAddress
          open={open}
          setOpen={setOpen}
          onChangeAddress={setAddress}
          editAddress={editAddress}
          setEditAddress={setEditAddress}
        />
      )}
    </Box>
  );
}

export default memo(AddressList);
