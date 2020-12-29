import React from "react";
import { ThumbnailGallery } from "../components/StreamField/ThumbnailGallery";
import { mockThumbnailGalleryData } from "./mockUtils";

export default {
  title: "ThumbnailGallery",
  component: ThumbnailGallery,
};

const Template = (args) => <ThumbnailGallery {...args} />;

export const Gallery = Template.bind({});
Gallery.args = {
  value: mockThumbnailGalleryData,
};
