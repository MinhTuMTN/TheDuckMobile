import styled from "@emotion/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import AddtionalInformation from "./AddtionalInformation";
import ProductDescription from "./ProductDescription";
import ReviewProduct from "./ReviewProduct";
import PropTypes from "prop-types";

TabRelative.propTypes = {
  specification: PropTypes.string,
  attributes: PropTypes.object,
  description: PropTypes.string,
  review: PropTypes.array,
};

TabRelative.defaultProps = {
  specification: "",
  attributes: {},
  description: "",
  reviews: [],
};

const CustomTabList = styled(TabList)(({ theme }) => ({
  margin: "25px 0 0 0",
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  width: "100%",
  fontSize: "22px",
}));
function TabRelative(props) {
  const { specification, attributes, description, reviews, setReviews, setRate } = props;
  const [tab, setTab] = useState("1");

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };
  return (
    <>
      <TabContext value={tab}>
        <Box>
          <CustomTabList onChange={handleChangeTab} centered>
            <CustomTab label="Thông số kỹ thuật" value="1" />
            <CustomTab label="Mô tả" value="2" />
            <CustomTab label="Đánh giá" value="3" />
          </CustomTabList>
        </Box>
        <TabPanel value="1" style={{ padding: "2rem 0px" }}>
          <AddtionalInformation
            attributes={attributes}
            specification={
              specification !== "" ? JSON.parse(specification) : {}
            }
          />
        </TabPanel>
        <TabPanel value="2" style={{ padding: "2rem 0px" }}>
          <ProductDescription desc={description} />
        </TabPanel>
        <TabPanel value="3" style={{ padding: "2rem 0px" }}>
          <ReviewProduct reviews={reviews} setReviews={setReviews} setRate={setRate} />
        </TabPanel>
      </TabContext>
    </>
  );
}

export default TabRelative;
