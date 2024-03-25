import React from "react";
import { usePagination, useTable } from "react-table";

function Table({
  columns,
  data = [],
  fetchData = (d) => console.log("no fetchData { pageIndex, pageSize }", d),
  pageCount: controlledPageCount = 1,
  pageSizePagination,
  headerTextAlignRight = [],
  headerTextAlignCenter = [],
  redirectUrl = "",
  redirectFuntion = (url, itemId) => console.log(url, itemId),
}) {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: pageSizePagination },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    usePagination
  );

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  const firstPageRows = rows.slice(0, pageSizePagination);

  return (
    <div className="w-full overflow-hidden">
      <table className="w-full dark:bg-bgDark dark:text-textDark" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => {
                return (
                  <td
                    key={index}
                    className={`dark:text-textDark ${
                      headerTextAlignRight.includes(column?.Header)
                        ? "text-right"
                        : headerTextAlignCenter.includes(column?.Header)
                        ? "text-center"
                        : ""
                    }`}
                  >
                    {column.render("Header")}
                  </td>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {firstPageRows.map((row, i) => {
            let className = "odd";
            if (i % 2 === 0) {
              className = "even";
            }
            return (
              prepareRow(row) || (
                <tr
                  onClick={() => redirectFuntion(redirectUrl, row.original._id || row.original.id)}
                  className={`cursor-pointer group ${className}`}
                  {...row.getRowProps()}
                  key={i}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        className={`group-hover:bg-[#eeeeee] group-hover:dark:bg-bgDarkSecondary border-b-[1px] md:dark:border-b-bgDarkSecondary md:border-b-[#e0e1e3]${
                          headerTextAlignRight.includes(cell.column.Header)
                            ? "text-right"
                            : headerTextAlignCenter.includes(cell.column.Header)
                            ? "text-center"
                            : ""
                        }`}
                        data-label={cell.column.Header}
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              )
            );
          })}

          {page.length < 1 && (
            <tr className="odd">
              <td colSpan={100}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
