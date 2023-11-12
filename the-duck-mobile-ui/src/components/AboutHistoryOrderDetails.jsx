import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "@emotion/styled";
import Unit from "./Unit";
import ProductInformation from "./ProductInformation";
import CustomLink from "./CustomLink";

const LeftText = styled(Typography)`
  flex-basis: 85%;
  text-align: end;
  font-size: "14px";
`;

const RightText = styled(Typography)`
  flex-basis: 15%;
  text-align: end;
`;

function AboutHistoryOrderDetails(props) {
  return (
    <Card
      sx={{
        padding: "1rem",
        borderRadius: "0.25rem",
        border: "1px solid #222121",
        width: "100%",
      }}
    >
      <Stack direction={"column"} spacing={1}>
        <Stack
          direction={"column"}
          spacing={1}
          sx={{
            borderBottom: "1px solid #9d9d9d",
            paddingBottom: "1rem",
          }}
        >
          <Stack direction={"row"} spacing={0.5} marginBottom={1}>
            <ShoppingCartIcon />
            <Typography
              variant={"h6"}
              style={{
                fontSize: "16px",
              }}
            >
              THÔNG TIN SẢN PHẨM
            </Typography>
          </Stack>

          <ProductInformation color={"#000"} fontWeight={"500"} />
        </Stack>
        <Box>
          <Stack direction={"column"} spacing={3}>
            <Stack direction={"column"} spacing={1}>
              <Stack
                direction={"row"}
                spacing={0.5}
                justifyContent={"flex-end"}
              >
                <LeftText
                  variant={"body1"}
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Tạm tính:{" "}
                </LeftText>
                <RightText
                  variant={"body1"}
                  style={{
                    fontSize: "14px",
                  }}
                >
                  309.000.000
                </RightText>
                <Unit />
              </Stack>
              <Stack direction={"row"} spacing={0.5} justifyContent={"end"}>
                <LeftText
                  variant={"body1"}
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Tổng tiền:{" "}
                </LeftText>
                <RightText
                  variant={"body1"}
                  style={{
                    fontSize: "14px",
                  }}
                >
                  39.000.000
                </RightText>
                <Unit />
              </Stack>
              <Stack direction={"row"} spacing={0.5} justifyContent={"end"}>
                <LeftText
                  variant={"body1"}
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Số tiền đã thanh toán:{" "}
                </LeftText>
                <RightText
                  variant={"body1"}
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#f44336",
                  }}
                >
                  2.319.000.000
                </RightText>
                <Unit color={"#f44336"} />
              </Stack>
            </Stack>
            <CustomLink
              to={"/profile/order-history"}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant={"outlined"}
                color="color2"
                sx={{
                  width: "35%",
                  padding: "0.5rem 1rem",
                  justifyContent: "center",
                  borderRadius: "0.75rem",
                  ":hover": {
                    backgroundColor: "#FF4469",
                    color: "#ffffff",
                  },
                }}
              >
                VỀ DANH SÁCH ĐƠN HÀNG
              </Button>
            </CustomLink>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

export default AboutHistoryOrderDetails;
