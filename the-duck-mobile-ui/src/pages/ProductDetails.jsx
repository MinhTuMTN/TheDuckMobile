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
const ProductHeader = styled("div")(({ theme }) => ({}));
const ProductTabRoot = styled("div")(({ theme }) => ({}));
function ProductDetails(props) {
  return (
    <Wrapper>
      <CustomBreadcrumb />
      <ShopArea>
        <Container>
          <PageContainer>
            <ProductHeader>
              <h1>Product Details</h1>
            </ProductHeader>
            <ProductTabRoot></ProductTabRoot>
          </PageContainer>
        </Container>
      </ShopArea>
    </Wrapper>
  );
}

export default ProductDetails;
