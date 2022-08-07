import React, { PureComponent } from "react";
import { ICON_PIN } from "../constants/svgPaths";

const pinStyle = {
    cursor: "pointer",
    fill: "#d00",
    stroke: "none"
};

export default class SVGPin extends PureComponent {
    render() {
        const { size = 20, onClick } = this.props;

        return (
            <svg
                height={size}
                viewBox="0 0 24 24"
                style={{
                    cursor: "pointer",
                    fill: "#d00",
                    stroke: "none",
                    transform: `translate(${-size / 2}px,${-size}px)`
                }}
                onClick={onClick}
            >
                <path d={ICON_PIN} />
            </svg>
        );
    }
}
