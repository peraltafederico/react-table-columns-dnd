import React, { useCallback } from "react";
import { useTable, useColumnOrder } from "react-table";
import makeData from "./makeData";
import DraggableHeader from "./DraggableHeader";

const initialColumnOrder = [
  "lastName",
  "firstName",
  "age",
  "visits",
  "status",
  "progress",
  "thoughts",
  "projects",
  "strength",
  "velocity",
  "friends"
];

export default function Table() {
  const data = React.useMemo(() => makeData(500), []);

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Visits",
        accessor: "visits"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Profile Progress",
        accessor: "progress"
      },
      {
        Header: "Thoughts",
        accessor: "thoughts"
      },
      {
        Header: "Projects",
        accessor: "projects"
      },
      {
        Header: "Strength",
        accessor: "strength"
      },

      {
        Header: "Velocity",
        accessor: "velocity"
      },
      {
        Header: "Friends",
        accessor: "friends"
      }
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
    setColumnOrder
  } = useTable(
    {
      columns,
      data,
      initialState: {
        columnOrder: initialColumnOrder
      }
    },
    useColumnOrder
  );

  const reoder = useCallback(
    (item, newIndex) => {
      const newOrder = [...state.columnOrder];
      const { index: currentIndex } = item;

      const [removedColumn] = newOrder.splice(currentIndex, 1);

      newOrder.splice(newIndex, 0, removedColumn);

      setColumnOrder(newOrder);
    },
    [state, setColumnOrder]
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              <DraggableHeader
                reoder={reoder}
                key={column.id}
                column={column}
                index={i}
              />
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
