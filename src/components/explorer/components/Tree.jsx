import React, { memo, useState } from "react";
import { useSpring, a } from "react-spring";
import { useMeasure, usePrevious } from "../styles/helpers";
import { Frame, Title, Content } from "../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default memo(
  ({ children, name, defaultOpen = false, iconSize, iconStyle, rowStyle }) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring({
      from: {
        // opacity: 0,
        // transform: "translate3d(0,-3px,0)",
        height: 0
      },
      to: {
        // opacity: isOpen ? 1 : 0,
        // transform: `translate3d(0px,${isOpen ? 0 : -3}px,0)`,
        height: isOpen ? viewHeight * 1 : 0
      },
      config: {
        tension: isOpen
          ? // ? 800 * (1 + 0.007 * viewHeight)
            // : 400 * (1 + 0.007 * viewHeight),
            10000
          : 10000,
        friction: isOpen
          ? // ? 35 * (1 + 0.005 * viewHeight)
            // : 35 * (1 + 0.005 * viewHeight),
            0.01
          : 0.01,
        // clamp: isOpen ? false : true,
        clamp: true,
        // mass: 1 + 0.00125 * viewHeight
        mass: 0.01
      }
    });

    const icon = `${children && (isOpen ? `folder-open` : `folder`)}`;

    return (
      <Frame>
        <div
          onClick={() => setOpen(!isOpen)}
          className="d-flex align-items-center"
          style={rowStyle}
        >
          <FontAwesomeIcon
            icon={icon}
            size={iconSize}
            className={`text-primary`}
            style={iconStyle}
          />
          <Title className="not-selectable">{name}</Title>
        </div>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? "auto" : height
          }}
        >
          <a.div style={{ transform }} {...bind} children={children} />
        </Content>
      </Frame>
    );
  }
);
