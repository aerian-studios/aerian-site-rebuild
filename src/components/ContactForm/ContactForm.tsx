import * as React from "react";

import * as styles from "./ContactForm.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}
interface State {
    myStateValue?: boolean;
}

const INITIAL_STATE: State = {
    myStateValue: true
};

export class ContactForm extends React.PureComponent<Props, State> {
    public state = INITIAL_STATE;

    public render() {
        return (
            <div
                className={[styles.component, this.props.className].join(" ")}
                style={this.props.style}
            >
                <h2>ContactForm</h2>
            </div>
        );
    }
}
export default ContactForm;
