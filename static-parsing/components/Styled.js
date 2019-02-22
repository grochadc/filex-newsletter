import React from "react";

const Line = () => <div className="line" />;

const Content = props => <div id="content">{props.children}</div>;

const FlexContainer = props => (
  <div className="flexContainer">{props.children}</div>
);

const FlexItem = props => <div className="flexItem">{props.children}</div>;

export { Line, Content, FlexContainer, FlexItem };
