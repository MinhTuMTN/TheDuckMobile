import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import pic from "../assets/iphone.jpg";
import styled from "@emotion/styled";
import Unit from "./Unit";

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

          <Stack direction={"row"} spacing={1}>
            <Stack direction={"row"} flexBasis={"60%"}>
              <img src={pic} alt="product" width={"15%"} />
              <Stack
                direction={"column"}
                spacing={0.5}
                justifyContent={"space-between"}
              >
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  style={{
                    fontSize: "16px",
                    marginLeft: "0.5rem",
                  }}
                >
                  Iphone 15 Pro Max
                </Typography>
                <Stack direction={"row"}>
                  <Typography
                    variant="body1"
                    fontWeight={"500"}
                    style={{
                      fontSize: "12px",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Số lượng:{" "}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={"500"}
                    style={{
                      fontSize: "12px",
                      marginLeft: "0.5rem",
                    }}
                  >
                    1
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"flex-start"}
              flexBasis={"40%"}
              justifyContent={"flex-end"}
            >
              <Typography
                variant="body1"
                fontWeight={"500"}
                style={{
                  fontSize: "16px",
                }}
              >
                40.000.000
              </Typography>
              <Typography
                variant="body1"
                fontWeight={"500"}
                style={{
                  fontSize: "14px",
                }}
              >
                ₫
              </Typography>
            </Stack>
          </Stack>
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
            <Button
              variant={"outlined"}
              color="color2"
              sx={{
                width: "35%",
                padding: "0.5rem 1rem",
                justifyContent: "center",
                margin: "0 auto",
                borderRadius: "0.75rem",
                ":hover": {
                  backgroundColor: "#FF4469",
                  color: "#ffffff",
                },
              }}
            >
              VỀ DANH SÁCH ĐƠN HÀNG
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

export default AboutHistoryOrderDetails;
