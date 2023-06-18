import React, { useEffect, useState } from "react";
import { useTable, useFilters } from "react-table";
import "./App.css";

const transactionData = [
  { id: 1, customer: "Jenifer Lopez", amount: 120, date: "2023-06-01" },
  { id: 2, customer: "Ben Afleck", amount: 80, date: "2023-06-02" },
  { id: 3, customer: "Matt Damon", amount: 55, date: "2023-06-02" },
  { id: 1, customer: "Jenifer Lopez", amount: 10, date: "2023-06-01" },
  { id: 2, customer: "Ben Afleck", amount: 230, date: "2023-06-02" },
  { id: 3, customer: "Matt Damon", amount: 73, date: "2023-06-02" },
  { id: 1, customer: "Jenifer Lopez", amount: 15, date: "2023-06-01" },
  { id: 2, customer: "Ben Afleck", amount: 110, date: "2023-06-02" },
  { id: 3, customer: "Matt Damon", amount: 67, date: "2023-06-02" },
];

const calculateRewardPoints = (amount) => {
  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2;
  }

  if (amount > 50) {
    points += amount - 50;
  }

  return points;
};

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

const LoadingComponent = () => {
  return <div>Loading...</div>;
};

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous API call
    setTimeout(() => {
      setData(transactionData);
      setLoading(false);
    }, 1000);
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setFilter,
  } = useTable({ columns, data }, useFilters);

  const { filters } = state;

  const customerRewardPoints = {};
  rows.forEach((row) => {
    const customer = row.values.customer;
    const rewardPoints = row.values.rewardPoints;
    if (!customerRewardPoints[customer]) {
      customerRewardPoints[customer] = 0;
    }
    customerRewardPoints[customer] += rewardPoints;
  });

  const summaryRow = {
    customer: "Total",
    rewardPoints: Object.values(customerRewardPoints).reduce(
      (total, points) => total + points,
      0
    ),
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <h1>Reward Points</h1>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="table-header"
                >
                  <div>{column.render("Header")}</div>
                  {/* {column.canFilter ? (
                    <div>{column.render("Filter")}</div>
                  ) : null} */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="table-cell">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td>Total Reward Points:</td>
            <td>{summaryRow.rewardPoints}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;