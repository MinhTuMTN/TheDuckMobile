import UpgradeIcon from "@mui/icons-material/Upgrade";
import {
  Button,
  FormControl,
  MenuItem,
  Stack,
  Select,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexContainer from "../../../components/FlexContainer";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { updateCatalog } from "../../../services/Admin/CatalogService";
import {
  RootPageEditCatalog,
  FormEditCatalog,
  CustomButton,
} from "./EditCatalogPage";

export function EditCatalogPage(props) {
  const navigate = useNavigate();
  const { editCatalog } = useLocation().state;
  const [catalog, setCatalog] = useState({
    catalogName: "",
    catalogURL: "",
  });

  useEffect(() => {
    setCatalog((prev) => {
      return {
        ...prev,
        catalogName: editCatalog.catalogName,
        catalogURL: editCatalog.catalogURL,
      };
    });
  }, [editCatalog]);

  const handleEditCatalog = async () => {
    const response = await updateCatalog(editCatalog.catalogId, {
      catalogName: catalog.catalogName,
      catalogURL: catalog.catalogURL,
    });

    if (response.success) {
      enqueueSnackbar("Chỉnh sửa danh mục thành công", { variant: "success" });
      navigate("/admin/catalog-management");
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };
  return (
    <RootPageEditCatalog>
      <Typography
        variant="h3"
        fontWeight={"680"}
        style={{
          fontSize: "32px",
        }}
        marginTop={4}
      >
        Chỉnh sửa thông tin danh mục {editCatalog.catalogName.toLowerCase()}
      </Typography>
      <FormEditCatalog>
        <Typography variant="h5">Thông tin cơ bản</Typography>
        <FlexContainer justifyContent="space-between" style={{ gap: "20px" }}>
          <MuiTextFeild
            label="Tên danh mục"
            margin="normal"
            autoFocus
            value={catalog.catalogName}
            onChange={(e) => {
              setCatalog((prev) => ({
                ...prev,
                catalogName: e.target.value,
              }));
            }}
            style={{
              flex: 1,
            }}
            required
          />
          <MuiTextFeild
            label="Đường dẫn"
            margin="normal"
            value={catalog.catalogURL}
            onChange={(e) => {
              setCatalog((prev) => ({
                ...prev,
                catalogURL: e.target.value,
              }));
            }}
            style={{
              flex: 1,
            }}
            required
          />
        </FlexContainer>
        <FlexContainer justifyContent="flex-end">
          <CustomButton
            onClick={handleEditCatalog}
            variant="contained"
            startIcon={<UpgradeIcon />}
          >
            Cập nhật
          </CustomButton>
        </FlexContainer>
      </FormEditCatalog>

      <FormEditCatalog>
        <Typography variant="h5">Tính năng đặc biệt</Typography>
        <Typography variant="subtitle1" mt={2} mb={1}>
          Thêm tính năng đặc biệt
        </Typography>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              sx={{
                borderRadius: "10px !important",
                boxShadow: "0px 0px 5px 0px #3f3b3b1a",
                height: "40px",
                fontSize: "14px !important",
              }}
            >
              <MenuItem
                value={1}
                sx={{
                  fontSize: "14px !important",
                }}
              >
                Đang bán
              </MenuItem>
              <MenuItem
                value={2}
                sx={{
                  fontSize: "14px !important",
                }}
              >
                Ngưng bán
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              fontSize: "14px !important",
              fontWeight: "500 !important",
              whiteSpace: "nowrap", // Thêm vào đây
            }}
          >
            Thêm mới
          </Button>
        </Stack>
        <Typography variant="subtitle1" mt={2} mb={1}>
          Danh sách tính năng đặc biệt
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Tên tính năng</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Trạng thái</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Thao tác</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </FormEditCatalog>
    </RootPageEditCatalog>
  );
}
