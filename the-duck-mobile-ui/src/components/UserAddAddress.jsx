import { Autocomplete, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { memo, useEffect } from "react";
import {
  addAddress,
  getDistricts,
  getProvines,
  getWards,
} from "../services/AddressService";
import DialogForm from "./DialogForm";
import MuiTextFeild from "./MuiTextFeild";

UserAddAddress.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  editAddress: PropTypes.object,
  onChangeAddress: PropTypes.func,
  setEditAddress: PropTypes.func,
};

function UserAddAddress(props) {
  const { open, setOpen, editAddress, onChangeAddress, setEditAddress } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [address, setAddress] = React.useState({
    province: "",
    district: "",
    ward: "",
    street: "",
  });
  const [province, setProvince] = React.useState([]);
  const [district, setDistrict] = React.useState([]);
  const [ward, setWard] = React.useState([]);

  useEffect(() => {
    const handleGetProvince = async () => {
      const response = await getProvines();
      if (response.success) {
        setProvince(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    if (province.length === 0) handleGetProvince();
  }, [province.length, enqueueSnackbar]);

  useEffect(() => {
    const handleGetDistrict = async () => {
      const response = await getDistricts(address.province);
      if (response.success) {
        setDistrict(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    if (address.province !== "") handleGetDistrict();
  }, [address.province, enqueueSnackbar]);

  useEffect(() => {
    const handleGetWard = async () => {
      const response = await getWards(address.district);
      if (response.success) {
        setWard(response.data.data);
      } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };
    if (address.district !== "") handleGetWard();
  }, [address.district, enqueueSnackbar]);

  const handleAddAddress = async () => {
    console.log("Thêm địa chỉ");
    const response = await addAddress({
      street: address.street,
      wardId: address.ward,
    });

    if (response.success) {
      enqueueSnackbar("Thêm địa chỉ thành công", { variant: "success" });
      onChangeAddress(response.data.data);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  return (
    <DialogForm
      open={open}
      title={editAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
      okText={editAddress ? "Lưu" : "Thêm"}
      cancelText={"Hủy bỏ"}
      onOk={() => {
        if (editAddress == null) handleAddAddress();
      }}
      onCancel={() => {
        setAddress({
          province: "",
          district: "",
          ward: "",
          street: "",
        });
        setEditAddress(null);
      }}
      onClose={() => setOpen(false)}
    >
      <Stack width={"30rem"} padding={".5rem 0 0 0"} spacing={2}>
        <Stack spacing={2} direction={"row"} width={"100%"}>
          <Autocomplete
            fullWidth={true}
            options={province}
            value={province.find((item) => item.provineId === address.province)}
            onChange={(event, newValue) => {
              setAddress((prev) => ({
                ...prev,
                province: newValue ? newValue.provinceId : "",
              }));
            }}
            isOptionEqualToValue={(option, value) =>
              option.provineId === value.provineId
            }
            getOptionLabel={(option) => option.provineName}
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Typography>{option.provineName}</Typography>
                </li>
              );
            }}
            renderInput={({ inputProps, ...rest }) => (
              <MuiTextFeild
                {...rest}
                style={{
                  height: "100%",
                }}
                inputProps={{ ...inputProps, readOnly: true }}
                label="Tỉnh/Thành phố"
              />
            )}
          />
          <Autocomplete
            fullWidth={true}
            disabled={address.province === ""}
            value={district.find(
              (item) => item.districtId === address.district
            )}
            options={district}
            onChange={(event, newValue) => {
              setAddress((prev) => ({
                ...prev,
                district: newValue ? newValue.districtId : "",
              }));
            }}
            isOptionEqualToValue={(option, value) =>
              option.districtId === value.districtId
            }
            getOptionLabel={(option) => option.districtName}
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Typography>{option.districtName}</Typography>
                </li>
              );
            }}
            renderInput={({ inputProps, ...rest }) => (
              <MuiTextFeild
                {...rest}
                style={{
                  height: "100%",
                }}
                inputProps={{ ...inputProps, readOnly: true }}
                label="Quận/Huyện"
              />
            )}
          />
        </Stack>
        <Autocomplete
          fullWidth={true}
          options={ward}
          value={ward.find((item) => item.wardId === address.ward)}
          disabled={address.district === ""}
          onChange={(event, newValue) => {
            setAddress((prev) => ({
              ...prev,
              ward: newValue ? newValue.wardId : "",
            }));
          }}
          isOptionEqualToValue={(option, value) =>
            option.wardId === value.wardId
          }
          getOptionLabel={(option) => option.wardName}
          renderOption={(props, option) => {
            return (
              <li {...props}>
                <Typography>{option.wardName}</Typography>
              </li>
            );
          }}
          renderInput={({ inputProps, ...rest }) => (
            <MuiTextFeild
              {...rest}
              style={{
                height: "100%",
              }}
              inputProps={{ ...inputProps, readOnly: true }}
              label="Phường/Xã"
            />
          )}
        />
        <MuiTextFeild
          fullWidth={true}
          label="Số nhà, tên đường"
          value={address.street}
          onChange={(e) => {
            setAddress((prev) => ({
              ...prev,
              street: e.target.value,
            }));
          }}
        />
      </Stack>
    </DialogForm>
  );
}

export default memo(UserAddAddress);
