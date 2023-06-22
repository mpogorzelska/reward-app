import React, { useEffect, useState } from "react";
import { useTable, useFilters } from "react-table";
import ColumnFilter from "./ColumnFilter";
import { calculateRewardPoints } from "../utils";

import "../styles/userTable.css";

const calculateTotalRewardPoints = (data) => {
  return data.reduce(
    (total, row) => total + calculateRewardPoints(row.values.amount),
    0
  );
};

const UserTable = ({ columns, data }) => {
  const [totalRewardPoints, setTotalRewardPoints] = useState(0);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { filters },
  } = useTable({ columns, data }, useFilters);

  useEffect(() => {
    const totalPoints = calculateTotalRewardPoints(rows);
    setTotalRewardPoints(totalPoints);
  }, [rows, filters]);

  return (
    <>
      <h1 className="title">Reward Points</h1>
      <table {...getTableProps()} className="user-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={column.className}>
                  <div>{column.render("Header")}</div>
                  {column.canFilter ? (
                    <div>
                      <ColumnFilter column={column} />
                    </div>
                  ) : null}
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
                  <td
                    {...cell.getCellProps()}
                    className={cell.column.className}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="total-reward-points">
        Total Reward Points: {totalRewardPoints}
      </div>
    </>
  );
};

export default UserTable;
