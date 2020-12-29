import React from "react";
import PropTypes from 'prop-types';
import { Container } from "react-bootstrap";

function ThumbnailGallery(props) {
  return (
    <Container>
      <div className="row text-center text-lg-left">
        {props.value.map((imageItem, index) => (
          <div className="col-lg-3 col-md-4 col-6" key={`${index}.${imageItem}`}>
            <a
            href={imageItem.url} className="d-block mb-4 h-100" target="_blank"
            rel="noopener noreferrer"
            >
              <img className="img-fluid img-thumbnail" src={imageItem.url} alt="" />
            </a>
          </div>
        ))}
      </div>
    </Container>
  );
}

export { ThumbnailGallery };

ThumbnailGallery.propTypes = {
  /**
   *  The only prop we need is an array of carousel item objects
   */
  value: PropTypes.arrayOf(
    PropTypes.shape({ url: PropTypes.string.isRequired })
  ).isRequired,
};

ThumbnailGallery.defaultProps = {
  value: [],
};
