import React from 'react';
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { within } from '@testing-library/dom';
import { MemoryRouter } from "react-router-dom";

import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockPost, mockCategory, mockTag } from "./stories/mockUtils";

import App from './App';

test('Test Category Link', async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  // Default view shows first 2 cards
  await waitFor(() => expect(screen.getByText("Love React 1")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Love React 2")).toBeInTheDocument());


  // Check that the category widget displays in a card
  const elTag = screen.getByText("Categories");
  expect(elTag.tagName).toEqual('H5');
  expect(elTag).toHaveClass('card-header');
  const { getByText } = within(elTag.parentNode);

  await waitFor(() => expect(getByText("Programming")).toBeInTheDocument());

  // Now, grab the 'Programming' link in the category widget and click it - note we get items 1 nd 3
  const el = getByText('Programming');
  fireEvent.click(el);

  await waitFor(() => expect(screen.getByText("Love React 1")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Love React 3")).toBeInTheDocument());

});

test('Test Tag Link', async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  // Default view shows first 2 cards
  await waitFor(() => expect(screen.getByText("Love React 1")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Love React 2")).toBeInTheDocument());


  // Check that the tag widget displays in a card
  const elTag = screen.getByText("Tags");
  expect(elTag.tagName).toEqual('H5');
  expect(elTag).toHaveClass('card-header');
  const { getByText } = within(elTag.parentNode);

  await waitFor(() => expect(getByText("React")).toBeInTheDocument());

  // Now, grab the 'React' link in the tag widget and click it - note we get items 1 nd 3
  const el = getByText('React');
  fireEvent.click(el);

  await waitFor(() => expect(screen.getByText("Love React 2")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Love React 4")).toBeInTheDocument());

});

test('Test Pagination', async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>,
  );

  await waitFor(() => expect(screen.getByText("Love React 1")).toBeInTheDocument());

  // Now click the 'Next' link to see next page of cards
  const el = screen.getByText("Next");
  fireEvent.click(el);

  await waitFor(() => expect(screen.getByText("Love React 3")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Love React 4")).toBeInTheDocument());
});

test('Test Post Link', async () => {
  const mock = new MockAdapter(axios);
  mockPost(mock);
  mockCategory(mock);
  mockTag(mock);

  render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>,
  );

  await waitFor(() => expect(screen.getByText("Love React 1")).toBeInTheDocument());

  // Now click the first post title
  const el = screen.getByText("Love React 1");
  fireEvent.click(el);

  await waitFor(() => expect(screen.getByText("The Zen of Wagtail")).toBeInTheDocument());
});