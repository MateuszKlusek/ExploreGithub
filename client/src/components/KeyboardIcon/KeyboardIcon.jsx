import React, { useEffect, useRef, memo } from "react";

import gsap from "gsap";

import * as S from "./KeyboardIcon.styled";

const KeyboardIcon = (props) => {
  const svgKeyRef = useRef();

  useEffect(() => {
    const animate = async () => {
      var tl = gsap.timeline();
      tl.to(svgKeyRef.current, {
        opacity: 1,
        delay: 0.5,
      });
    };
    animate();
  }, []);

  var vertical = props.vertical;
  var horizontal = props.horizontal;
  var shape = props.shape;
  var size = props.size;
  var points;

  if (vertical === "top") {
    if (horizontal === "left") {
      points = `120,20 110,10 50,10`;
    } else {
      points = `50,20 60,10 120,10`;
    }
  } else {
    if (horizontal === "left") {
      points = `120,0 110,10 50,10`;
    } else {
      points = `50,20 60,10 120,0`;
    }
  }

  if (shape === "straight") {
    if (size === "large") {
      points = `60,30 20,30`;
    } else if (size === "medium") {
      points = `60,30 40,30`;
    } else {
      points = `60,30 55,30`;
    }
  }

  var shape_straight = {};
  if (horizontal === "left") {
    if (size === "large") {
      shape_straight.right = "140px";
      shape_straight.left = "auto";
    } else if (size === "medium") {
      shape_straight.right = "120px";
      shape_straight.left = "auto";
    } else {
      shape_straight.right = "100px";
      shape_straight.left = "auto";
    }
  } else {
    shape_straight.right = "auto";
    shape_straight.left = "0px";
  }

  var shape_curved = {
    right: horizontal === "left" ? "110px" : "auto",
    left: horizontal === "left" ? "auto" : "130px",
  };

  return (
    <S.KeyboardIconContainer
      left={props.left === undefined ? `auto` : `${props.left}px`}
      right={props.right === undefined ? `auto` : `${props.right}px`}
      top={props.top === undefined ? `-25px` : `${props.top - 25}px`}
    >
      <S.SVG viewBox="0 0 150 50" fill="none">
        <polyline points={`${points}`} stroke="gray" strokeWidth="2" />
      </S.SVG>
      <S.Key
        ref={svgKeyRef}
        right={shape === "straight" ? shape_straight.right : shape_curved.right}
        left={shape === "straight" ? shape_straight.left : shape_curved.left}
        top={shape === "straight" ? "20px" : "-2px"}
      >
        {props.buttonKey}
      </S.Key>
    </S.KeyboardIconContainer>
  );
};

export default memo(KeyboardIcon);
