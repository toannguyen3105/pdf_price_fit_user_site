import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import Paginator from "../../components/Paginator";
import { Order } from "../../models/order";
import { OrderItem } from "../../models/orderItem";

const hide = {
  maxHeight: 0,
  transition: "600ms ease-in",
};

const show = {
  maxHeight: "150px",
  transition: "600ms ease-out",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selected, setSelected] = useState(0);

  const select = (id: number) => {
    setSelected(selected !== id ? id : 0);
  };

  const handleExport = async () => {
    const { data } = await axios.post(
      `export`,
      {},
      {
        responseType: "blob",
      }
    );

    new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`orders?page=${page}`);

        setOrders(data.data);
        setLastPage(data.meta.last_page);
      } catch (e) {}
    })();
  }, [page]);

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleExport}
        >
          Export
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => {
              return (
                <>
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.total}</td>
                    <td>
                      <div className="mr-2 btn-group">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => select(order.id)}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <div
                        className="overflow-hidden"
                        style={selected === order.id ? show : hide}
                      >
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product Title</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_items.map((i: OrderItem) => {
                              return (
                                <tr>
                                  <td>{i.id}</td>
                                  <td>{i.product_title}</td>
                                  <td>{i.quantity}</td>
                                  <td>{i.price}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <Paginator
        page={page}
        pageChanged={(page) => setPage(page)}
        lastPage={lastPage}
      />
    </Wrapper>
  );
};

export default Orders;
