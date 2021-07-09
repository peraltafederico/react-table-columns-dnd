import "./styles.css";
import Table from "./Table";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import withScrolling from "react-dnd-scrolling";
import Preview from "./Preview";

const ScrollingComponent = withScrolling("div");

export default function App() {
  return (
    <div className="App">
      <h1>React Table DnD Columns</h1>
      <DndProvider backend={HTML5Backend}>
        <ScrollingComponent style={{ overflow: "auto", maxHeight: 450 }}>
          <Table />
        </ScrollingComponent>
        <Preview />
      </DndProvider>
    </div>
  );
}
