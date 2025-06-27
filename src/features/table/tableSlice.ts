import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TableNode } from "../../types";

interface TableState {
    tableNodes: TableNode[];          
    expandedIds: Set<string>;
}
  
const initialState: TableState = {
    tableNodes: [],
    expandedIds: new Set(),
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    deleteTableNode: (state, action: PayloadAction<TableNode[]>) => {

    },
    toggleTableNode: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.expandedIds.has(id)) {
        state.expandedIds.delete(id);
      } else {
        state.expandedIds.add(id);
      }
    },
  }
})

export const { deleteTableNode, toggleTableNode } = tableSlice.actions

export default tableSlice.reducer
