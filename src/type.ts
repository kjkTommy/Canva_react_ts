export interface Shape {
  id: string;
  type: "circle" | "rect" | "triangle";
  x: number;
  y: number;
  isDraggable: boolean;
}
