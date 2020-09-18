import React from "react";
import ReactDOM from "react-dom";
import Card, { ICard } from "./Card";

it("renders without crashing", () => {
  const cardProps: ICard = {
    author: "António Capelo",
    id: 1,
    image_url: "http://lorempixel.com/300/150/",
    navText: "Learn more",
    navUrl: "/test",
    subtitle: "What will you find here",
    text:
      "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
    title: "We are Humans"
  };

  const div = document.createElement("div");
  ReactDOM.render(<Card {...cardProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
