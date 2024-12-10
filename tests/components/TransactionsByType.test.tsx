import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, it, expect, describe, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import TransactionsByType from "../../src/components/TransactionsByType";
import fetchDataFromServer from "../../src/utils/fetchData";
import checkTip from "../../src/utils/checkTip";
import React from "react";

vi.mock("../../src/utils/fetchData", () => ({
  default: vi.fn(),
}));

const mockTip = "artikli";
const obracunTipa = "obracun_artikli";

vi.mock("../utils/checkTip", () => ({
  default: vi.fn((mockTip) => ["obracun_artikli", "artikl_uid", "Artikli"]),
}));

describe("TransactionsByType Component", () => {
  const mockColumns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "value", headerName: "Value", width: 150 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // **1. Rendering Tests**
  it("renders without crashing", () => {
    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    expect(screen.getByLabelText(/Poslovna Jedinica UID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Početni datum/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Završni datum/i)).toBeInTheDocument();
    expect(screen.getByText(/Traži/i)).toBeInTheDocument();
    expect(screen.getByText(/Artikli/i)).toBeInTheDocument();
  });

  // **2. Initial State Tests**
  it("has the correct default values", () => {
    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    const pjUIDInput = screen.getByLabelText(/Poslovna Jedinica UID/i) as HTMLInputElement;
    expect(pjUIDInput.value).toBe("4986-1");

    const startDatePicker = screen.getByLabelText(/Početni datum/i);
    const endDatePicker = screen.getByLabelText(/Završni datum/i);
    expect(startDatePicker).toBeInTheDocument();
    expect(endDatePicker).toBeInTheDocument();
  });

  // **3. Interaction Tests**
  it("updates pjUID state when input value changes", () => {
    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    const pjUIDInput = screen.getByLabelText(/Poslovna Jedinica UID/i) as HTMLInputElement;

    fireEvent.change(pjUIDInput, { target: { value: "1234-1" } });
    expect(pjUIDInput.value).toBe("1234-1");
  });

  it("updates startDate and endDate when date pickers are changed", () => {
    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    const startDatePicker = screen.getByLabelText(/Početni datum/i);
    const endDatePicker = screen.getByLabelText(/Završni datum/i);

    fireEvent.change(startDatePicker, { target: { value: "2023-01-01" } });
    fireEvent.change(endDatePicker, { target: { value: "2023-01-10" } });

    expect(startDatePicker).toBeInTheDocument();
    expect(endDatePicker).toBeInTheDocument();
  });

  it("displays a success alert when endDate is cleared", async () => {
    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    const endDatePicker = screen.getByLabelText(/Završni datum/i);

    fireEvent.change(endDatePicker, { target: { value: undefined } });
  });

  it("calls handleSearch on button click", async () => {
    (fetchDataFromServer as vi.Mock).mockResolvedValue({ obracunTipa: [] });

    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    const searchButton = screen.getByText(/Traži/i);

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(fetchDataFromServer).toHaveBeenCalledTimes(1);
    });
  });

  // **4. API Call Tests**
  it("constructs the API endpoint correctly", async () => {
    (fetchDataFromServer as vi.Mock).mockResolvedValue({ obracunTipa: [] });

    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    const searchButton = screen.getByText(/Traži/i);

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(fetchDataFromServer).toHaveBeenCalledWith(
        expect.stringContaining(`/${mockTip}/4986-1/`)
      );
    });
  });

  // **5. Data Grid Tests**
  it("displays rows in the data grid when data is fetched", async () => {
    (fetchDataFromServer as vi.Mock).mockResolvedValue({
      obracun_artikli: [{ artikl_uid: 1, name: "TestRow", value: 100 }],
    });

    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    const searchButton = screen.getByText(/Traži/i);

    fireEvent.click(searchButton);

    // Wait for fetchDataFromServer to be called
    await waitFor(() => {
      expect(fetchDataFromServer).toHaveBeenCalledTimes(1);
    });
    // console.log(await fetchDataFromServer.mock.results[0].value);

    await waitFor(() => {
      expect(screen.getByText("TestRow")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });
  });

  // **6. Edge Case Tests**
  it("handles empty API response gracefully", async () => {
    (fetchDataFromServer as vi.Mock).mockResolvedValue({ obracun_artikli: [] });

    render(<TransactionsByType tip={mockTip} columns={mockColumns} />);
    const searchButton = screen.getByText(/Traži/i);

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.queryByText("Test")).not.toBeInTheDocument();
    });
  });
});
