import { Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import BooleanTypeSpecification from "./ProductVersion/BooleanTypeSpecification";
import NormalTypeSpecifcation from "./ProductVersion/NormalTypeSpecifcation";
import SelectionTypeSpecification from "./ProductVersion/SelectionTypeSpecification";

function ProductVersionSpecification(props) {
  const {
    attributes = [],
    specifications = {},
    setSpecifications = () => {},
  } = props;
  return (
    <Grid item xs={12} marginTop={3}>
      <Stack
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: "25px",
        }}
      >
        <Typography
          variant="body1"
          paddingX={3}
          paddingY={2}
          style={{
            fontSize: "20px",
            fontWeight: "600",
            borderRadius: "25px 25px 0 0 ",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Thông số kỹ thuật{" "}
        </Typography>

        <Grid
          container
          sx={{
            paddingX: "0.5rem !important",
            paddingY: "1rem !important",
            width: "100%",
          }}
        >
          <Stack
            spacing={2.5}
            paddingY={2}
            paddingX={{
              xs: "1rem !important",
              md: "1.5rem !important",
            }}
            sx={{ width: "100%" }}
          >
            {attributes.map((attribute) => {
              switch (attribute.type) {
                case 0:
                  return (
                    <NormalTypeSpecifcation
                      lable={attribute.displayName}
                      key={attribute.id}
                      isRequired={attribute.isRequired}
                      value={specifications[attribute.key]}
                      onChange={(e) => {
                        console.log(e.target.value);
                        console.log(attribute.key);
                        console.log(specifications);
                        setSpecifications((prev) => ({
                          ...prev,
                          [attribute.key]: e.target.value,
                        }));
                      }}
                    />
                  );
                case 1:
                  return (
                    <SelectionTypeSpecification
                      lable={attribute.displayName}
                      isRequired={attribute.isRequired}
                      key={attribute.id}
                      options={attribute.selectionValues}
                      value={specifications[attribute.key]}
                      onChange={(e) =>
                        setSpecifications((prev) => ({
                          ...prev,
                          [attribute.key]: e.target.value,
                        }))
                      }
                    />
                  );
                case 2:
                  return (
                    <BooleanTypeSpecification
                      lable={attribute.displayName}
                      key={attribute.id}
                      isRequired={attribute.isRequired}
                      value={specifications[attribute.key]}
                      onChange={(e) =>
                        setSpecifications((prev) => ({
                          ...prev,
                          [attribute.key]: e.target.checked,
                        }))
                      }
                    />
                  );
                default:
                  return null;
              }
            })}
          </Stack>
        </Grid>
      </Stack>
    </Grid>
  );
}

export default ProductVersionSpecification;
