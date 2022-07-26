import React, { useEffect } from "react";
import styles from "./ProductsList.module.scss";
import { Select, Card, Input } from "antd";
import products_json from "../assets/products_json.json";

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;
const ProductsList = () => {
  // state
  const [products, setProducts] = React.useState(products_json);
  const [textFilter, setTextfilter] = React.useState("");
  const [typeFilter, setTypefilter] = React.useState("All");

  const handleChange = (value) => {
    setTypefilter(value);
  };
  const handleSearch = (value) => {
    setTextfilter(value);
  };

  const handleFilter = (text, type) => {
    if (typeFilter == "All") {
      setProducts(
        products_json.filter(
          (x) =>
            x.price.indexOf(textFilter) != -1 ||
            x.productName.indexOf(textFilter) != -1 ||
            x.type.indexOf(textFilter) != -1
        )
      );
    } else {
      setProducts(
        products_json.filter(
          (x) =>
            x.type == typeFilter &&
            (x.price.indexOf(textFilter) != -1 ||
              x.productName.indexOf(textFilter) != -1 ||
              x.type.indexOf(textFilter) != -1)
        )
      );
    }
  };
  // watch the type and text to do a filter
  useEffect(() => {
    handleFilter(textFilter, typeFilter);
  }, [textFilter, typeFilter]);

  return (
    <div className={styles.ProductsList} data-testid="ProductsList">
      <Search
        placeholder="Plz enter search text (Case sensitive)"
        enterButton="Search"
        onSearch={handleSearch}
        data-testid="textFilter"
      />
      <div className={styles.filter_container}>
        <p className={styles.filter_container_title}>Filter by</p>
        <Select
          defaultValue="All"
          style={{
            width: 120,
            marginRight: "30px",
          }}
          value={typeFilter}
          onChange={handleChange}
          data-testid="typeFilter"
        >
          <Option value="All">All</Option>
          <Option value="Beer">Beer</Option>
          <Option data-testid="select-option" value="Wine">
            Wine
          </Option>
          <Option value="Spirits">Spirits</Option>
          <Option value="Cider">Cider</Option>
        </Select>
      </div>
      <div className={styles.products_container}>
        {products.map((producct) => {
          return (
            <Card
              key={producct.index}
              hoverable
              className={styles.product}
              cover={
                <img alt={producct.productName} src={producct.productImage} />
              }
            >
              {producct.isSale ? (
                <div className={styles.sale}>sale </div>
              ) : null}
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
