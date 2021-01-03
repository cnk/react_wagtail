import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from "axios";

class PostPageCard extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;

    axios.get(`/api/v2/pages/${this.props.postPk}/`).then((res) => {
      if (this._isMounted) {
        this.setState({
          data: res.data,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderPost(data) {
    const dateStr = new Date(data.pub_date).toLocaleString();

    return (
      <div className="card mb-4">
        <Link to={`/post/${data.id}`}>
          <img src={data.header_image_url.url} className="card-img-top" alt=""/>
        </Link>
        <div className="card-body">
          <h2 className="card-title">
            <Link to={`/post/${data.id}`}>{data.title}</Link>
          </h2>
          <p className="card-text">{data.excerpt}</p>
          <Link to={`/post/${data.id}`} className="btn btn-primary">
            Read More →
          </Link>
        </div>
        <div className="card-footer text-muted">Posted on {dateStr}</div>
      </div>
   );
  }

  render() {
    if (this.state.loading) {
      return 'Loading...';
    } else {
      return this.renderPost(this.state.data);
    }
  }
}

PostPageCard.propTypes = {
  /**
   * Post object with a header_image, title, and body
   */
  data: PropTypes.shape(
    {
      id: PropTypes.number,
      header_image: PropTypes.shape({url: PropTypes.string}),
      title: PropTypes.string,
      excerpt: PropTypes.string,
      // pub_date is a string that represents the publication date
      pub_date: PropTypes.string,
    }
  ),
  /**
   * Show a loading spinner until this value becomes false
   */
  loading: PropTypes.bool,
};

PostPageCard.defaultProps = {
  data: {},
  loading: true,
};

export { PostPageCard };
