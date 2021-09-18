import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import { Store } from "../../models/store";

const Stores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/stores`);

        setStores(data?.data);
      } catch (e) {}
    })();
  }, []);

  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Store name</th>
              <th scope="col">Description</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store: Store) => {
              return (
                <tr key={store.id}>
                  <td>{store.id}</td>
                  <td>{store.store_name}</td>
                  <td>{store.description}</td>
                  <td>
                    <div className="mr-2 btn-group">
                      <Link
                        to={`stores/${store.id}/edit`}
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

export default Stores;
