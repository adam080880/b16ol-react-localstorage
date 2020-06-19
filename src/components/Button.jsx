import React from "react";
import styledComponent from "styled-components";

import baseColor from "./templates/baseColor";

export default (props) => {
  let Button = styledComponent.button`
    background-color: ${baseColor.ctaButton};
    color: ${baseColor.ctaButtonText};
    transition: 0.5s;
    &:hover {
      color: ${baseColor.ctaButtonText};
      background-color: ${baseColor.ctaButtonHover};
    }
  `;

  if (props.color) {
    if (props.color === "danger") {
      Button = styledComponent.button`
        background-color: ${baseColor.dangerButton};
        color: ${baseColor.ctaButtonText};
        transition: 0.5s;
        &:hover {
          color: ${baseColor.ctaButtonText};
          background-color: ${baseColor.dangetButtonHover};
        }
      `;
    }
  }

  return (
    <Button
      {...props}
      className={`${props.className} btn px-3 py-2 font-weight-bold`}
    >
      {props.children}
    </Button>
  );
};
