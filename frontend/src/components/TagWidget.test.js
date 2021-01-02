import React from "react";
import { render, screen, wait} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import { TagWidget } from "./TagWidget";

jest.mock('axios');

test('render Tag widget with AJAX data', async () => {
  const resp = {
    data: {
      results: [
        {slug: "wagtail", name: "Wagtail"},
        {slug: "python", name: "Python"},
        {slug: "ruby", name: "Ruby"}
      ]
    }
  };
  axios.get.mockResolvedValue(resp);

  const { asFragment } = render(
    <MemoryRouter>
      <TagWidget />
    </MemoryRouter>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await wait(() => expect(axios.get).toHaveBeenCalled());
  await wait(() => expect(screen.getByText("Wagtail")).toBeInTheDocument());

  // Check the text is in the context we expect
  const el = screen.getByText("Wagtail");
  expect(el.tagName).toEqual('SPAN');
  expect(el).toHaveClass('badge badge-secondary');

  // Check that all of the mock data elements is displayed in the TagWidget
  resp.data.results.map((tag) =>
    expect(screen.getByText(tag.name)).toBeInTheDocument()
  );

  expect(asFragment()).toMatchSnapshot();
});
