import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/items`);

        setProducts(data.data);
      } catch (e) {}
    })();
  }, []);

  const fetchItems = async () => {
    await axios.get(`/fetch-items`);
    const { data } = await axios.get(`/items`);
    setProducts(data.data);
  };

  const getStoreName = (store_id: number) => {
    return (
      <span>
        {store_id === 1 ? "CSGO" : store_id === 2 ? "BUFF_MARKET" : "BUFF_163"}
      </span>
    );
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link
          to={"/products/create"}
          className="btn btn-sm btn-outline-secondary mr-3"
        >
          Add
        </Link>

        <button
          className="btn btn-sm btn-danger btn-outline-secondary"
          style={{ marginLeft: "0.5rem", color: "#fff" }}
          onClick={fetchItems}
        >
          Fetch
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Min Price</th>
              <th scope="col">Max Price</th>
              <th scope="col">Store</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => {
              return (
                <tr key={product.id}>
                  <td>{product.goods_id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.min_price}</td>
                  <td>{product.max_price}</td>
                  <td>{getStoreName(product.store_id)}</td>
                  <td>
                    <div className="mr-2 btn-group">
                      <Link
                        to={`products/${product.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Products;
