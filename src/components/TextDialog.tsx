
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TextDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (text: string, color: string, fontSize: number) => void;
}

export function TextDialog({ open, onClose, onAdd }: TextDialogProps) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ea384c");
  const [fontSize, setFontSize] = useState(30);

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text, color, fontSize);
      setText("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm lời nhắn tỏ tình</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="message">Lời nhắn</Label>
            <Input
              id="message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập lời yêu thương của bạn..."
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="color">Màu chữ</Label>
            <div className="flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-10"
              />
              <span className="text-sm">{color}</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="size">Kích thước chữ: {fontSize}px</Label>
            <Input
              id="size"
              type="range"
              min={12}
              max={72}
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="cursor-pointer"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Thêm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
