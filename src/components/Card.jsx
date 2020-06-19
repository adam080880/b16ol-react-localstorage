import React from "react";
import styledComponents from "styled-components";

import baseSize from "./templates/baseSize";

const Card = styledComponents.div`
  min-width: ${baseSize.cardWidth};
  min-height: ${baseSize.cardHeight};
  @media (max-width: 500px) {
    width: ${baseSize.cardTabWidth};
  }
  & .card-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export default (props) => (
  <Card
    {...props}
    className={`${props.className} card shadow-sm rounded border-0`}
  >
    {props.children}
  </Card>
);
