import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

class CategoryWidget extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;

    axios.get("/api/blog/categories/").then((res) => {
      const categories = res.data.results;
      if (this._isMounted) {
        this.setState({
          categories,
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
      content = <div className="row">
                  <div className="col-lg-12">
                    <ul className="list-unstyled mb-0">
                      {this.state.categories.map((category) => (
                        <li key={category.slug}>
                          <Link to={`/category/${category.slug}`}>
                            {category.name}
                          </Link>
                        </li> ))}
                    </ul>
                  </div>
                </div>
    }

    return (
      <div className="card my-4">
        <h5 className="card-header">Categories</h5>
        <div className="card-body">
          {content}
        </div>
      </div>
    );
  }
}

CategoryWidget.propTypes = {
  /**
   * Comma seperated list of category objects; Each category has a name and a slug
   */
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  /**
   * Show a loading spinner until this value becomes false
   */
  loading: PropTypes.bool,
}

CategoryWidget.defaultProps = {
  categories: [],
  loading: true,
};

export { CategoryWidget };
