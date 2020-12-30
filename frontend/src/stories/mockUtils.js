import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import cardImage from "./assets/images/broad.jpg"
import cardImage2 from "./assets/images/broad-grasses.jpg"
import cardImage3 from "./assets/images/frizbee.jpg"
import cardImage4 from "./assets/images/kellog.jpg"
import cardImage5 from "./assets/images/parsons-gates.jpg"

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

const richtext1 = `
<p>Wagtail has been born out of many years of experience building websites, learning approaches that work and ones that don’t,
and striking a balance between power and simplicity, structure and flexibility. We hope you’ll find that Wagtail is in that sweet spot.</p>
`;

const mockImageCarouselItems = [
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
  }
];

const mockImageTextData = {
  image: {
    url: cardImage,
  },
  text: `<div class="rich-text"><p><b>Wagtail</b> CMS's multi-site feature is awesome! Client's can edit the content of different sites in an efficient way.</p></div>`,
};

const mockThumbnailGalleryData = [
  { url: cardImage, },
  { url: cardImage2, },
  { url: cardImage3, },
  { url: cardImage4, },
  { url: cardImage5, },
];

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
    value: mockThumbnailGalleryData,
  },
  {
    type: "image_carousel",
    value: mockImageCarouselItems,
  },
  {
    type: "h2",
    value: "ImageText Example",
  },
  {
    type: "image_text",
    value: {
      ...mockImageTextData,
      reverse: true,
    },
  },
  {
    type: "image_text",
    value: {
      ...mockImageTextData,
      reverse: false,
    },
  },
];

const mockPost = (mockAxios) => {
  mockAxios.onGet(`/api/pages/1/`).reply(200, {
    id: 1,
    title: "Love React 1",
    excerpt: "category: programming",
    header_image_url: {
      url: cardImage,
    },
    // py datetime.strftime('%s000')
    pub_date: 1597720114000,
    body: mockStreamFieldData,
  });
};


export { mockImageCarouselItems, mockImageTextData, mockPost, mockStreamFieldData, mockTag, mockThumbnailGalleryData };
