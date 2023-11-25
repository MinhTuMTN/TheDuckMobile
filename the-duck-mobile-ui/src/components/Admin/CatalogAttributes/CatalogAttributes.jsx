import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { FormEditCatalog } from "../../../pages/Admin/CatalogManagement/EditCatalogPage";
import MuiTextFeild from "../../MuiTextFeild";

const SelectionValueItem = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px 0px #3f3b3b1a",
        marginBottom: "0.5rem",
      }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexBasis={"100%"}
      >
        <Typography variant="subtitle2">Mạng di động</Typography>
        <IconButton color="color1">
          <DeleteOutline />
        </IconButton>
      </Stack>
    </Box>
  );
};

function CatalogAttributesItems(props) {
  const [open, setOpen] = React.useState(false);
  const [editAttribute, setEditAttribute] = React.useState({
    attributeName: "",
    attributeKey: "",
    attributeType: 0,
  });
  return (
    <>
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">Mạng di động</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">NetworkType</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" textAlign={"center"}>
            Có
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">Lựa chọn</Typography>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton color="color1" onClick={() => setOpen(!open)}>
            <EditOutlined />
          </IconButton>
          <IconButton color="color1">
            <DeleteOutline />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          sx={{
            borderLeft: "4px solid #d54949c3",
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                marginY: "1rem",
              }}
            >
              <Stack>
                <Typography variant="subtitle2">
                  Chỉnh sửa thuộc tính
                </Typography>
                <Grid container spacing={2} alignItems={"flex-start"}>
                  <Grid item xs={12} sm={6}>
                    <MuiTextFeild
                      label="Tên thuộc tính"
                      fullWidth
                      variant="outlined"
                      style={{
                        borderRadius: "10px !important",
                      }}
                      size="small"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MuiTextFeild
                      label="Key"
                      fullWidth
                      variant="outlined"
                      style={{
                        borderRadius: "10px !important",
                      }}
                      size="small"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Select
                      variant="outlined"
                      size="small"
                      disabled
                      fullWidth
                      value={editAttribute.attributeType}
                      onChange={(e) => {
                        setEditAttribute((prev) => ({
                          ...prev,
                          attributeType: e.target.value,
                        }));
                      }}
                      sx={{
                        marginTop: 2,
                        borderRadius: "10px !important",
                        boxShadow: "0px 0px 5px 0px #3f3b3b1a",
                        height: "40px",
                        fontSize: "14px !important",
                      }}
                      margin="normal"
                    >
                      <MenuItem value={0} style={{ fontSize: "14px" }}>
                        Kiểu chữ
                      </MenuItem>
                      <MenuItem value={1} style={{ fontSize: "14px" }}>
                        Kiểu số
                      </MenuItem>
                      <MenuItem value={2} style={{ fontSize: "14px" }}>
                        Kiểu danh sách
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Typography variant="subtitle2" marginBottom={2}>
                    Giá trị
                  </Typography>
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} sm={11}>
                      <MuiTextFeild
                        label="Tên thuộc tính"
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Button variant="outlined">Thêm</Button>
                    </Grid>
                  </Grid>

                  <Box mt={2}>
                    <SelectionValueItem />
                    <SelectionValueItem />
                    <SelectionValueItem />
                    <SelectionValueItem />
                    <SelectionValueItem />
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function CatalogAttributes(props) {
  return (
    <FormEditCatalog>
      <Typography variant="h5" mt={2} mb={1}>
        Thuộc tính thông số kỹ thuật
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={"35%"}>
              <Typography variant="subtitle1">Tên thuộc tính</Typography>
            </TableCell>
            <TableCell width={"25%"}>
              <Typography variant="subtitle1">Key</Typography>
            </TableCell>
            <TableCell width={"10%"}>
              <Typography variant="subtitle1" textAlign={"center"}>
                Bắt buộc
              </Typography>
            </TableCell>
            <TableCell width={"15%"}>
              <Typography variant="subtitle1">Loại thuộc tính</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Thao tác</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <CatalogAttributesItems />
        </TableBody>
      </Table>
    </FormEditCatalog>
  );
}

export default CatalogAttributes;
