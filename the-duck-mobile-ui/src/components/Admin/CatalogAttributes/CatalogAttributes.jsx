import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
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
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";
import { FormEditCatalog } from "../../../pages/Admin/CatalogManagement/EditCatalogPage";
import {
  addCatalogAttribute,
  addCatalogAttributeValue,
  deleteCatalogAttribute,
  deleteSelectionValue,
  editCatalogAttribute,
  getCatalogAttributesByCatalogId,
} from "../../../services/Admin/CatalogAttributeService";
import MuiTextFeild from "../../MuiTextFeild";
import DialogConfirm from "../../DialogConfirm";
import DialogForm from "../../DialogForm";
import styled from "@emotion/styled";

const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.color4.main,
}));

const SelectionValueItem = (props) => {
  const { selection, catalogAttributeId, refersh } = props;
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteSelection = async () => {
    const response = await deleteSelectionValue(
      catalogAttributeId,
      selection.selectionId
    );

    if (response.success) {
      enqueueSnackbar("Xóa giá trị thuộc tính thành công", {
        variant: "success",
      });
      refersh();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };
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
        <Typography variant="subtitle2">{selection.selectionValue}</Typography>
        <IconButton color="color1" onClick={handleDeleteSelection}>
          <DeleteOutline />
        </IconButton>
      </Stack>
    </Box>
  );
};

function CatalogAttributesItems(props) {
  const { attribute, refersh } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [isFirst, setIsFirst] = React.useState(true);
  const [editAttribute, setEditAttribute] = React.useState({
    attributeName: attribute?.catalogAttributeName || "",
    isRequired: attribute?.isRequired || false,
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  const [newValue, setNewValue] = React.useState("");
  const handleAddSelectionValue = async () => {
    if (newValue.trim() === "") {
      return;
    }
    const response = await addCatalogAttributeValue(
      attribute.catalogAttributeId,
      newValue
    );
    if (response.success) {
      setNewValue("");
      refersh();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleUpdateCatalogAttribute = async () => {
    if (editAttribute.attributeName.trim() === "") {
      enqueueSnackbar("Tên thuộc tính không được để trống", {
        variant: "error",
      });
      return;
    }

    const response = await editCatalogAttribute(
      attribute.catalogAttributeId,
      editAttribute
    );
    if (response.success) {
      enqueueSnackbar("Cập nhật thuộc tính thành công", {
        variant: "success",
      });
      refersh();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };

  const handleDeleteCatalogAttribute = async () => {
    const response = await deleteCatalogAttribute(attribute.catalogAttributeId);
    if (response.success) {
      enqueueSnackbar("Xóa thuộc tính thành công", {
        variant: "success",
      });
      refersh();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {attribute?.catalogAttributeName}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">
            {attribute?.catalogAttributeKey}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" textAlign={"center"}>
            {attribute?.isRequired ? "Có" : "Không"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">
            {attribute?.catalogAttributeType === 0
              ? "Kiểu chữ"
              : attribute?.catalogAttributeType === 1
                ? "Kiểu danh sách"
                : "Kiểu boolean"}
          </Typography>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton color="color1" onClick={() => setOpen(!open)}>
            <EditOutlined />
          </IconButton>
          <IconButton color="color1" onClick={() => setOpenDialog(true)}>
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
                      className="custom-text-feild"
                      value={editAttribute.attributeName}
                      onChange={(e) => {
                        setEditAttribute((prev) => ({
                          ...prev,
                          attributeName: e.target.value,
                        }));
                      }}
                      size="small"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MuiTextFeild
                      label="Key"
                      fullWidth
                      disabled
                      variant="outlined"
                      style={{
                        borderRadius: "10px !important",
                      }}
                      className="custom-text-feild"
                      value={attribute.catalogAttributeKey}
                      size="small"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Select
                      variant="outlined"
                      disabled
                      size="small"
                      fullWidth
                      value={attribute.catalogAttributeType}
                      sx={{
                        marginTop: 2,
                        borderRadius: "10px !important",
                        boxShadow: "0px 0px 5px 0px #3f3b3b1a",
                        fontSize: "14px !important",
                      }}
                    >
                      <MenuItem value={0} style={{ fontSize: "14px" }}>
                        Kiểu chữ
                      </MenuItem>
                      <MenuItem value={1} style={{ fontSize: "14px" }}>
                        Kiểu danh sách
                      </MenuItem>
                      <MenuItem value={2} style={{ fontSize: "14px" }}>
                        Kiểu boolean
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControlLabel
                      checked={editAttribute.isRequired}
                      onChange={(e) => {
                        setEditAttribute((prev) => ({
                          ...prev,
                          isRequired: e.target.checked,
                        }));
                      }}
                      control={
                        <Checkbox
                          color="primary"
                          sx={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
                        />
                      }
                      label={
                        <Typography variant="subtitle2">
                          Thuộc tính bắt buộc
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="contained"
                      color="color2"
                      style={{
                        width: "100%",
                        color: "white",
                      }}
                      onClick={handleUpdateCatalogAttribute}
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
                {attribute.catalogAttributeType === 1 && (
                  <Box mt={4}>
                    <Typography variant="subtitle2" marginBottom={2}>
                      Giá trị
                    </Typography>
                    <Grid
                      container
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Grid item xs={12} sm={10}>
                        <MuiTextFeild
                          label="Giá trị thuộc tính mới"
                          fullWidth
                          required
                          value={newValue}
                          onChange={(e) => {
                            setNewValue(e.target.value);
                            setIsFirst(false);
                          }}
                          className="custom-text-feild"
                          error={newValue.trim() === "" && !isFirst}
                          helperText={
                            newValue.trim() === "" && !isFirst
                              ? "Trường này không được để trống"
                              : ""
                          }
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={1.5}
                        marginTop={{
                          xs: 2,
                          sm: 0,
                        }}
                      >
                        <Button
                          variant="outlined"
                          style={{
                            width: "100%",
                          }}
                          onClick={handleAddSelectionValue}
                        >
                          Thêm
                        </Button>
                      </Grid>
                    </Grid>

                    <Box mt={2}>
                      {attribute?.selectionValues?.map((selection, index) => (
                        <SelectionValueItem
                          catalogAttributeId={attribute.catalogAttributeId}
                          refersh={refersh}
                          key={`selection-value-item-${index}`}
                          selection={selection}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <DialogConfirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onOk={handleDeleteCatalogAttribute}
        onCancel={() => setOpenDialog(false)}
        title={"Xác nhận xóa thuộc tính"}
        content={"Bạn có chắc chắn muốn xóa thuộc tính này?"}
        okText={"Xóa"}
        cancelText={"Hủy"}
      />
    </>
  );
}

function CatalogAttributes(props) {
  const { catalogId } = props;
  const [catalogAttributes, setCatalogAttributes] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [addCatalogAttributes, setAddCatalogAttributes] = React.useState({
    displayName: "",
    key: "",
    catalogId: catalogId,
    type: 0,
    isRequired: false,
  });

  const handleGetCatalogAttributes = useCallback(async () => {
    const response = await getCatalogAttributesByCatalogId(catalogId);
    if (response.success) {
      setCatalogAttributes(response.data.data);
    }
  }, [catalogId]);

  useEffect(() => {
    handleGetCatalogAttributes();
  }, [handleGetCatalogAttributes]);

  const handleAddCatalogAttribute = async () => {
    if (addCatalogAttributes.displayName.trim() === "") {
      enqueueSnackbar("Tên thuộc tính không được để trống", {
        variant: "error",
      });
      return;
    }
    if (addCatalogAttributes.key.trim() === "") {
      enqueueSnackbar("Key thuộc tính không được để trống", {
        variant: "error",
      });
      return;
    }
    const response = await addCatalogAttribute({
      key: addCatalogAttributes.key,
      displayName: addCatalogAttributes.displayName,
      catalogId: catalogId,
      isRequired: addCatalogAttributes.isRequired,
      type: addCatalogAttributes.type.toString(),
    });
    if (response.success) {
      enqueueSnackbar("Thêm thuộc tính thành công", {
        variant: "success",
      });
      handleGetCatalogAttributes();
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  };
  return (
    <FormEditCatalog>
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5" mt={2} mb={1}>
          Thuộc tính thông số kỹ thuật
        </Typography>
        <CustomButton onClick={() => {
          setAddCatalogAttributes({
            displayName: "",
            key: "",
            catalogId: catalogId,
            type: 0,
            isRequired: false,
          });
          setOpenDialog(true);
        }}>Thêm</CustomButton>
      </Stack>
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
          {catalogAttributes.map((attribute, index) => (
            <CatalogAttributesItems
              key={`catalog-attribute-item-${index}`}
              attribute={attribute}
              refersh={handleGetCatalogAttributes}
            />
          ))}
        </TableBody>
      </Table>

      <DialogForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onOk={handleAddCatalogAttribute}
        onCancel={() => {
          setOpenDialog(false);
          setAddCatalogAttributes({
            displayName: "",
            key: "",
            catalogId: catalogId,
            type: 0,
            isRequired: false,
          });
        }}
        title={"Thêm thuộc tính"}
        okText={"Thêm"}
        cancelText={"Hủy"}
      >
        <Stack>
          <Grid container spacing={2} alignItems={"flex-start"}>
            <Grid item xs={12} sm={6}>
              <MuiTextFeild
                label="Tên thuộc tính"
                fullWidth
                variant="outlined"
                style={{
                  borderRadius: "10px !important",
                }}
                className="custom-text-feild"
                value={addCatalogAttributes.displayName}
                onChange={(e) => {
                  setAddCatalogAttributes((prev) => ({
                    ...prev,
                    displayName: e.target.value,
                  }));
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
                className="custom-text-feild"
                value={addCatalogAttributes.key}
                onChange={(e) => {
                  setAddCatalogAttributes((prev) => ({
                    ...prev,
                    key: e.target.value,
                  }));
                }}
                size="small"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Select
                variant="outlined"
                size="small"
                fullWidth
                value={addCatalogAttributes.type}
                onChange={(e) => {
                  setAddCatalogAttributes((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }));
                }}
                sx={{
                  marginTop: 2,
                  borderRadius: "10px !important",
                  boxShadow: "0px 0px 5px 0px #3f3b3b1a",
                  fontSize: "14px !important",
                }}
              >
                <MenuItem value={0} style={{ fontSize: "14px" }}>
                  Kiểu chữ
                </MenuItem>
                <MenuItem value={1} style={{ fontSize: "14px" }}>
                  Kiểu danh sách
                </MenuItem>
                <MenuItem value={2} style={{ fontSize: "14px" }}>
                  Kiểu boolean
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                checked={addCatalogAttributes.isRequired}
                onChange={(e) => {
                  setAddCatalogAttributes((prev) => ({
                    ...prev,
                    isRequired: e.target.checked,
                  }));
                }}
                control={
                  <Checkbox
                    color="primary"
                    sx={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
                  />
                }
                label={
                  <Typography variant="subtitle2">
                    Thuộc tính bắt buộc
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogForm>
    </FormEditCatalog>
  );
}

export default CatalogAttributes;
