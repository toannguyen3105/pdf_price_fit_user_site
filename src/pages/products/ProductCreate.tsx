import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Store } from "../../models/store";

const ProductCreate = () => {
  const [goodsId, setGoodsId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [storeId, setStoreId] = useState("");
  const [redirect, setRedirect] = useState(false);

  const objTmp = {
    description: "",
    cookies: "",
    csrf_token: "",
  };

  const stores: Store[] = [
    {
      id: 1,
      store_name: "CSGO_EMPIRE",
      ...objTmp,
    },
    {
      id: 2,
      store_name: "BUFF_MARKET",
      ...objTmp,
    },
    {
      id: 3,
      store_name: "BUFF163",
      ...objTmp,
    },
  ];

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("item", {
      goods_id: goodsId,
      name: name,
      price: parseFloat(price),
      min_price: parseFloat(minPrice),
      max_price: parseFloat(maxPrice),
      store_id: storeId ? parseInt(storeId) : 1,
    });

    setRedirect(true);
  };

  useEffect(() => {}, []);

  if (redirect) {
    return <Redirect to="/products" />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Goods_id</label>
          <input
            type="text"
            className="form-control"
            onChange={({ target }) => setGoodsId(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={({ target }) => setName(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            onChange={({ target }) => setPrice(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Min Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            onChange={({ target }) => setMinPrice(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Max Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            onChange={({ target }) => setMaxPrice(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Store</label>
          <select
            className="form-control"
            onChange={(e) => setStoreId(e.target.value)}
          >
            {stores.map((s: Store) => {
              return (
                <option key={s.id} value={s.id}>
                  {s.store_name}
                </option>
              );
            })}
          </select>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductCreate;
