import React, { useEffect, useRef } from "react";
import * as api from "../api";
import { userStore } from "../stores/userinfo";
import UserTile from "./UserTile";
import UserCommentTile from "./UserCommentTile";
import { useImmer } from "use-immer";
import { errorStore } from "../stores/error";
import { useToggle } from "../hooks";
import Spinner from "react-bootstrap/Spinner";
import { StyledMain } from "../styling/UserPage.styles";
import { formatDate, formatUserContributions } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faQuestionCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const UserPage = ({ username }) => {
  const isMounted = useRef(true);
  const [state, setState] = useImmer({
    articlesComments: [],
    stars: 0,
    user: {},
    isLoading: true,
  });
  // const [toggleComments, handleCommentsToggle] = useToggle();
  // const [toggleArticles, handleArticlesToggle] = useToggle();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    Promise.all([
      api.getArticles(
        undefined,
        undefined,
        undefined,
        undefined,
        100,
        username
      ),
      api.getComments(username),
      api.getUser(username),
    ])
      .then(([{ data }, comments, user]) => {
        const articlesComments = formatUserContributions(
          data.articles,
          comments
        );
        if (isMounted.current) {
          setState((current) => {
            current.articlesComments = articlesComments;
            current.stars = data.articles.length * 5 + comments.length;
            current.user = user;
            current.isLoading = false;
          });
        }
      })
      .catch(({ response }) => {
        errorStore.err = { status: response.status, msg: response.data.msg };
      });
  }, [username, setState]);

  const { date, time } = formatDate(state.user.joined);

  return (
    <StyledMain>
      <h2 className="username">{username.toLowerCase()}</h2>
      {state.isLoading ? (
        <Spinner animation="border" className="spinner" />
      ) : (
        <div className="layout">
          <Card className="userInfo">
            <Card.Img variant="top" src={state.user.avatar_url} alt="Avatar" />
            <Card.Body className="titleText">
              <Card.Title className="userInfoTitle">{username}</Card.Title>
              {userStore.username === username ? (
                <Card.Text className="text">
                  A collection of all your comments and articles throughout your
                  time with us!
                </Card.Text>
              ) : (
                <Card.Text className="text">
                  A collection of all {username}'s comments and articles
                  throughout their time with us!
                </Card.Text>
              )}
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem className="stars">
                <span>
                  {state.stars} Stars{" "}
                  <FontAwesomeIcon icon={faStar} className="starIcon" />
                </span>
                <OverlayTrigger
                  overlay={
                    userStore.username === username ? (
                      <Tooltip id="tooltip">
                        Want to improve your stars? Earn 5 stars for every
                        article you post and 1 star for each comment you post!
                      </Tooltip>
                    ) : (
                      <Tooltip id="tooltip">
                        5 stars per articles posted and 1 star per comment
                        posted!
                      </Tooltip>
                    )
                  }
                >
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="helpIcon"
                  />
                </OverlayTrigger>
              </ListGroupItem>
              <ListGroupItem className="memberJoinDate">
                {" "}
                Member since {date}{" "}
                <FontAwesomeIcon icon={faClock} className="clockIcon" />
              </ListGroupItem>
            </ListGroup>
          </Card>

          <article className="articlesComments">
            <h3>Articles</h3>
            <ul>
              {state.articlesComments.map((articleComment) => {
                return (
                  <UserTile
                    {...articleComment}
                    key={
                      articleComment.topic === undefined
                        ? `c${articleComment.comment_id}`
                        : articleComment.article_id
                    }
                  />
                );
              })}
            </ul>
          </article>

          {/* <article className="articles">
            <h3>Articles</h3>
            <ul>
              {toggleArticles
                ? state.articles.map((article) => {
                    return (
                      <UserArticleTile {...article} key={article.article_id} />
                    );
                  })
                : state.articles.slice(0, 3).map((article) => {
                    return (
                      <UserArticleTile {...article} key={article.article_id} />
                    );
                  })}
            </ul>
            <button onClick={(e) => handleArticlesToggle(e, "toggleArticles")}>
              {toggleArticles ? "Show less" : "Show all articles"}
            </button>
          </article>
          <article className="comments">
            <h3>Comments</h3>
            <ul>
              {toggleComments
                ? state.comments.map((comment) => {
                    return (
                      <UserCommentTile {...comment} key={comment.comment_id} />
                    );
                  })
                : state.comments.slice(0, 3).map((comment) => {
                    return (
                      <UserCommentTile {...comment} key={comment.comment_id} />
                    );
                  })}
            </ul>
            <button onClick={(e) => handleCommentsToggle(e, "toggleComments")}>
              {toggleComments ? "Show less" : "Show all comments"}
            </button>
          </article> */}
        </div>
      )}
    </StyledMain>
  );
};

export default UserPage;
