import "./Carousel.scss";

import React, { useLayoutEffect, useRef, useState } from "react";
import Arrow, { ArrowDirection } from "../Icons/Arrow/Arrow";

export interface ICarousel {
  children: JSX.Element[];
  className?: string;
  onSlide?: (indexes: number[]) => void;
}

const renderSlide = (value: JSX.Element, index: number) => (
  <li key={index} className={"CarouselItem"}>
    {value}
  </li>
);

const Carousel = (props: ICarousel) => {
  const [position, setPosition] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);

  const listRef = useRef<HTMLUListElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => props.onSlide && props.onSlide(getVisible()), []);

  const updatedWidth = (): { wrapperWidth: number; totalWidth: number } => {
    if (!listRef.current || !carouselRef.current) {
      return { wrapperWidth: 0, totalWidth: 0 };
    }

    let totalWidth = 0;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < listRef.current.children.length; i++) {
      totalWidth += listRef.current.children[i].getBoundingClientRect().width;
    }

    return {
      totalWidth,
      wrapperWidth: carouselRef.current.getBoundingClientRect().width
    };
  };

  const validatePosition = (pos: number): number => {
    pos = Math.round(pos);

    if (pos < 0) {
      return 0;
    } else if (pos > maxWidth) {
      return maxWidth;
    }

    return pos;
  };

  const getVisible = (offset = 0) => {
    if (!carouselRef.current || !listRef.current) {
      return [];
    }

    const carouselRect = carouselRef.current.getBoundingClientRect();
    const widthOffset = carouselRect.width * (offset / 100) + carouselRect.left;

    let indexesList: number[] = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < listRef.current.children.length; i++) {
      const slideRect = listRef.current.children[i].getBoundingClientRect();

      const visibleLeft = slideRect.left - widthOffset >= 0;
      const visibleRight = slideRect.right - widthOffset <= carouselRect.width;

      if (visibleLeft && visibleRight) {
        indexesList = [...indexesList, i];
      }
    }

    return indexesList;
  };

  const slide = (goForward: boolean) => {
    const newPos = validatePosition(position + 100 * (goForward ? 1 : -1));

    if (newPos !== position) {
      setPosition(newPos);

      if (props.onSlide) {
        props.onSlide(getVisible(newPos));
      }
    }
  };

  useLayoutEffect(() => {
    const { totalWidth, wrapperWidth } = updatedWidth();
    const maxTranslation = Math.round((totalWidth / wrapperWidth) * 100 - 100);

    if (maxWidth !== maxTranslation) {
      setMaxWidth(maxTranslation);
    }
  });

  const previous = () => slide(false);
  const next = () => slide(true);

  return (
    <div
      className={`CarouselComponent ${props.className || ""}`}
      ref={carouselRef}
    >
      <ul
        style={{ transform: `translateX(-${validatePosition(position)}%)` }}
        ref={listRef}
        className={"Container"}
      >
        {props.children.map(renderSlide)}
      </ul>
      <div className={"ArrowsContainer"}>
        <a
          onClick={previous}
          className={`Arrow ${position === 0 ? "Disabled" : ""}`}
        >
          <Arrow direction={ArrowDirection.Left} />
        </a>
        <a
          onClick={next}
          className={`Arrow ${position === maxWidth ? "Disabled" : ""}`}
        >
          <Arrow direction={ArrowDirection.Right} />
        </a>
      </div>
    </div>
  );
};

export default Carousel;
