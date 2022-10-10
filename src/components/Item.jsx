import React from "react";

export const Item = ({ title, url, author, num_comments }) => {
  return (
    <>
      <li>
        <h2>{title}</h2>
      </li>
      <li>
        <a href={url}>{title}</a>
      </li>
      <li>{author}</li>
      <li>{num_comments}</li>
    </>
  );
};
