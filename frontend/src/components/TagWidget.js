import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class TagWidget extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      loading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;

    axios.get("/api/blog/tags/").then((res) => {
      const tags = res.data.results;
      if (this._isMounted) {
        this.setState({
          tags,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let content;
    if (this.state.loading) {
      content = 'Loading...';
    } else {
      content = this.state.tags.map((tag) => (
        <a href={`/tag/${tag.slug}`} key={tag.slug}>
          <span className="badge badge-secondary">{tag.name}</span>{" "}
        </a>
      ))
    }

    return (
      <div className="card my-4">
        <h5 className="card-header">Tags</h5>
        <div className="card-body">
          {content}
        </div>
      </div>
    );
  }
}

TagWidget.propTypes = {
  /**
   * Comma seperated list of strings; the strings are the tag names
   */
  tags: PropTypes.array,
  /**
   * Show a loading spinner until this value becomes false
   */
  loading: PropTypes.bool,
}

TagWidget.defaultProps = {
  tags: [],
  loading: true,
};

export { TagWidget };
