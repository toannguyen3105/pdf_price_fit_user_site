import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Wrapper from "../../components/Wrapper";

type Props = {
  match: any;
};

const ProductEdit: React.FC<Props> = ({ match }) => {
  const id: number = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [min_price, setMinPrice] = useState("");
  const [max_price, setMaxPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`item/${id}`, {
      min_price: parseFloat(min_price),
      max_price: parseFloat(max_price),
    });

    setRedirect(true);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`item/${id}`);
      setName(data?.data?.name);
      setPrice(data?.data?.price);
      setMinPrice(data?.data?.min_price);
      setMaxPrice(data?.data?.max_price);
    })();
  }, [id]);

  if (redirect) {
    return <Redirect to="/products" />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            defaultValue={name}
            disabled
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            defaultValue={price}
            disabled
          />
        </div>

        <div className="mb-3">
          <label>Min Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            defaultValue={min_price}
            onChange={({ target }) => setMinPrice(target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Max Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            defaultValue={max_price}
            onChange={({ target }) => setMaxPrice(target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductEdit;
