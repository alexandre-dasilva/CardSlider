import "./CardSlider.scss";

import React, { useEffect, useState } from "react";

import { get } from "../@components/AjaxWrapper/AjaxHelper";
import Card from "../@components/Card";
import { ICard } from "../@components/Card/Card";
import Carousel from "../@components/Carousel/Carousel";

const itemsToShow = 3;

const renderCardsCarousel = (
  data: ICard[] | null,
  setLastIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!data || !data.length) {
    return null;
  }

  const onSlide = (indexes: number[]) => setLastIndex(indexes.reverse()[0]);

  const cardsList = data.map(c => (
    <Card
      {...c}
      key={c.id}
      className={"CardItem"}
      navText={"Learn more"}
      subtitle={"What will you find here"}
    />
  ));

  return (
    <Carousel onSlide={onSlide} className={"CardSliderComponent"}>
      {cardsList}
    </Carousel>
  );
};

const CardSlider = () => {
  const [lastIndex, setLastIndex] = useState(0);
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [requestData, setRequestData] = useState({
    requestContinuation: false,
    resultsCount: 0
  });

  const listEnd = requestData.resultsCount + itemsToShow;

  useEffect(() => {
    if (requestData.requestContinuation || !cards) {
      const endpoint = `/cards?_start=${
        requestData.resultsCount
      }&_end=${listEnd}`;

      const success = (data: ICard[]) => {
        const newCardsList = (cards && [...cards, ...data]) || data || [];
        if (newCardsList.length < listEnd) {
          setRequestData({
            requestContinuation: false,
            resultsCount: newCardsList.length
          });
        } else {
          setRequestData({
            requestContinuation: true,
            resultsCount: newCardsList.length
          });
        }

        setCards(newCardsList);
      };

      const fail = (message: string) => alert(message);

      get(endpoint, success, fail);
    }
  }, [lastIndex]);

  return renderCardsCarousel(cards, setLastIndex);
};

export default CardSlider;
