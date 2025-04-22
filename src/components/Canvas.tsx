
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Path, Text } from "fabric";
import type { TDataUrlOptions } from "fabric";
import { toast } from "sonner";
import { Toolbar } from "./Toolbar";
import { ColorPicker } from "./ColorPicker";
import { TextDialog } from "./TextDialog";

// Helper để tạo trái tim SVG path
const createHeartPath = () => {
  return "M 0 0 C -3 -2 -3 -6 0 -10 C 3 -6 3 -2 0 0 z";
};

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#ea384c");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "heart" | "text" | "eraser">("draw");
  const [brushSize, setBrushSize] = useState(2);
  const [textDialogOpen, setTextDialogOpen] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  // Lưu lịch sử thao tác
  const historyRef = useRef<{
    undoStack: string[];
    redoStack: string[];
    current: string | null;
  }>({
    undoStack: [],
    redoStack: [],
    current: null,
  });
  
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: Math.min(800, window.innerWidth - 40),
      height: 600,
      backgroundColor: "#ffffff",
    });
    
    // Make sure to initialize the brush AFTER canvas creation
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = brushSize;
    }
    
    // Lưu trạng thái ban đầu
    const initialState = JSON.stringify(canvas.toJSON());
    historyRef.current.current = initialState;
    
    // Bắt sự kiện object:modified và path:created để lưu vào lịch sử
    canvas.on("object:modified", () => saveToHistory(canvas));
    canvas.on("path:created", () => saveToHistory(canvas));
    
    setFabricCanvas(canvas);
    
    const handleResize = () => {
      const width = Math.min(800, window.innerWidth - 40);
      canvas.setDimensions({ width, height: 600 });
      canvas.renderAll();
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      canvas.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [activeColor, brushSize]);
  
  // Lưu trạng thái vào lịch sử
  const saveToHistory = (canvas: FabricCanvas) => {
    const newState = JSON.stringify(canvas.toJSON());
    if (newState === historyRef.current.current) return;
    
    historyRef.current.undoStack.push(historyRef.current.current!);
    historyRef.current.redoStack = [];
    historyRef.current.current = newState;
    
    setCanUndo(true);
    setCanRedo(false);
  };
  
  // Cập nhật công cụ đang chọn
  useEffect(() => {
    if (!fabricCanvas) return;
    
    fabricCanvas.isDrawingMode = activeTool === "draw" || activeTool === "eraser";
    
    // Always check that freeDrawingBrush exists before accessing its properties
    if (fabricCanvas.freeDrawingBrush) {
      if (activeTool === "draw") {
        fabricCanvas.freeDrawingBrush.color = activeColor;
        fabricCanvas.freeDrawingBrush.width = brushSize;
      } else if (activeTool === "eraser") {
        fabricCanvas.freeDrawingBrush.color = "#ffffff";
        fabricCanvas.freeDrawingBrush.width = brushSize * 2;
      }
    }
    
    // Nếu chọn công cụ text, mở dialog thêm chữ
    if (activeTool === "text") {
      setTextDialogOpen(true);
    }

    fabricCanvas.renderAll();
  }, [activeTool, activeColor, brushSize, fabricCanvas]);
  
  // Xử lý khi nhấp vào công cụ
  const handleToolClick = (tool: "select" | "draw" | "heart" | "text" | "eraser") => {
    if (tool === "heart") {
      addHeart();
      return;
    }
    
    setActiveTool(tool);
  };
  
  // Thêm hình trái tim
  const addHeart = () => {
    if (!fabricCanvas) return;
    
    // Tạo heart shape từ SVG path
    const heartPath = new Path(createHeartPath(), {
      fill: activeColor,
      stroke: activeColor,
      strokeWidth: 0.5,
      left: fabricCanvas.width! / 2,
      top: fabricCanvas.height! / 2,
      scaleX: 10, 
      scaleY: 10,
      originX: 'center',
      originY: 'center',
    });
    
    fabricCanvas.add(heartPath);
    fabricCanvas.setActiveObject(heartPath);
    saveToHistory(fabricCanvas);
    fabricCanvas.renderAll();
    
    setActiveTool("select");
  };
  
  // Thêm văn bản
  const addText = (text: string, color: string, fontSize: number) => {
    if (!fabricCanvas) return;
    
    const textObj = new Text(text, {
      left: fabricCanvas.width! / 2,
      top: fabricCanvas.height! / 2,
      fontSize: fontSize,
      fill: color,
      fontFamily: 'Dancing Script',
      originX: 'center',
      originY: 'center',
    });
    
    fabricCanvas.add(textObj);
    fabricCanvas.setActiveObject(textObj);
    saveToHistory(fabricCanvas);
    fabricCanvas.renderAll();
    
    setActiveTool("select");
    toast("Đã thêm lời nhắn yêu thương", {
      description: "Kéo và thả để định vị lại vị trí lời nhắn",
    });
  };
  
  // Xóa tất cả
  const handleClear = () => {
    if (!fabricCanvas) return;
    
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    saveToHistory(fabricCanvas);
    fabricCanvas.renderAll();
    
    toast("Đã xóa tất cả", {
      description: "Bắt đầu vẽ lại từ đầu",
    });
  };
  
  // Hoàn tác
  const handleUndo = () => {
    if (!fabricCanvas || historyRef.current.undoStack.length === 0) return;
    
    const currentState = historyRef.current.current;
    const prevState = historyRef.current.undoStack.pop();
    
    if (currentState && prevState) {
      historyRef.current.redoStack.push(currentState);
      historyRef.current.current = prevState;
      
      fabricCanvas.loadFromJSON(prevState, () => {
        fabricCanvas.renderAll();
        setCanUndo(historyRef.current.undoStack.length > 0);
        setCanRedo(true);
      });
    }
  };
  
  // Làm lại
  const handleRedo = () => {
    if (!fabricCanvas || historyRef.current.redoStack.length === 0) return;
    
    const currentState = historyRef.current.current;
    const nextState = historyRef.current.redoStack.pop();
    
    if (currentState && nextState) {
      historyRef.current.undoStack.push(currentState);
      historyRef.current.current = nextState;
      
      fabricCanvas.loadFromJSON(nextState, () => {
        fabricCanvas.renderAll();
        setCanUndo(true);
        setCanRedo(historyRef.current.redoStack.length > 0);
      });
    }
  };
  
  // Lưu canvas thành hình ảnh
  const handleSave = () => {
    if (!fabricCanvas) return;
    
    const dataUrl = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2 // Required parameter
    });
    
    // Tạo link tải và kích hoạt tải xuống
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `trai-tim-to-tinh-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast("Đã lưu hình ảnh trái tim", {
      description: "Hình ảnh đã được tải xuống máy của bạn",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Toolbar
          activeTool={activeTool}
          onToolClick={handleToolClick}
          onClear={handleClear}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onSave={handleSave}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <ColorPicker color={activeColor} onChange={setActiveColor} />
      </div>
      
      <div className="relative w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
      
      <div className="flex justify-center">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Kích thước bút:</label>
          <input
            type="range"
            min={1}
            max={50}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm font-medium">{brushSize}px</span>
        </div>
      </div>
      
      <TextDialog
        open={textDialogOpen}
        onClose={() => setTextDialogOpen(false)}
        onAdd={addText}
      />
    </div>
  );
};
