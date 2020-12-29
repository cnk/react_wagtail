import React from "react";
import PropTypes from 'prop-types';
import { Container, Row, Col } from "react-bootstrap";
import { sanitize } from 'dompurify';

function ImageText(props) {
  return (
    <Container className="py-4">
      <Row className={`align-items-center ${ props.value.reverse ? "flex-row-reverse" : ""}`} >
        <Col xs={12} md={5}>
          <div dangerouslySetInnerHTML= {{ __html: `${sanitize(props.value.text)}` }} />
        </Col>
        <Col xs={12} md={7}>
          <img className="img-fluid border" alt="" src={props.value.image.url} />
        </Col>
      </Row>
    </Container>
  );
}

export { ImageText };

ImageText.propTypes = {
  /**
   *  'value' is an object containing an image (with url) and some text.
   *  'value.reverse' controls whether the image is before the text or after.
   */
  value: PropTypes.shape(
    {
      reverse: PropTypes.bool,
      text: PropTypes.string.isRequired,
      image: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
    }
  ).isRequired,
};
