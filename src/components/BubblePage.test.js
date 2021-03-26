import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { fetchColors as mockFetchColors } from '../helpers/fetchColors';
jest.mock('../helpers/fetchColors');

test("Renders BubblePage without errors", () => {
  render(<BubblePage />);
});

test("Fetches data and renders the bubbles on mounting", async () => {
  render(<BubblePage />);

  mockFetchColors.mockResolvedValueOnce({
    data: [
      {
        code: { hex: '#ff0000'},
        color: 'red',
        id: 1,
      },
      {
        code: { hex: '#00ff00'},
        color: 'green',
        id: 2,
      },
      {
        code: { hex: '#0000ff'},
        color: 'blue',
        id: 3,
      },
    ]
  });

  await waitFor(() => {
    const bubbles = screen.queryAllByTestId('color');
    expect(bubbles).toHaveLength(11);
  })
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading