import { useState } from "react";
import { Circle, Layer, Rect, RegularPolygon, Stage } from "react-konva";
import "./App.css";
import { Shape } from "./type";

const namesShapes = {
  rect: "rect",
  triangle: "triangle",
  circle: "circle"
};
const App = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isCursorMode, setIsCursorMode] = useState(false);
  const [selectedShapeType, setSelectedShapeType] = useState<"circle" | "rect" | "triangle" | "">(
    ""
  );

  const handleAddShapeInLayer = () => {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    if (selectedShapeType) {
      const newShape: Shape = {
        id: Math.random().toString(),
        type: selectedShapeType,
        x: halfWidth,
        y: halfHeight,
        isDraggable: isCursorMode
      };
      setShapes([...shapes, newShape]);
      setSelectedShapeType("");
    }
  };

  const handleCursorTool = () => {
    setIsCursorMode(true);
    setShapes(shapes.map((shape) => ({ ...shape, isDraggable: true })));
  };

  const renderShapes = () => {
    return shapes.map((shape) => {
      switch (shape.type) {
        case namesShapes.circle:
          return (
            <Circle
              key={shape.id}
              x={shape.x}
              y={shape.y}
              radius={50}
              fill="red"
              draggable={shape.isDraggable}
            />
          );
        case namesShapes.rect:
          return (
            <Rect
              key={shape.id}
              x={shape.x}
              y={shape.y}
              width={100}
              height={100}
              fill="blue"
              draggable={shape.isDraggable}
            />
          );
        case namesShapes.triangle:
          return (
            <RegularPolygon
              key={shape.id}
              x={shape.x}
              y={shape.y}
              sides={3}
              radius={50}
              fill="green"
              draggable={shape.isDraggable}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="app">
      <div className="toolbar">
        <select
          value={selectedShapeType}
          onChange={(e) => setSelectedShapeType(e.target.value as "circle" | "rect" | "triangle")}>
          <option value="">Выберите фигуру</option>
          <option value={namesShapes.circle}>Круг</option>
          <option value={namesShapes.rect}>Квадрат</option>
          <option value={namesShapes.triangle}>Треугольник</option>
        </select>
        <button onClick={handleAddShapeInLayer}>Добавить фигуру</button>
        <button onClick={handleCursorTool}>Курсор</button>
      </div>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={isCursorMode}
        style={{ background: "#f0f0f0" }}>
        <Layer>{renderShapes()}</Layer>
      </Stage>
    </div>
  );
};

export default App;
