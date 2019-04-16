import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import Carousel from "./Carousel";

afterAll(cleanup);

describe("test carousel behaviour", () => {
  const children = new Array(6).map((_value, index) => (
    <div key={index} style={{ width: "200px" }} />
  ));

  const { container } = render(
    <div style={{ width: "600px" }}>
      <Carousel>{children}</Carousel>
    </div>
  );

  let links = container.getElementsByTagName("a");

  const ul = container.getElementsByTagName("ul");

  expect(links).toHaveLength(2);
  expect(ul).toHaveLength(1);

  test("initial slide left", () => {
    links = container.getElementsByTagName("a");
    fireEvent.click(links[0], { button: 0 });

    expect(ul[0].style.transform).toBe("translateX(-0%)");
  });

  test("slide right", () => {
    links = container.getElementsByTagName("a");
    fireEvent.click(links[1], { button: 0 });

    expect(ul[0].style.transform).toBe("translateX(-100%)");
  });

  test("slide left", () => {
    links = container.getElementsByTagName("a");
    fireEvent.click(links[0], { button: 0 });

    expect(ul[0].style.transform).toBe("translateX(-0%)");
  });
});
