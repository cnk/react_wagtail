import React from "react";
import { ImageCarousel } from "../components/StreamField/ImageCarousel";
import { mockImageCarouselItems } from "./mockUtils";

export default {
  title: "ImageCarousel",
  component: ImageCarousel,
};

const Template = (args) => <ImageCarousel {...args} />;

export const PlainCarousel = Template.bind({});
PlainCarousel.args = {
  value: mockImageCarouselItems,
};
