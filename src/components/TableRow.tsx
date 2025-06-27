import type { TableNode } from "../types";
import { useAppDispatch } from "../app/hooks";
import { deleteTableNode, toggleTableNode } from "../features/table/tableSlice";

interface TableRowProps {
    rowData: TableNode;
}

export function TableRow({ rowData }: TableRowProps) {
    const dispatch = useAppDispatch();

    const handleToggle = () => {
        dispatch(toggleTableNode(rowData.nodeId));
    };

    const handleDelete = () => {
        dispatch(deleteTableNode(rowData.nodeId));
    };

    const dataEntries = Object.entries(rowData.data);

    return (
        <tr className="table-row">
            <td className="table-cell">
                {rowData.children.length > 0 &&
                    <button className="toggle-btn" onClick={handleToggle}>toggle</button>}
            </td>
            {dataEntries.map(([key, value]) => (
                <td className="table-cell" key={key}>{String(value)}</td>
            ))}
            <td className="table-cell">
                <button className="delete-btn" onClick={handleDelete}>delete</button>
            </td>
        </tr>
    )
}