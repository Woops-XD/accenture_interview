import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductsList from "./ProductsList";

describe("<ProductsList />", () => {
  test("it should mount", () => {
    render(<ProductsList />);
    const productsList = screen.getByTestId("ProductsList");
    expect(productsList).toBeInTheDocument();
  });
});

describe("check the productes under filter ", () => {
  test("show all products", () => {
    const { container } = render(<ProductsList />);
    const cards = container.getElementsByClassName("product").length;
    expect(cards).toBe(8);
  });

  test("Search Beers by text", () => {
    const { container } = render(<ProductsList />);
    fireEvent.change(screen.getByTestId("textFilter"), {
      target: { value: "Beer" },
    });
    fireEvent.click(screen.getByText(/Search/i));
    const cards = container.getElementsByClassName("product").length;
    expect(cards).toBe(4);
  });

  test("Search Beers ", () => {
    const { container } = render(<ProductsList />);
    fireEvent.change(screen.getByTestId("textFilter"), {
      target: { value: "Beer" },
    });
    fireEvent.click(screen.getByText(/Search/i));
    const cards = container.getElementsByClassName("product").length;
    expect(cards).toBe(4);
  });

  test("Search not exist text", () => {
    const { container } = render(<ProductsList />);
    fireEvent.change(screen.getByTestId("textFilter"), {
      target: { value: "a string are not exist in products json " },
    });
    fireEvent.click(screen.getByText(/Search/i));
    const cards = container.getElementsByClassName("product").length;
    expect(cards).toBe(0);
  });

  test("dropdown filter wine", () => {
    const { container } = render(<ProductsList />);
    const elt = screen.getByTestId("typeFilter").firstElementChild;
    fireEvent.mouseDown(elt);
    fireEvent.click(screen.getByTestId("select-option"));
    const cards = container.getElementsByClassName("product").length;
    expect(cards).toBe(2);
  });

  test("dropdown filter wine and search together", () => {
    const { container } = render(<ProductsList />);
    const elt = screen.getByTestId("typeFilter").firstElementChild;
    fireEvent.mouseDown(elt);
    fireEvent.click(screen.getByTestId("select-option"));
    fireEvent.change(screen.getByTestId("textFilter"), {
      target: { value: "Aquila" },
    });
    fireEvent.click(screen.getByText(/Search/i));
    const cards = container.getElementsByClassName("product").length;
    expect(cards).toBe(1);
  });
});
