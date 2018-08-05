declare module "*.svg";
declare module "*.json";

declare module "react-google-invisible-recaptcha" {
    interface Props {
        sitekey: string;
        onResolved: () => void;
        locale?: string;
        badge?: "bottomright" | "bottomleft" | "inline";
        style?: React.CSSProperties;
        onLoaded?: () => void;
    }
    class GoogleRecaptcha extends React.Component<Props> {
        public execute: () => void;
        public reset: () => void;
        public getResponse: () => string;
    }
    export default GoogleRecaptcha;
}
