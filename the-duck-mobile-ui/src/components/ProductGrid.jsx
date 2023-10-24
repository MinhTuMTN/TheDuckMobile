import ProductGridItem from "./ProductGridItem";
import FlexContainer from "./FlexContainer";
import PropTypes from "prop-types";

const products = [
  {
    id: 1,
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305695/TimerThumb/oppo-reno10.jpg",
    name: "OPPO Reno10 5G 256GB Xanh",
    description: "Điện thoại giảm giá",
    price: 10490000,
    rate: 4.9,
    voteList: [
      {
        id: 1,
        content: "good",
        vote: 5.0,
      },
      {
        id: 2,
        content: "ok",
        vote: 4.8,
      },
      {
        id: 3,
        content: "good",
        vote: 5.0,
      },
      {
        id: 4,
        content: "ok",
        vote: 4.8,
      },
    ],
  },
  {
    id: 2,
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305695/TimerThumb/oppo-reno10.jpg",
    name: "OPPO Reno10 5G 256GB Xanh",
    description: "Điện thoại giảm giá",
    price: 10490000,
    rate: 4.9,
    voteList: [
      {
        id: 1,
        content: "good",
        vote: 5.0,
      },
      {
        id: 2,
        content: "ok",
        vote: 4.8,
      },
      {
        id: 3,
        content: "good",
        vote: 5.0,
      },
      {
        id: 4,
        content: "ok",
        vote: 4.8,
      },
    ],
  },
  {
    id: 3,
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305695/TimerThumb/oppo-reno10.jpg",
    name: "OPPO Reno10 5G 256GB Xanh",
    description: "Điện thoại giảm giá",
    price: 10490000,
    rate: 4.9,
    voteList: [
      {
        id: 1,
        content: "good",
        vote: 5.0,
      },
      {
        id: 2,
        content: "ok",
        vote: 4.8,
      },
      {
        id: 3,
        content: "good",
        vote: 5.0,
      },
      {
        id: 4,
        content: "ok",
        vote: 4.8,
      },
    ],
  },
  {
    id: 4,
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305695/TimerThumb/oppo-reno10.jpg",
    name: "OPPO Reno10 5G 256GB Xanh",
    description: "Điện thoại giảm giá",
    price: 10490000,
    rate: 4.9,
    voteList: [
      {
        id: 1,
        content: "good",
        vote: 5.0,
      },
      {
        id: 2,
        content: "ok",
        vote: 4.8,
      },
      {
        id: 3,
        content: "good",
        vote: 5.0,
      },
      {
        id: 4,
        content: "ok",
        vote: 4.8,
      },
    ],
  },
  {
    id: 5,
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305695/TimerThumb/oppo-reno10.jpg",
    name: "HP 15s fq2716TU i3 1115G4 (7C0X3PA)",
    description: "Điện thoại giảm giá",
    price: 10490000,
    rate: 4.9,
    voteList: [
      {
        id: 1,
        content: "good",
        vote: 5.0,
      },
      {
        id: 2,
        content: "ok",
        vote: 4.8,
      },
      {
        id: 3,
        content: "good",
        vote: 5.0,
      },
      {
        id: 4,
        content: "ok",
        vote: 4.8,
      },
    ],
  },
];

function ProductGrid(props) {
  const { numberColumn, margin, ...other } = props;
  return (
    <FlexContainer
      alignItems="space-between"
      justifyContent="space-evenly"
      flexWrap="wrap"
      margin={margin}
      {...other}
    >
      {products.map((product, index) => {
        return (
          <ProductGridItem
            key={index}
            productInfo={product}
            styled={{ width: `calc(${100 / numberColumn}% - 16px)` }}
          />
        );
      })}
    </FlexContainer>
  );
}

// Props type
ProductGrid.propTypes = {
  numberColumn: PropTypes.number,
  margin: PropTypes.string,
};

// Default props
ProductGrid.defaultProps = {
  numberColumn: 4,
};

export default ProductGrid;
