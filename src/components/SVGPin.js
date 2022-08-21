import React, { PureComponent } from "react";
import MarkerShape from '../services/MarkerShape';
import MAP_CONSTANTS from '../constants/mapConstants';

const markerShape = new MarkerShape().getPinShape();
const { defaultMarkerStyle } = MAP_CONSTANTS

export default class SVGPin extends PureComponent {
    render() {
        const { size = 20, label, onClick } = this.props;

        return (
            <svg
                height={size}
                viewBox="0 0 24 24"
                onClick={onClick}
            >
                <path d={markerShape} fill={defaultMarkerStyle.fill} stroke={defaultMarkerStyle.stroke} strokeWidth={defaultMarkerStyle.strokeWidth} />
                <text x="8" y="15" fill={defaultMarkerStyle.textColor} >{label}</text>
            </svg>
        );
    }
}
