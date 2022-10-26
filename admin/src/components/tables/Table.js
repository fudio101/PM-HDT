import React from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";

function Table({ columns, data }) {
  const tableBtn = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        Header: "Actions",
        accessor: "Action",
        id: "action",
        Cell: (row) => (
          <div>
            <button
              onClick={() => alert(row.row.original.firstname + " clicked")}
            >
              edit
            </button>
          </div>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
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
    state,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;
  console.log(tableInstance);
  React.useEffect(() => {
    console.log(globalFilter);
  }, [globalFilter]);

  return (
    <>
      <select
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
        type="text"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder={`search in ${preGlobalFilteredRows.length} records`}
      />
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
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>

      <br />
      <div>Showing the results in {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}
export default Table;
