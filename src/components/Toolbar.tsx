
import { Heart, Pencil, Type, Square, CircleOff, Download, Trash2, Undo, Redo } from "lucide-react";

interface ToolbarProps {
  activeTool: "select" | "draw" | "heart" | "text" | "eraser";
  onToolClick: (tool: "select" | "draw" | "heart" | "text" | "eraser") => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({
  activeTool,
  onToolClick,
  onClear,
  onUndo,
  onRedo,
  onSave,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center bg-white p-3 rounded-lg shadow-md">
      <div className="flex gap-1">
        <button
          type="button"
          className={`p-2 rounded-lg ${
            activeTool === "select" ? "bg-love-pink text-love-red" : "hover:bg-gray-100"
          }`}
          onClick={() => onToolClick("select")}
          aria-label="Chọn"
        >
          <Square size={20} />
        </button>
        <button
          type="button"
          className={`p-2 rounded-lg ${
            activeTool === "draw" ? "bg-love-pink text-love-red" : "hover:bg-gray-100"
          }`}
          onClick={() => onToolClick("draw")}
          aria-label="Vẽ tự do"
        >
          <Pencil size={20} />
        </button>
        <button
          type="button"
          className={`p-2 rounded-lg ${
            activeTool === "heart" ? "bg-love-pink text-love-red" : "hover:bg-gray-100"
          }`}
          onClick={() => onToolClick("heart")}
          aria-label="Vẽ trái tim"
        >
          <Heart size={20} />
        </button>
        <button
          type="button"
          className={`p-2 rounded-lg ${
            activeTool === "text" ? "bg-love-pink text-love-red" : "hover:bg-gray-100"
          }`}
          onClick={() => onToolClick("text")}
          aria-label="Thêm chữ"
        >
          <Type size={20} />
        </button>
        <button
          type="button"
          className={`p-2 rounded-lg ${
            activeTool === "eraser" ? "bg-love-pink text-love-red" : "hover:bg-gray-100"
          }`}
          onClick={() => onToolClick("eraser")}
          aria-label="Xóa"
        >
          <CircleOff size={20} />
        </button>
      </div>
      
      <div className="w-px h-8 bg-gray-200 mx-1"></div>
      
      <div className="flex gap-1">
        <button
          type="button"
          className={`p-2 rounded-lg ${!canUndo ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Hoàn tác"
        >
          <Undo size={20} />
        </button>
        <button
          type="button"
          className={`p-2 rounded-lg ${!canRedo ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
          onClick={onRedo}
          disabled={!canRedo}
          aria-label="Làm lại"
        >
          <Redo size={20} />
        </button>
      </div>
      
      <div className="w-px h-8 bg-gray-200 mx-1"></div>
      
      <div className="flex gap-1">
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100 text-love-red"
          onClick={onClear}
          aria-label="Xóa tất cả"
        >
          <Trash2 size={20} />
        </button>
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100"
          onClick={onSave}
          aria-label="Lưu"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};
