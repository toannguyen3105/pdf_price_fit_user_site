import Wrapper from "../components/Wrapper";
import * as c3 from "c3";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      const chart = c3.generate({
        bindto: "#chart",
        data: {
          x: "x",
          columns: [
            ["x", 1, 2],
            ["Sales", "2021-1-1", "2021-2-2"],
          ],
          types: {
            Sales: "bar",
          },
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: "%Y-%m-%d",
            },
          },
        },
      });

      const { data } = await axios.get("chart");
      chart.load({
        columns: [
          ["x", ...data.map((r: any) => r.date)],
          ["Sales", ...data.map((r: any) => r.sum)],
        ],
      });
    })();
  }, []);

  return (
    <Wrapper>
      <h2>Daily Sales</h2>

      <div id="chart"></div>
    </Wrapper>
  );
};

export default Dashboard;
