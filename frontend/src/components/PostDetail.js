import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { StreamField } from "./StreamField/StreamField";

class PostDetail extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const pk = this.props.match.params.id;

    // convert querystring to dict
    const querystring = this.props.location.search.replace(/^\?/, '');
    const params = {};
    querystring.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    if (params.token) {
      // preview
      // And no we didn't make a mistake hard coding the pk - the page_preview API endpoint does not use the page PK
      let apiUrl = '/api/v2/page_preview/1/?content_type=' + encodeURIComponent(params['content_type']) + '&token=' + encodeURIComponent(params['token']) + '&format=json';
      axios.get(apiUrl).then((res) => {
        const post = res.data;
        if (this._isMounted) {
          this.setState({
            post,
            loading: false
          });
        };
      });
    } else {
      axios.get(`/api/v2/pages/${pk}/`).then((res) => {
        const post = res.data;
        if (this._isMounted) {
          this.setState({
            post,
            loading: false
          });
        };
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.state.loading) {
      const post = this.state.post;
      return (
        <div className="col-md-8">
          <img src={post.header_image_url.url} className="img-fluid rounded" alt="" />
          <hr />
          <h1>{post.title}</h1>
          <hr />
          <StreamField value={post.body} />
        </div> );
    } else {
      return <div className="col-md-8">Loading...</div>;
    }
  }
}

PostDetail.propTypes = {
  /**
   * Post object with a header_image, title, and body
   */
  post: PropTypes.shape(
    {
      header_image: PropTypes.shape({url: PropTypes.string}),
      title: PropTypes.string,
      body: PropTypes.array,
    }
  ),
  /**
   * Show a loading spinner until this value becomes false
   */
  loading: PropTypes.bool,
};

PostDetail.defaultProps = {
  post: {},
  loading: true,
};


export { PostDetail };
