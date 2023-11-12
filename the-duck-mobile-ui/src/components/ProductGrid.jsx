import ProductGridItem from "./ProductGridItem";
import FlexContainer from "./FlexContainer";
import PropTypes from "prop-types";

ProductGrid.propTypes = {
  numberColumn: PropTypes.number,
  margin: PropTypes.string,
  products: PropTypes.array,
};

ProductGrid.defaultProps = {
  numberColumn: 4,
  margin: "0",
  products: [],
};

function ProductGrid(props) {
  const { numberColumn, margin, products, ...other } = props;
  return (
    <FlexContainer
      alignItems="space-between"
      justifyContent="space-evenly"
      flexWrap="wrap"
      margin={margin}
      {...other}
    >
      {products &&
        products.map((product, index) => {
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
