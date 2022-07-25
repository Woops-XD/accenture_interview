import React from "react";
import PropTypes from "prop-types";
import styles from "./ProductsList.module.scss";
import { Select } from "antd";
const ProductsList = () => {
  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={styles.ProductsList} data-testid="ProductsList">
      ProductsList Component

      <div className={styles.filter_container}>
        <p className={styles.filter_container_title}>Filter by</p>
        <Select
          defaultValue="All"
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="All">All</Option>
          <Option value="Beer">Beer</Option>
          <Option value="Winde">Winde</Option>
          <Option value="Spirits">Spirits</Option>
          <Option value="Cider">Cider</Option>
        </Select>
      </div>
    </div>
  );
};

ProductsList.propTypes = {};

ProductsList.defaultProps = {};

export default ProductsList;
