import { Box, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoreProvinceTable from "../../../components/Admin/StoreProvinceTable";
import StoreStaffTable from "../../../components/Admin/StoreStaffTable";
import { getStoreById } from "../../../services/Admin/StoreService";

const RootPageStoreDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

function StoreDetailPage() {
  const { storeId } = useParams();
  const [storeDetail, setStoreDetail] = useState({});

  useEffect(() => {
    const handleGetStoreDetail = async () => {
      const response = await getStoreById(storeId);

      if (response.success) setStoreDetail(response.data.data);
    };
    handleGetStoreDetail();
  }, [storeId]);

  return (
    <RootPageStoreDetail>
      <Typography variant="h4">
        Thông tin cửa hàng {storeDetail.storeName}
      </Typography>

      <StoreStaffTable
        staffs={storeDetail?.staffs}
        storeId={storeDetail?.store?.storeId}
      />

      <StoreProvinceTable
        provinces={storeDetail?.provinces}
        storeId={storeDetail?.store?.storeId}
      />
    </RootPageStoreDetail>
  );
}

export default StoreDetailPage;
