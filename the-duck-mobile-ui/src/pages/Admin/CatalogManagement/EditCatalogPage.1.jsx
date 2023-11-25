import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CatalogAttributes from "../../../components/Admin/CatalogAttributes/CatalogAttributes";
import SpecialFeatures from "../../../components/Admin/SpecialFeatures";
import FlexContainer from "../../../components/FlexContainer";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { updateCatalog } from "../../../services/Admin/CatalogService";
import {
  CustomButton,
  FormEditCatalog,
  RootPageEditCatalog,
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

      <SpecialFeatures catalogId={editCatalog?.catalogId} />
      <CatalogAttributes catalogId={editCatalog?.catalogId} />
    </RootPageEditCatalog>
  );
}
