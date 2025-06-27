import React from "react";
import { useAppSelector } from "../app/hooks";
import { TableRow } from "./TableRow";
import type { TableNode } from "../types";

interface TableProps {
  data: TableNode[];
}

export default function Table({ data }: TableProps) {
  const expandedIds = useAppSelector((state) => state.table.expandedIds);

  if (!data || data.length === 0) {
    return (
      <table>
        <thead>
          <tr className="table-row"><th className="table-cell">No data</th></tr>
        </thead>
        <tbody></tbody>
      </table>
    );
  }

  const headers = Object.keys(data[0]?.data ?? {});

  return (
    <table>
      <thead>
        <tr className="table-row">{[
          <th className="table-cell" key="expand"></th>,
          ...headers.map((key) => (
            <th className="table-cell" key={key}>{key}</th>
          )),
          <th className="table-cell" key="delete"></th>
        ]}</tr>
      </thead>
      <tbody>
        {data.map((node) => (
          <React.Fragment key={node.nodeId}>
            <TableRow rowData={node} />
            {!!expandedIds[node.nodeId] && node.children.length > 0 && (
              <tr>
                <td >
                  <Table data={node.children}/>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
