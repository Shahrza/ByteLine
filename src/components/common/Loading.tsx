import React from "react";

interface LoadingProps {
  size?: number;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 64, color = "blue-500" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-4 border-solid`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderColor: `transparent transparent ${color}`,
          borderTopColor: `var(--tw-color-${color})`,
        }}
      ></div>
    </div>
  );
};

export default Loading;
