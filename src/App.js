import React, { useEffect, useState } from "react";

import LoadingComponent from "./components/LoadingComponent";
import UserTable from "./components/UserTable"
import { fetchTransactionData } from "./api/dataService";
import { calculateRewardPoints } from "./utils";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Filter..."
      style={{ width: "100%", padding: "0.3rem" }}
    />
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionData = await fetchTransactionData();
        setData(transactionData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Customer",
        accessor: "customer",
        Filter: ({ column }) => {
          if (column.canFilter) {
            return <ColumnFilter column={column} />;
          }
          return null;
        },
      },
      {
        Header: "Amount ($)",
        accessor: "amount",
        Cell: ({ value }) => `$${value}`,
      },
      {
        Header: "Reward Points",
        accessor: "rewardPoints",
        Cell: ({ row }) => calculateRewardPoints(row.values.amount),
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );


  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <UserTable columns={columns} data={data} />
      
    </>
  );
};

export default App;
