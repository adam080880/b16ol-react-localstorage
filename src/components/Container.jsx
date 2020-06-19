import React from "react";
import styledComponents from "styled-components";

import baseColor from "./templates/baseColor";

const Container = styledComponents.div`
  min-height: 100vh;
  background-color: ${baseColor.backgroundPage};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default (props) => <Container {...props}>{props.children}</Container>;
