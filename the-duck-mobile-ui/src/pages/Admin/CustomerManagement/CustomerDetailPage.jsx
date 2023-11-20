import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BasicDetailsCustomer from "../../../components/Admin/BasicDetailCustomer";
import ListOrdersCustomer from "../../../components/Admin/ListOrdersCustomer";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getCustomerById } from "../../../services/Admin/CustomerService";

const UserId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

function CustomerDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});

  const handleGetCustomer = useCallback(async () => {
    const response = await getCustomerById(state.id);
    if (response.success) {
      setCustomer(response.data.data);
    }
  }, [state.id]);

  useEffect(() => {
    handleGetCustomer();
  }, [handleGetCustomer]);

  return (
    <Box
      sx={{
        pt: 3,
        paddingBottom: 10,
        paddingX: 3,
        margin: "auto",
        width: "100%",
      }}
    >
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            spacing={0}
            alignItems={"center"}
            marginBottom={3}
          >
            <IconButton
              aria-label="back"
              size="small"
              padding="0"
              margin="0"
              color="#111927"
              onClick={() => { navigate("/admin/customer-management") }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              variant="body1"
              fontWeight={600}
              style={{
                fontSize: "14px",
                color: "#111927",
              }}
            >
              Danh sách khách hàng
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={10}>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar
                  sx={{
                    width: ["80px", "100px"], // Kích thước sẽ là 50px khi viewport width là 50% hoặc nhỏ hơn, và 100px trong trường hợp khác
                    height: ["80px", "100px"],
                  }}
                  src={customer.avatar}
                />
                <Stack direction={"column"}>
                  <Typography
                    variant="h3"
                    fontWeight={600}
                    style={{
                      textTransform: "uppercase",
                      fontSize: ["1.5rem", "2rem"],
                    }}
                  >
                    {customer.fullName}
                  </Typography>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography
                      variant="body1"
                      fontWeight={450}
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      user_id:
                    </Typography>
                    <UserId>{customer.userId}</UserId>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: 4,
                  borderRadius: "15px",
                }}
                spacing={"2px"}
              >
                <BasicDetailsCustomer customer={customer} />
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: 4,
                  borderRadius: "15px",
                }}
                spacing={"2px"}
              >
                <ListOrdersCustomer items={customer.orders} customerId={customer.userId} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CustomerDetailPage;
