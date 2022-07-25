import React from "react";
import PropTypes from "prop-types";
import styles from "./ProductsList.module.scss";
import { Select, Card } from "antd";

import products_json from "../assets/products_json.json";

const { Meta } = Card;
const ProductsList = () => {
  // state
  const [products, setProducts] = React.useState(products_json);

  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    if (value == "All") {
      setProducts(products_json);
    } else {
      setProducts(products_json.filter((x) => x.type == value));
    }
  };
  return (
    <div className={styles.ProductsList} data-testid="ProductsList">
      <div className={styles.filter_container}>
        <p className={styles.filter_container_title}>Filter by</p>
        <Select
          defaultValue="All"
          style={{
            width: 120,
            marginRight: "30px",
          }}
          onChange={handleChange}
        >
          <Option value="All">All</Option>
          <Option value="Beer">Beer</Option>
          <Option value="Wine">Wine</Option>
          <Option value="Spirits">Spirits</Option>
          <Option value="Cider">Cider</Option>
        </Select>
      </div>
      <div className={styles.products_container}>
        {products.map((producct) => {
          return (
            <Card
              hoverable
              className={styles.product}
              cover={
                <img alt={producct.productName} src={producct.productImage} />
              }
            >
              {producct.isSale ? <div className={styles.sale}>sale </div> : null}
              <Meta title={producct.productName + " : " + producct.price} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

ProductsList.propTypes = {};

ProductsList.defaultProps = {};

export default ProductsList;
