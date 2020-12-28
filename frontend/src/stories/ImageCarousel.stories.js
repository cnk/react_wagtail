import React from "react";
import PropTypes from 'prop-types';
import { ImageCarousel } from "../components/StreamField/ImageCarousel";
import { mockImageCarouselData } from "./mockUtils";

console.log(mockImageCarouselData.value);

export default {
  title: "ImageCarousel",
  component: ImageCarousel,
};

const Template = (args) => <ImageCarousel {...args} />;

export const PlainCarousel = Template.bind({});
PlainCarousel.args = {
  value: mockImageCarouselData.value,
};

PlainCarousel.PropTypes = {
  /**
   *
   */
  value: PropTypes.array,
};

PlainCarousel.defaultProps = {
  value: [],
};
