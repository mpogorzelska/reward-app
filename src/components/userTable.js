import React from "react";
import { useTable, useFilters } from "react-table";
import ColumnFilter from "./ColumnFilter";

import "../styles/userTable.css"

const UserTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters);

  return (
    <>
    <h1 className="title">Reward Points</h1>
    <table {...getTableProps()} className="user-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className={column.className}
              >
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
    </>
  );
};

export default UserTable;
