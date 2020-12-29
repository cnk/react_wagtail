import React from "react";
import PropTypes from 'prop-types';
import { Carousel } from "react-bootstrap";

function ImageCarousel(props) {
  return (
    <div className="my-4">
      <Carousel>
        {props.value.map((item, index) => (
          <Carousel.Item key={`${index}.${item}`}>
            <img className="d-block w-100" src={item.url} alt={item.alt} />
          </Carousel.Item>
        ))};
      </Carousel>
    </div>
  );
}

export { ImageCarousel };

ImageCarousel.propTypes = {
  /**
   *  The only prop we need is an array of carousel item objects
   */
  value: PropTypes.arrayOf(
    PropTypes.shape(
      {
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      }
    )
  ).isRequired,
};

ImageCarousel.defaultProps = {
  value: [],
};
