import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import AtStoreDeliver from "../components/AtStoreDeliver";
import FormatCurrency, { formatCurrency } from "../components/FormatCurrency";
import ListCustomerAddress from "../components/ListCustomerAddress";
import MuiTextFeild from "../components/MuiTextFeild";
import NewCustomerInfomation from "../components/NewCustomerInfomation";
import ProductInformation from "../components/ProductInformation";
import UseCoupon from "../components/UseCoupon";
import { getInfo } from "../services/UserService";
import { useAuth } from "../auth/AuthProvider";
import { getAddresses } from "../services/AddressService";
import { getCoupon } from "../services/CouponService";
import { enqueueSnackbar } from "notistack";
import { getStoreAddresses } from "../services/StoreService";
import {
  createOrderLoggedIn,
  createOrderNonLoggedIn,
} from "../services/OrderService";

const Wrapped = styled.div`
  color: rgba(0, 0, 0, 0.65);
  padding-top: 64px;
`;
const Container = styled(Paper)`
  display: block;
  width: 40%;
  background: #ffff;
  margin: 0px auto;
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

const CustomButtom = styled(Button)`
  background: ${(props) => props.theme.palette.color2.main};
  &:hover {
    background: ${(props) => props.theme.palette.color1.main};
    color: #fff;
  }
`;

function BuyProduct(props) {
  const { state } = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();
  // Check if state is null redirect to home
  useEffect(() => {
    if (state === null) {
      navigate("/");
    }
  }, [state, props.history, navigate]);

  const [info, setInfo] = useState({
    name: "",
    gender: 0,
    phone: "",
  });
  const handleGetInfo = useCallback(async () => {
    if (!token) return;

    const response = await getInfo();
    if (response.success) {
      const data = response.data.data;
      setInfo({
        name: data.fullName,
        gender: data.gender,
        phone: data.phone,
      });
    }
  }, [token]);

  const [address, setAddress] = useState([]);
  const handleGetAddress = useCallback(async () => {
    if (!token) return;

    const response = await getAddresses();
    if (response.success) {
      const data = response.data.data;
      setAddress(data);

      // Set default address
      if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    }
  }, [token]);
  useEffect(() => {
    handleGetInfo();
    handleGetAddress();
  }, [handleGetInfo, handleGetAddress]);

  const [selectedOption, setSelectedOption] = useState("AtHome");

  const [selectedAddress, setSelectedAddress] = React.useState({
    addressId: null,
    streetName: "",
    wardId: null,
    storeId: false,
  });
  const oldInfoForm = useRef(null);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [discount, setDiscount] = React.useState(state?.discount || 0);
  const handleCheckCoupon = async () => {
    if (couponCode.trim() === "") {
      enqueueSnackbar("Vui lòng nhập mã giảm giá", { variant: "error" });
      return;
    }

    const response = await getCoupon(couponCode);
    if (response.error) {
      switch (response.statusCode) {
        case 411:
          enqueueSnackbar("Mã giảm giá không tồn tại", { variant: "error" });
          break;
        case 412:
          enqueueSnackbar("Mã giảm giá chưa thể dùng ở thời điểm này", {
            variant: "error",
          });
          break;
        case 413:
          enqueueSnackbar("Mã giảm giá đã hết hạn", { variant: "error" });
          break;
        case 414:
          enqueueSnackbar("Mã giảm giá đã hết lượt sử dụng", {
            variant: "error",
          });
          break;
        default:
          break;
      }
    } else {
      const couponData = response.data.data;
      if (couponData.minPrice > state?.total) {
        const formattedMinPrice = formatCurrency(couponData.minPrice);
        enqueueSnackbar(
          `Mã giảm giá chỉ áp dụng cho đơn hàng từ ${formattedMinPrice}đ`,
          { variant: "error" }
        );
        return;
      }

      enqueueSnackbar("Áp dụng mã giảm giá thành công", { variant: "success" });

      let discountPrice = Math.min(
        (state?.total * couponData.discount) / 100,
        couponData.maxDiscount
      );
      setDiscount(discountPrice);
    }
  };

  const [couponCode, setCouponCode] = React.useState(state?.couponCode || "");

  const [storeAddress, setStoreAddress] = useState([]);

  const handleGetStoreAddresses = useCallback(async () => {
    const response = await getStoreAddresses();
    if (response.success) {
      const data = response.data.data;
      setStoreAddress(data);

      if (data.length > 0) {
        setSelectedAddress({
          addressId: data[0]?.address?.addressId,
          streetName: data[0]?.address?.street,
          wardId: data[0]?.address?.wardId,
          storeId: true,
        });
      }
    }
  }, [setSelectedAddress]);

  useEffect(() => {
    handleGetStoreAddresses();
  }, [handleGetStoreAddresses]);

  // Check selected option change to change selected address to index 0
  useEffect(() => {
    if (selectedOption === "AtHome") {
      setSelectedAddress({
        addressId: address[0]?.addressId,
        streetName: address[0]?.street,
        wardId: address[0]?.wardId,
        storeId: false,
      });
    } else {
      setSelectedAddress({
        addressId: storeAddress[0]?.address?.addressId,
        streetName: storeAddress[0]?.address?.street,
        wardId: storeAddress[0]?.address?.wardId,
        storeId: true,
      });
    }
  }, [selectedOption, address, storeAddress]);

  const [orderNote, setOrderNote] = useState("");

  const handlePayment = useCallback(async () => {
    const data = {
      couponCode,
      orderNote,
      orderAddress: selectedAddress,
      productVersionQuantities: state?.selectedProducts?.map((item) => ({
        productVersionId: item.productVersionId,
        quantity: item.quantity,
      })),
    };

    if (!token) {
      data.temporaryCustomer = {};
      data.temporaryCustomer.fullName = info.name;
      data.temporaryCustomer.phone = info.phone;
      data.temporaryCustomer.gender = info.gender;
    }

    let response;
    if (token) response = await createOrderLoggedIn(data);
    else response = await createOrderNonLoggedIn(data);
    if (response.success) {
      enqueueSnackbar("Đặt hàng thành công", { variant: "success" });

      if (token) navigate("/profile/order-history");
      else navigate("/");

      // Update cart in local storage remove selected products
      const cartData = JSON.parse(localStorage.getItem("cart"));
      const updatedCartData = cartData.filter((item) => {
        return !state?.selectedProducts.some((selectedItem) => {
          return selectedItem.productVersionId === item.productVersionId;
        });
      });
      localStorage.setItem("cart", JSON.stringify(updatedCartData));
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, [
    couponCode,
    orderNote,
    selectedAddress,
    state?.selectedProducts,
    navigate,
    info,
  ]);
  return (
    <Wrapped>
      <Helmet>
        <title>Thanh toán | The Duck Mobile</title>
        <meta name="description" content="Thanh  | The Duck Mobile" />
      </Helmet>
      <Container elevation={4}>
        <Box
          paddingLeft={4}
          paddingRight={4}
          sx={{
            paddingBottom: "0.4rem",
            borderBottom: "1px solid #838080",
          }}
        >
          {/* Phần tiêu đề */}
          <Stack
            direction={"row"}
            marginBottom={"2.5rem"}
            alignItems={"center"}
          >
            <IconButton aria-label="back">
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h4" textAlign={"center"} width={"100%"}>
              Giỏ Hàng Của Bạn
            </Typography>
          </Stack>

          {/* Phần thông tin sản phẩm */}
          <Stack direction={"column"} spacing={3}>
            {state?.selectedProducts?.map((item) => (
              <ProductInformation
                key={item.productVersionId}
                product={item}
                color={"#000"}
                fontWeight={"400"}
              />
            ))}
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} spacing={1}>
                <Typography variant={"textcustom"}>Tạm tính</Typography>
                <Typography variant={"textcustom"}>
                  ({state?.selectedProducts?.length} sản phẩm):
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography
                  variant={"textcustom"}
                  color={"color1.main"}
                  style={{
                    fontSize: "18px",
                  }}
                >
                  <FormatCurrency amount={state?.total} />
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Stack
          direction={"column"}
          paddingLeft={4}
          paddingRight={4}
          paddingTop={2}
          spacing={0}
        >
          <Typography
            variant={"h6"}
            fontWeight={"600"}
            style={{
              fontSize: "16px",
            }}
          >
            THÔNG TIN KHÁCH HÀNG
          </Typography>
          {token ? (
            <>
              <Stack
                ref={oldInfoForm}
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant="h6"
                  fontWeight={"400"}
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Xin chào, {info.gender === 0 ? "anh" : "chị"}{" "}
                  <b>{info.name}</b> - {info.phone}
                </Typography>
                {/* <Button
                  variant="text"
                  sx={{
                    color: "#484B5B",
                  }}
                  onClick={(e) => {
                    setEdit(true);
                    oldInfoForm.current.style.display = "none";
                  }}
                >
                  Sửa
                </Button> */}
              </Stack>
              {/* {edit && (
                <NewCustomerInfomation
                  info={info}
                  onChange={(newInfo) => {
                    setInfo(newInfo);
                  }}
                />
              )} */}
            </>
          ) : (
            <NewCustomerInfomation info={info} onChange={setInfo} />
          )}
        </Stack>
        <Stack
          direction={"column"}
          paddingLeft={4}
          paddingRight={4}
          paddingTop={2}
        >
          <Typography
            variant={"h6"}
            fontWeight={"600"}
            style={{
              fontSize: "16px",
            }}
          >
            CÁCH THỨC NHẬN HÀNG
          </Typography>
          <FormControl>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              value={selectedOption}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="AtHome"
                className="custom-radio"
                control={<Radio size="small" />}
                label={<span style={{ fontSize: "14px" }}>Giao tận nơi</span>}
              />
              <FormControlLabel
                value="AtStore"
                control={<Radio size="small" />}
                label={
                  <span style={{ fontSize: "14px" }}>Nhận tại cửa hàng</span>
                }
              />
            </RadioGroup>
          </FormControl>
          {selectedOption === "AtHome" && (
            <ListCustomerAddress
              addresses={address}
              onChangeAddress={setAddress}
              onChangeSelectedAddress={setSelectedAddress}
              selectedAddress={selectedAddress}
            />
          )}
          {selectedOption === "AtStore" && (
            <AtStoreDeliver
              storeAddress={storeAddress}
              selectedAddress={selectedAddress}
              onStoreAddressChange={setSelectedAddress}
            />
          )}
        </Stack>
        <Box
          paddingLeft={4}
          paddingRight={4}
          paddingTop={2}
          sx={{
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #838080",
          }}
        >
          <MuiTextFeild
            variant="outlined"
            size={"medium"}
            fullWidth
            label="Yêu cầu khác"
            value={orderNote}
            inputProps={{
              style: {
                fontSize: "14px",
              },
            }}
            onChange={(e) => setOrderNote(e.target.value)}
          />
        </Box>

        <UseCoupon
          couponCode={couponCode}
          onCheck={handleCheckCoupon}
          onChange={setCouponCode}
        />
        <Stack direction={"column"} paddingX={4} paddingTop={2}>
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h6"
              fontWeight={"600"}
              style={{
                fontSize: "16px",
              }}
            >
              Giảm giá:{" "}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={"550"}
              style={{
                fontSize: "16px",
              }}
            >
              <FormatCurrency amount={discount} />
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h6"
              fontWeight={"600"}
              style={{
                fontSize: "16px",
              }}
            >
              Phí vận chuyển:{" "}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={"550"}
              style={{
                fontSize: "16px",
              }}
            >
              <FormatCurrency amount={state?.shippingFee} />
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h6"
              fontWeight={"600"}
              style={{
                fontSize: "16px",
              }}
            >
              Tổng tiền:{" "}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={"550"}
              color={"color1.main"}
              style={{
                fontSize: "16px",
              }}
            >
              <FormatCurrency
                amount={state?.total + state?.shippingFee - discount}
              />
            </Typography>
          </Stack>
          <CustomButtom
            variant="contained"
            fullWidth
            sx={{ marginTop: "1rem" }}
            onClick={handlePayment}
          >
            Mua hàng
          </CustomButtom>
        </Stack>
      </Container>
    </Wrapped>
  );
}

export default BuyProduct;
