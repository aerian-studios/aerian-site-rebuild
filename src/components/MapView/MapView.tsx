import Map from "pigeon-maps";
import Overlay from "pigeon-overlay";
import * as React from "react";
import icon from "../../../static/assets/furniture/aerian-map-marker.svg";
import * as styles from "./MapView.module.scss";
interface Props {
    position: [number, number];
    style?: React.CSSProperties;
    className?: string;
}

interface State {
    mounted: boolean;
}

export const MapView: React.SFC<Props> = ({ className, style, position }) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <Map center={position} zoom={13}>
            <Overlay anchor={position} offset={[15, 36]}>
                <img width={30} height={36} src={icon.replace(/"/g, "")} />
            </Overlay>
        </Map>
    </div>
);

export default MapView;
