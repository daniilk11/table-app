import './App.css'
import { useEffect } from 'react';
import rawData from "./data/example-data.json";
import { normalizeData } from "./utils/tableHelpers";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setTable } from "./features/table/tableSlice";
import Table from "./components/Table";

function App() {
  const dispatch = useAppDispatch();
  const tableNodes = useAppSelector((state) => state.table.tableNodes);

  useEffect(() => {
    const normalized = normalizeData(rawData);
    dispatch(setTable(normalized));
  }, [dispatch]);

  return (
    <main className="app">
      <Table data={tableNodes}/>
    </main>
  )
}

export default App
