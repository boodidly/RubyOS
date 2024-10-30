import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, RefreshCcw } from 'lucide-react';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  label: string;
}

const presetColors = [
  { name: 'Ruby', value: '#B63163' },
  { name: 'Azure', value: '#3B82F6' },
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Rose', value: '#EC4899' },
];

const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onColorChange, label }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [rgb, setRgb] = useState({
    r: parseInt(currentColor.slice(1, 3), 16),
    g: parseInt(currentColor.slice(3, 5), 16),
    b: parseInt(currentColor.slice(5, 7), 16),
  });

  useEffect(() => {
    setRgb({
      r: parseInt(currentColor.slice(1, 3), 16),
      g: parseInt(currentColor.slice(3, 5), 16),
      b: parseInt(currentColor.slice(5, 7), 16),
    });
  }, [currentColor]);

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0;
    const validValue = Math.max(0, Math.min(255, numValue));
    const newRgb = { ...rgb, [channel]: validValue };
    setRgb(newRgb);
    const hexColor = `#${newRgb.r.toString(16).padStart(2, '0')}${newRgb.g.toString(16).padStart(2, '0')}${newRgb.b.toString(16).padStart(2, '0')}`;
    onColorChange(hexColor);
  };

  const resetToDefault = () => {
    const defaultColor = label === 'Accent Color' ? '#B63163' : '#2A2A2A';
    onColorChange(defaultColor);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <button
            onClick={resetToDefault}
            className="p-1 rounded-full hover:bg-[#3A3A3A] transition-colors"
            title="Reset to default"
          >
            <RefreshCcw className="w-3 h-3 text-gray-400" />
          </button>
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-[#3A3A3A] transition-colors"
        >
          Advanced
          <ChevronDown className={`w-3 h-3 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {presetColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:ring-2 hover:ring-white/20 transition-all group"
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {currentColor.toLowerCase() === color.value.toLowerCase() && (
              <Check size={16} className="text-white" />
            )}
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {color.name}
            </span>
          </button>
        ))}
      </div>

      {showAdvanced && (
        <div className="space-y-3 pt-3 border-t border-[#3A3A3A]">
          <div className="grid grid-cols-3 gap-3">
            {(['r', 'g', 'b'] as const).map((channel) => (
              <div key={channel} className="relative group">
                <label className="absolute -top-2 left-2 px-1 text-xs text-gray-400 bg-[#2A2A2A] group-focus-within:text-[#B63163]">
                  {channel.toUpperCase()}
                </label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb[channel]}
                  onChange={(e) => handleRgbChange(channel, e.target.value)}
                  className="w-full px-2 py-1.5 bg-transparent rounded border border-[#3A3A3A] text-sm focus:outline-none focus:border-[#B63163] text-center"
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-400">Preview</label>
              <span className="text-xs font-mono text-gray-400">
                {currentColor.toUpperCase()}
              </span>
            </div>
            <div 
              className="h-8 rounded-lg transition-all"
              style={{ 
                backgroundColor: currentColor,
                boxShadow: `0 0 12px ${currentColor}40`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;