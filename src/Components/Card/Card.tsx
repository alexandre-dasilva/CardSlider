import "./Card.scss";

import React, { memo } from "react";

export interface ICard {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  author: string;
  image_url: string;
  image_alt?: string;
  navUrl: string;
  navText: string;
  iconLink?: string;
  className?: string;
}

const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (!event.currentTarget.href) {
    alert(
      "This functionality is not ready yet. We hope to have it soon enought. :)"
    );
    return false;
  }
};

const Card = memo((props: ICard) => (
  <div className={`CardComponent ${props.className ? props.className : ""}`}>
    <img src={props.image_url} alt={props.image_alt} className={"Banner"} />
    <div className={"CardContainer"}>
      <div className={"Head"}>
        <img src={props.iconLink || "/avatar.jpg"} className={"Avatar"} />
        <div className={"HeaderText"}>
          <p className={"Title"}>{props.title}</p>
          <p className={"Subtitle"}>{props.subtitle}</p>
        </div>
      </div>
      <p dangerouslySetInnerHTML={{ __html: props.text }} className={"Text"} />
      <nav>
        <a
          href={props.navUrl}
          title={props.title}
          className={"Link"}
          onClick={onClick}
        >
          {props.navText}
        </a>
      </nav>
    </div>
  </div>
));

export default Card;
