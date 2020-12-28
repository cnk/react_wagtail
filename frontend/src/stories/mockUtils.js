import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import cardImage from "./assets/images/broad.jpg"
import cardImage2 from "./assets/images/broad-grasses.jpg"
import cardImage3 from "./assets/images/frizbee.jpg"
import cardImage4 from "./assets/images/kellog.jpg"
import cardImage5 from "./assets/images/parsons-gates.jpg"

const richtext1 = `
<p>Wagtail has been born out of many years of experience building websites, learning approaches that work and ones that don’t,
and striking a balance between power and simplicity, structure and flexibility. We hope you’ll find that Wagtail is in that sweet spot.</p>
`;

const mockImageCarouselData = {
  type: "image_carousel",
  value: [
    {
      url: cardImage4,
      alt: "Card 4",
    },
    {
      url: cardImage3,
      alt: "Card 3",
    },
    {
      url: cardImage2,
      alt: "Card 2",
    },
  ]
};

const mockStreamFieldData = [
  {
    type: "h2",
    value: "The Zen of Wagtail",
  },
  {
    type: "paragraph",
    value: richtext1,
  },
  {
    type: "thumbnail_gallery",
    value: [
      {
        url: cardImage,
      },
      {
        url: cardImage2,
      },
      {
        url: cardImage3,
      },
      {
        url: cardImage4,
      },
      {
        url: cardImage5,
      },
    ],
  },
  {
    type: "image_carousel",
    value: [
      {
        url: cardImage4,
      },
      {
        url: cardImage3,
      },
      {
        url: cardImage2,
      },
    ],
  },
  {
    type: "h2",
    value: "ImageText Example",
  },
  {
    type: "image_text",
    value: {
      image: {
        url: cardImage,
      },
      text: `<div class="rich-text"><p><b>Wagtail</b> CMS's multi-site feature is awesome! Client's can edit the content of different sites in an efficient way.</p></div>`,
      reverse: true,
    },
  },
  {
    type: "image_text",
    value: {
      image: {
        url: cardImage4,
      },
      text: `<div class="rich-text"><p><b>Wagtail</b> CMS makes it easy for content editors to crop and resize images on the fly.</p></div>`,
      reverse: false,
    },
  },
];

export { mockImageCarouselData, mockStreamFieldData };


// mockAxios is supplied from the caller; dependency injection
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
