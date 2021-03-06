import React from "react";
import { Link } from "@reach/router";
import PostTopicForm from "./PostTopicForm.jsx";
import { useTopics } from "../hooks";
import { StyledMain, StyledLi } from "../styling/Topics.styles";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch-topics":
      state.topics = action.topics;
      state.isLoading = false;
      state.maxPage = action.maxPage;
      state.pages = action.pages;
      return;
    case "loading":
      state.isLoading = true;
      return;
    case "page":
      state.page = action.page;
      return;
    case "reset":
      state.page = 1;
      return;
    default:
      return state;
  }
};

const initialState = {
  topics: [],
  page: 1,
  maxPage: null,
  isLoading: true,
  pages: [1],
};

const Topics = observer(() => {
  const { state, dispatch } = useTopics(reducer, initialState);

  return (
    <StyledMain>
      <div className="createLine">
        <div className="headerPostTopic">
          <h2>Topics</h2>
          <Pagination size="sm" className="pagination numbers">
            {state.pages.map((page) => {
              return (
                <Pagination.Item
                  key={page}
                  active={page === state.page}
                  onClick={() => dispatch({ type: "page", page })}
                >
                  {page}
                </Pagination.Item>
              );
            })}
          </Pagination>
          <PostTopicForm />
        </div>
      </div>
      {state.isLoading ? (
        <Spinner animation="border" className="spinner" />
      ) : (
        <div className="centerTiles">
          <ul>
            {state.topics.map((topic) => {
              return (
                <StyledLi key={topic.slug}>
                  <Link to={`/topics/articles/${topic.slug}`}>
                    <img src={topic.image_thumb} alt={topic.slug + " image"} />
                    <div className="topicInfo">
                      <h4>{topic.slug}</h4>
                      <p>{topic.description}</p>
                      {+topic.article_count === 1 ? (
                        <p>
                          <FontAwesomeIcon icon={faBook} className="bookIcon" />{" "}
                          <span className="numbers">{topic.article_count}</span>{" "}
                          article!
                        </p>
                      ) : (
                        <p>
                          <FontAwesomeIcon icon={faBook} className="bookIcon" />{" "}
                          <span className="numbers">{topic.article_count}</span>{" "}
                          articles!
                        </p>
                      )}
                    </div>
                  </Link>
                </StyledLi>
              );
            })}
          </ul>
          <Pagination size="sm" className="paginationBottom numbers">
            {state.pages.map((page) => {
              return (
                <Pagination.Item
                  key={page}
                  active={page === state.page}
                  onClick={() => dispatch({ type: "page", page })}
                >
                  {page}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </div>
      )}
    </StyledMain>
  );
});

export default Topics;
