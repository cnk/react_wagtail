import React from "react";
import { ImageText } from "../components/StreamField/ImageText";
import { mockImageTextData } from "./mockUtils";

export default {
  title: "ImageText",
  component: ImageText,
};

const Template = (args) => <ImageText {...args} />;

export const TextRight = Template.bind({});
TextRight.args = {
  value: mockImageTextData,
};

export const TextLeft = Template.bind({});
TextLeft.args = {
  value: {...mockImageTextData, reverse: true },
};
