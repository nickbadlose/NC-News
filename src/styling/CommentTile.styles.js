import styled from "styled-components";

export const StyledLi = styled.li`
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderR};
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
  transition: border 0.3s ease-in-out;
  overflow: hidden;

  p {
    margin: 0rem;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.linkC};
    transition: color 0.2s ease-in-out;
  }

  .commentMain {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;

    .commentBody {
      text-align: left;
      margin: 0.5rem;
    }

    .commentInfo {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      margin: 0.5rem;

      .commentAuthorShort {
        display: none;
      }

      .editDeleteComment {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;

        button {
          font-size: 0.8rem;
        }
      }
    }
  }

  @media (hover: hover) {
    :hover {
      border: 1px solid #ffffff;
    }

    a {
      :hover {
        color: ${(props) => props.theme.linkHover};
      }
    }
  }

  @media (max-width: 500px) {
    .commentAuthorShort {
      display: flex !important;
      flex-wrap: nowrap;
      padding-right: 0.2rem;
      align-items: center;

      a {
        padding-right: 0.2rem;
      }
    }

    .commentAuthor {
      display: none !important;
    }
  }
`;
