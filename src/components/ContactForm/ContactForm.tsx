import * as React from "react";

import { Button } from "../Button";
import * as styles from "./ContactForm.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
}
interface State {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const INITIAL_STATE: State = { name: "", email: "", phone: "", message: "" };

const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
        .map(
            key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
};

export class ContactForm extends React.PureComponent<Props, State> {
    public state = INITIAL_STATE;

    public handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
        this.setState({ [e.target.name]: e.target.value } as Pick<
            State,
            keyof State
        >);

    public handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.sendMessage();
    };

    public sendMessage = async () => {
        alert(encode({ "form-name": "contact", ...this.state }));
        try {
            await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: encode({ "form-name": "contact", ...this.state })
            });
            alert("Sent message");
        } catch (e) {
            console.log("Error");
        }
    };

    public render() {
        const { name, email, phone, message } = this.state;
        return (
            <form
                onSubmit={this.handleSubmit}
                className={[styles.component, this.props.className].join(" ")}
                style={this.props.style}
                data-netlify={true}
                name="contact"
            >
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Telephone</label>
                    <input
                        name="phone"
                        type="text"
                        value={phone}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        value={message}
                        onChange={this.handleChange}
                    />
                </div>
                <input type="hidden" name="form-name" value="contact" />
                <Button arrow={true}>
                    <button type="submit">Submit</button>
                </Button>
            </form>
        );
    }
}
export default ContactForm;
