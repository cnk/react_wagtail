import React from "react";
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';

import { ThumbnailGallery } from "./ThumbnailGallery";
import { ImageText } from "./ImageText";
import { ImageCarousel } from "./ImageCarousel";

function StreamField(props) {
  const streamField = props.value;
  let html = [];

  for (let i = 0; i < streamField.length; i++) {
    const field = streamField[i];

    if (field.type === "h1") {
      html.push(<div key={`${i}.${field.type}`}><h1>{field.value}</h1></div>);
    } else if (field.type === "h2") {
      html.push(<div key={`${i}.${field.type}`}> <h2>{field.value}</h2> </div>);
    } else if (field.type === "paragraph") {
      html.push(
        <div key={`${i}.${field.type}`}>
          <div dangerouslySetInnerHTML={{ __html: `${sanitize(field.value)}` }} />
        </div>
      );
    } else if (field.type === "thumbnail_gallery") {
      html.push(<ThumbnailGallery value={field.value} key={`${i}.${field.type}`} />);
    } else if (field.type === "image_text") {
      html.push(<ImageText value={field.value} key={`${i}.${field.type}`} />);
    } else if (field.type === "image_carousel") {
      html.push(<ImageCarousel value={field.value} key={`${i}.${field.type}`} />);
    } else {
      // fallback empty div
      html.push(<div className={field.type} key={`${i}.${field.type}`} />);
    }
  }

  return html;
}

StreamField.propTypes = {
  /*
   * An array of objects, each of which has a type and a value.
   * The type is the name of the Wagtail Block and the value is the JSON API representation of that block
   */
  value: PropTypes.array
};

StreamField.defaultProps = {
  value: []
};

export { StreamField }
