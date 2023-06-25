import React, { useEffect, useState } from "react";

import LoadingComponent from "./components/LoadingComponent";
import UserTable from './components/UserTable';
import ColumnFilter from './components/ColumnFilter'
import { fetchTransactionData } from "./api/dataService";
import { calculateRewardPoints } from "./utils";


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
          if (!column.canFilter) {
            return null;
          }
          return <ColumnFilter column={column} />;
        },
      },
      {
        Header: "Amount ($)",
        accessor: "amount",
        Cell: ({ value }) => `$${value}`,
        Filter: null,
      },
      {
        Header: "Reward Points",
        accessor: "rewardPoints",
        Cell: ({ row }) => calculateRewardPoints(row.values.amount),
        Filter: null,
      },
      {
        Header: "Date",
        accessor: "date",
        Filter: null,
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
