import React, { Component } from "react";

class FilterForm extends Component {
  state = {
    sortBy: "created_at",
    orderBy: "desc"
  };
  render() {
    const { sortBy, orderBy } = this.state;
    const { handleChange } = this;
    const { article } = this.props;
    return (
      <form>
        <label>
          Sort by:
          <select
            value={sortBy}
            onChange={event => {
              handleChange(event.target);
            }}
            name="sortBy"
          >
            <option value="created_at">created at</option>
            {article && <option value="comment_count">comment count</option>}
            <option value="votes">votes</option>
          </select>
        </label>
        <label>
          Order by:
          <select
            value={orderBy}
            onChange={event => {
              handleChange(event.target);
            }}
            name="orderBy"
          >
            <option value="desc">descending</option>
            <option value="asc">ascending</option>
          </select>
        </label>
      </form>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, orderBy } = this.state;
    const { fetchArticles, fetchCommentsByArticleId, article_id } = this.props;
    if (fetchArticles) {
      if (prevState.sortBy !== sortBy || prevState.orderBy !== orderBy) {
        fetchArticles(sortBy, orderBy);
      }
    } else if (fetchCommentsByArticleId) {
      if (prevState.sortBy !== sortBy || prevState.orderBy !== orderBy) {
        fetchCommentsByArticleId(article_id, sortBy, orderBy);
      }
    }
  }

  handleChange = target => {
    target.name === "sortBy"
      ? this.setState({ sortBy: target.value })
      : this.setState({ orderBy: target.value });
  };
}

export default FilterForm;