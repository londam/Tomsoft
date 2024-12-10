import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, describe } from "vitest";
import Sidebar from "../../src/components/Sidebar";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Sidebar Component", () => {
  it("renders the h1 with text 'Luceed Izbornik'", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    // Look for the <h1> element containing the text
    const heading = screen.getByRole("heading", { name: "Luceed Izbornik" });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Luceed/);
  });

  it("renders all list items with correct text", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Check for the primary menu items
    const searchItem = screen.getByText("Pretraga artikla po nazivu");
    const paymentsItem = screen.getByText("Obračun prometa po vrstama plaćanja");
    const productsItem = screen.getByText("Obračun prometa po artiklima");

    expect(searchItem).toBeInTheDocument();
    expect(paymentsItem).toBeInTheDocument();
    expect(productsItem).toBeInTheDocument();
  });

  it("toggles the collapse functionality when 'Obračuni' is clicked", async () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Locate the "Obračuni" button
    const obracuniButton = screen.getByText("Obračuni");
    const paymentsItem = screen.queryByText("Obračun prometa po vrstama plaćanja");

    // Initially, the nested items should be visible
    expect(paymentsItem).toBeVisible();

    // Simulate a click to collapse
    await userEvent.click(obracuniButton);

    // Now, the nested items should not be visible
    expect(paymentsItem).not.toBeVisible();
  });

  it("renders links with correct href attributes", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Check that each link has the correct `href` attribute
    expect(screen.getByText("Pretraga artikla po nazivu").closest("a")).toHaveAttribute(
      "href",
      "/search"
    );
    expect(screen.getByText("Obračun prometa po vrstama plaćanja").closest("a")).toHaveAttribute(
      "href",
      "/payments"
    );
    expect(screen.getByText("Obračun prometa po artiklima").closest("a")).toHaveAttribute(
      "href",
      "/productsSold"
    );
  });
});
