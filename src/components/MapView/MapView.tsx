import * as React from "react";
import * as styles from "./MapView.module.scss";

interface Props {
    position: [number, number];
    style?: React.CSSProperties;
    className?: string;
}

interface State {
    mounted: boolean;
}

const getMap = async (props: Props) => {
    // This palaver is all because Leaflet tries to access `window`, which isn't available when
    // Gatsby tries to pre-render the HTML. Dynamically including Leaflet via componentDidMount
    // means we can be sure we're in the browser.

    const { icon } = await import("leaflet");

    const { Map, Marker, TileLayer } = await import("react-leaflet");

    const marker = icon({
        iconUrl: require("../../../static/assets/furniture/aerian-map-marker.svg"),
        iconSize: [30, 36],
        iconAnchor: [15, 36]
    });

    return (
        <Map
            className={[styles.component, props.className].join(" ")}
            style={props.style}
            center={props.position}
            zoom={13}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                attribution={`© <a href="https://www.openstreetmap.org/">OSM</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.carto.com/">Carto</a>`}
            />
            <Marker position={props.position} icon={marker} />
        </Map>
    );
};

export class MapView extends React.PureComponent<Props, State> {
    public map: JSX.Element | null = null;
    public state = {
        mounted: false
    };

    public buildMap = async () => {
        this.map = await getMap(this.props);
        this.setState({ mounted: true });
    };

    public componentDidMount() {
        this.buildMap();
    }

    public render() {
        if (this.state.mounted) {
            return this.map;
        }

        return (
            <p
                className={[styles.component, this.props.className].join(" ")}
                style={this.props.style}
            >
                Loading
            </p>
        );
    }
}
export default MapView;
