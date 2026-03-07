import React from "react";

const SkeletonCard = () => {
  return (
    <div className="rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
