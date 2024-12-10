import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import Sidebar from "../../src/components/Sidebar";
import React from "react";
import { Router } from "react-router-dom";

function testRenderF(compToRender) {
  return <Router>{compToRender}</Router>;
}

// const render = (component: React.ReactElement) => {
//   const store = configureStore({});
//   return rtlRender(<Provider store={store}>{component}</Provider>);
// };

describe("TransactionsByType Component", () => {
  // 1. **Rendering Tests**

  it("renders without crashing", () => {
    render(<Sidebar />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
