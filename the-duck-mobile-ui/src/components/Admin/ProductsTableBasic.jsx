import styled from "@emotion/styled";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Button,
  CardMedia,
  IconButton,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const CustomText = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
}));
const ButtonInPopover = styled(Button)(({ theme }) => ({
  color: "#101828",
  paddingX: 3,
  paddingY: 1,
  justifyContent: "flex-start",
}));

function useCustomMediaQuery() {
  const isLargeScreen = useMediaQuery("(min-width: 850px)");
  const isMediumScreen = useMediaQuery("(min-width: 750px)");

  return useMemo(() => {
    if (isLargeScreen) {
      return "300px";
    } else if (isMediumScreen) {
      return "150px";
    } else {
      return "50px";
    }
  }, [isLargeScreen, isMediumScreen]);
}

function Row(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { row } = props;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("vi-VN", options).format(
    new Date(row.createDate)
  );

  const maxWidth = useCustomMediaQuery();

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <CardMedia
              component="img"
              image={row.productImage}
              alt="Hình ảnh sản phẩm"
              style={{ maxHeight: "5rem", maxWidth: "5rem" }}
            />
            <Stack direction={"column"} spacing={0.5}>
              <CustomText
                variant="body1"
                style={{
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: maxWidth,
                }}
              >
                {row.productName}
              </CustomText>
              <CustomText
                variant="body1"
                style={{
                  color: "#667085",
                  fontWeight: "400",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: maxWidth,
                }}
              >
                Category {row.category}
              </CustomText>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell align="left">
          <CustomText>{formattedDate}</CustomText>
        </TableCell>
        <TableCell align="right">
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon
              sx={{
                fontSize: 10,
                color: row.status === "Còn bán" ? "#00C58D" : "#c52700",
              }}
            />
            <CustomText>{row.status}</CustomText>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <>
            <IconButton
              color="black"
              aria-describedby={id}
              onClick={handleClick}
            >
              <MoreVertIcon color="black" />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Stack direction={"column"} paddingX={1}>
                <ButtonInPopover
                  variant="text"
                  size="medium"
                  onClick={(e) => {}}
                >
                  Chỉnh sửa
                </ButtonInPopover>
                <ButtonInPopover
                  variant="text"
                  size="medium"
                  onClick={(e) => {
                    navigate("/admin/product-management/detail", {
                      state: {
                        id: row.productId,
                      },
                    });
                  }}
                >
                  Xem
                </ButtonInPopover>
              </Stack>
            </Popover>
          </>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function ProductsTableBasic(props) {
  const { count, onPageChange, onRowsPerPageChange, page, rowsPerPage, items } =
    props;

  return (
    <>
      <Box paddingX={0} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Table
            sx={{
              "& .MuiTableCell-sizeMedium": {
                paddingX: "20px !important",
              },
            }}
          >
            <TableHead
              sx={{
                bgcolor: "#F5F6FA",
              }}
            >
              <TableRow>
                <TableCell style={{ width: "45%" }}>
                  <CustomText color={"#101828"}>Sản phẩm</CustomText>
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  <CustomText color={"#101828"}>Ngày tạo</CustomText>
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  <CustomText color={"#101828"}>Trạng thái</CustomText>
                </TableCell>
                <TableCell align="right" style={{ width: "5%" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.slice(0, rowsPerPage).map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}

ProductsTableBasic.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

export default ProductsTableBasic;
