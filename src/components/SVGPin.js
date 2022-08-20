import React, { PureComponent } from "react";
import MarkerShape from '../services/MarkerShape';
const pinMarker = new MarkerShape().getPinShape();

const pinStyle = {
    path: pinMarker,
    cursor: "pointer",
    fill: "#FF0000",
    fillOpacity: 0.8,
    scale: 0.8,
    stroke: "#8B0000",
    strokeWidth: "2",
    textColor: "white",
    transform: `translate(0px,0px)`
};

export default class SVGPin extends PureComponent {
    render() {
        const { size = 20, label, onClick } = this.props;

        return (
            <svg
                height={size}
                viewBox="0 0 24 24"
                onClick={onClick}
            >
                <path d={pinStyle.path} fill={pinStyle.fill} stroke={pinStyle.stroke} strokeWidth={pinStyle.strokeWidth} />
                <text x="8" y="15" fill={pinStyle.textColor} >{label}</text>
            </svg>
        );
    }
}
