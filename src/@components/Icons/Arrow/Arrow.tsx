import React, { CSSProperties, memo } from "react";

const style: CSSProperties = {
  fill: "none",
  strokeDasharray: "121 19 144 56 0 20",
  strokeMiterlimit: 10
};

export interface IArrow {
  direction?: ArrowDirection;
  className?: string;
}

export enum ArrowDirection {
  Right,
  Left
}

const Arrow = memo((props: IArrow) => {
  const strokeWidth = 10;
  const viewBoxX = 40;
  const viewBoxY = 80;
  const strokeMargin = strokeWidth / 2;

  const width = viewBoxX;
  const height = viewBoxY;
  let startX = strokeMargin;
  const startY = strokeMargin;
  let midX = width - strokeMargin;
  const midY = height / 2;
  let endX = startX;
  const endY = height - strokeMargin;

  if (props.direction !== ArrowDirection.Right) {
    startX = midX;
    midX = endX;
    endX = startX;
  }

  const svgStyle: CSSProperties = {
    ...style,
    strokeWidth
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={props.className}>
      <polyline
        points={`${startX},${startY} ${midX},${midY} ${endX},${endY}`}
        style={svgStyle}
      />
    </svg>
  );
});

export default Arrow;
