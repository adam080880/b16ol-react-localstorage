import React from "react";
import styledComponent from "styled-components";

import baseColor from "./templates/baseColor";

const Button = styledComponent.button`
  background-color: ${baseColor.ctaButton};
  color: ${baseColor.ctaButtonText};
  transition: 0.5s;
  &:hover {
    color: ${baseColor.ctaButtonText};
    background-color: ${baseColor.ctaButtonHover};
  }
`;
export default (props) => {
  return (
    <Button
      {...props}
      className={`${props.className} btn px-3 py-2 font-weight-bold`}
    >
      {props.children}
    </Button>
  );
};
