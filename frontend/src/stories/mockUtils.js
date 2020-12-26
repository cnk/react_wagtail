import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockTag = (mockAxios) => {
  const API_REQUEST = "/api/blog/tags/";
  mockAxios.onGet(API_REQUEST).reply(200, {
    results: [
      {slug: "django", name: "Django"},
      {slug: "react", name: "React"},
      {slug: "wagtail", name: "Wagtail"},
    ],
  });
};

export { mockTag };
