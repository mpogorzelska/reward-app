import React, { useState, useEffect } from "react";
import { useTable, useFilters } from "react-table";

import "../styles/userTable.css";

const UserTable = ({ columns, data }) => {
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


  return (
    <table {...getTableProps()} className="table">
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()} className="table-header">
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
  );
};

export default UserTable;
