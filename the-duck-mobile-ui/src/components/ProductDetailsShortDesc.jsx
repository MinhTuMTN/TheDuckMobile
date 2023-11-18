import { Typography } from "@mui/material";
import React, { memo } from "react";

function ProductDetailsShortDesc(props) {
  return (
    <div
      style={{
        marginBottom: "1.5rem",
        marginTop: "10px",
        paddingBottom: "37px",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <Typography
        variant="body2"
        color={"#121111ca"}
        style={{
          fontSize: "15px",
          width: "95%",
          textAlign: "justify",
        }}
        component={"p"}
      >
        Học ngay 40 đoạn hội thoại tiếng Anh giao tiếp thông dụng trong đời sống
        sau đây để cải thiện trình độ tiếng Anh nhé. Chắc chắn rằng sau khi học
        xong bài viết này, bạn sẽ up level ngay lập tức mà bạn không kịp nhận
        ra, đừng quên bookmark để lưu học dần mỗi ngày nha! Nếu bạn đang muốn
        tăng khả năng phản xạ khi giao tiếp bằng Tiếng Anh thì việc học các đoạn
        hội thoại thông dụng là rất cần thiết. Dưới đây là 70 đoạn hội thoại
        Tiếng Anh cơ bản thông dụng sử dụng hàng ngày, công sở, du lịch. Những
        đoạn hội thoại này sẽ giúp bạn up level ngay trong 1 tuần.
      </Typography>
    </div>
  );
}

export default memo(ProductDetailsShortDesc);
