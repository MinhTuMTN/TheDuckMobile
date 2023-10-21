import styled from "@emotion/styled";
import React from "react";
import CustomBreadcrumb from "../components/CustomBreadcrumb";

const Wrapper = styled.div``;
const ShopArea = styled.div`
  padding-top: 30px;
  color: rgba(0, 0, 0, 0.65);
  padding-bottom: 100px;
`;

const Container = styled.div`
  display: block;
  width: 100%;
  max-width: 720px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: normal;
  justify-content: normal;
  align-items: normal;
  width: 100%;
  padding-right: 0;
  margin-bottom: 5rem;
`;
const ProductHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
}));

const ProductThumbnail = styled("div")(({ theme }) => ({
  display: "flex",
  paddingRight: 0,
  maxWidth: "43%",
  flexFlow: "row wrap",
  alignContent: "flex-start",
}));

const Figure = styled("figure")(({ theme }) => ({
  maxWidth: "100%",
  padding: 0,
  marginBottom: "2rem",
}));
const ProductTabRoot = styled("div")(({ theme }) => ({}));
function ProductDetails(props) {
  return (
    <Wrapper>
      <CustomBreadcrumb />
      <ShopArea>
        <Container>
          <PageContainer>
            <ProductHeader>
              <ProductThumbnail>
                <Figure>
                  <h1>Product Details</h1>
                </Figure>
              </ProductThumbnail>
            </ProductHeader>
            <ProductTabRoot>
              <figure></figure>
            </ProductTabRoot>
          </PageContainer>
        </Container>
      </ShopArea>
    </Wrapper>
  );
}

export default ProductDetails;
