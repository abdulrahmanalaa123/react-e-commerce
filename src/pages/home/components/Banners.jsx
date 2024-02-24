import React from "react";

export default function Banners() {
  return (
    <div className="flex gap-8 container mx-auto mb-16">
      <div className="flex flex-col gap-y-8 flex-1">
        <div className="h-[298px] bg-bg"></div>
        <div className="h-[298px] bg-bg"></div>
      </div>
      <div className="w-1/2 h-[628px] bg-bg flex-1"></div>
    </div>
  );
}
