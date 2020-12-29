import React from "react";
import axios from "axios";
import { StreamField } from "./StreamField/StreamField";

class PostDetail extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: true, };
  }

  componentDidMount() {
    this._isMounted = true;

    axios.get(`/api/pages/3/`).then((res) => {
      const post = res.data;
      if (this._isMounted) {
        this.setState({
          post,
          loading: false
        });
      };
    });
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

export { PostDetail };
