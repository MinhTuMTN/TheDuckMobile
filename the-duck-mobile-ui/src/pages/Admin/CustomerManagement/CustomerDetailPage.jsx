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

const items = [
  {
    id: "091be10cb",
    date: "2021-05-30",
    status: "Đã huỷ",
    total: 10000000,
  },
  {
    id: "091be10cb",
    date: "2021-11-10",

    status: "Đã hoàn thành",
    total: 1000000,
  },
  {
    id: "091be10cb",
    date: "2021-10-10",
    status: "Chờ xác nhận",
    total: 12200000,
  },
  {
    id: "vv1be10cb",
    date: "2021-12-12",
    status: "Đang giao hàng",
    total: 77000000,
  },
  {
    id: "294be10cb",
    date: "2021-11-11",
    status: "Đã hoàn thành",
    total: 56000000,
  },
];

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
  const image =
    "https://i.pinimg.com/736x/d4/15/95/d415956c03d9ca8783bfb3c5cc984dde.jpg";

  // Avoid a layout jump when reaching the last page with empty rows.

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
              <Stack direction={"row"} spacing={2}>
                <Avatar
                  sx={{
                    width: ["80px", "100px"], // Kích thước sẽ là 50px khi viewport width là 50% hoặc nhỏ hơn, và 100px trong trường hợp khác
                    height: ["80px", "100px"],
                  }}
                  src={image}
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
                    Nguyễn Ngọc Tuyết Vi
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
                    <UserId>5e86805e2bafd54f66cc95c3</UserId>
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
                <BasicDetailsCustomer />
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
                <ListOrdersCustomer items={items} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CustomerDetailPage;
