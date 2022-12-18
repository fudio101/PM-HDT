import React from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import classes from "./TableStyle.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function PackageTable({ columns, data, navi }) {
  const navigate = useNavigate();
  const tableBtn = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,

      {
        Header: "Published Date",
        accessor: "created_at",
        id: "created_at",
        Cell: (row) => {
          return (
            <div>
              {moment(row.row.original.published_date).format(
                "ddd-DD/MMM/YYYY"
              )}
            </div>
          );
        },
      },

      {
        Header: "Actions",
        accessor: "Action",
        id: "action0",
        Cell: (row) => {
          return (
            <div
              className={`${
                navi !== "/receipt-manage" ? classes.edit_btn : classes.view_btn
              }`}
              onClick={() => {
                navigate(`${navi}/${row.row.original.id}`);
                // setRowSelected({
                //   id: row.row.original.id,
                //   name: row.row.original.name,
                //   image_url: row.row.original.image_url,
                // });
              }}
            >
              {navi === "/receipt-manage" ? "view" : "edit"}
            </div>
          );
        },
      },
    ]);
  };
  const row = navi === "/receipt-manage" ? "" : "created_at";
  const tableInstance = useTable(
    {
      columns: columns,
      data,
      initialState: {
        hiddenColumns: ["id", row],
      },
    },
    useGlobalFilter, // useGlobalFilter!
    usePagination,
    tableBtn
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;
  // console.log(tableInstance);
  React.useEffect(() => {
    // console.log(globalFilter);
  }, [globalFilter]);

  return (
    <>
      <div className={classes.header_table_bar}>
        <select
          className={classes.select_field}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <input
          className={classes.search_input}
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={`search in ${preGlobalFilteredRows.length} records`}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes.footer_table_bar}>
        <div className={classes.pagination}>
          <div className={classes.nav_paginate}>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"← prev"}
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {"next →"}
            </button>

            <span>
              Page{""}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
          </div>
        </div>

        <div className={classes.result_status}>
          Showing the results in {rows.length} rows
        </div>
      </div>
    </>
  );
}
export default PackageTable;
