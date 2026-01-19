"use client";

import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`
          p-2 rounded transition-colors
          ${viewMode === "grid" ?"bg-yellow-400 text-gray-900" :"text-gray-600 hover:text-gray-900"}
        `}
        aria-label="Vista de cuadrícula"
      >
        <Squares2X2Icon className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={`
          p-2 rounded transition-colors
          ${viewMode === "list" ?"bg-yellow-400 text-gray-900" :"text-gray-600 hover:text-gray-900"}
        `}
        aria-label="Vista de lista"
      >
        <ListBulletIcon className="w-5 h-5" />
      </button>
    </div>
  );
}