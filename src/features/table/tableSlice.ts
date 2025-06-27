import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TableNode } from "../../types";
import { removeNode } from "../../utils/tableHelpers";

interface TableState {
    tableNodes: TableNode[];          
    expandedIds: Record<string, boolean>;
}
  
const initialState: TableState = {
    tableNodes: [],
    expandedIds: {},
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<TableNode[]>) => {
        state.tableNodes = action.payload;
    },
    deleteTableNode: (state, action: PayloadAction<string>) => {
        const nodeId = action.payload;
        state.tableNodes = removeNode(state.tableNodes, nodeId);
        state.expandedIds[nodeId] = false;
    },
    toggleTableNode: (state, action: PayloadAction<string>) => {
        const nodeId = action.payload;
        if (state.expandedIds[nodeId]) {
          delete state.expandedIds[nodeId];
        } else {
          state.expandedIds[nodeId] = true;
        }
    }
  }
})

export const { setTable, deleteTableNode, toggleTableNode } = tableSlice.actions

export default tableSlice.reducer
