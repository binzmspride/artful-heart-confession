
import { useState } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const colors = [
    "#ea384c", // love-red
    "#FFDEE2", // love-pink
    "#FDE1D3", // love-peach
    "#9b87f5", // love-purple
    "#D946EF", // love-magenta
    "#000000", // black
    "#ffffff", // white
    "#33C3F0", // sky blue
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium">Màu sắc:</span>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            className={`w-8 h-8 rounded-full border-2 ${
              color === c ? "border-gray-900" : "border-gray-300"
            }`}
            style={{ backgroundColor: c }}
            onClick={() => onChange(c)}
            aria-label={`Chọn màu ${c}`}
          />
        ))}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 cursor-pointer"
        aria-label="Chọn màu tùy chỉnh"
      />
    </div>
  );
};
