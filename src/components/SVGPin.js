import React, { PureComponent } from "react";
import MarkerShape from '../services/MarkerShape';
import MAP_CONSTANTS from '../constants/mapConstants';
import MarkerStyle from "../services/MarkerStyle";

const markerShape = new MarkerShape().getPinShape();
const { MARKER_TYPES } = MAP_CONSTANTS

export default class SVGPin extends PureComponent {
    render() {
        const { size = 20, label, onClick, isSelected } = this.props;
        const markerStyle = isSelected ? new MarkerStyle(MARKER_TYPES.SELECTED) : new MarkerStyle(MARKER_TYPES.NORMAL)
        return (
            <svg
                height={size}
                viewBox="0 0 24 24"
                onClick={onClick}
            >
                <path d={markerShape} fill={markerStyle.fill} stroke={markerStyle.stroke} strokeWidth={markerStyle.strokeWidth} />
                <text x="8" y="15" fill={markerStyle.textColor} >{label}</text>
            </svg>
        );
    }
}
