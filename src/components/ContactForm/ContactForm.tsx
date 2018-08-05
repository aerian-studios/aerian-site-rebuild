import * as React from "react";
import Recaptcha from "react-google-invisible-recaptcha";
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
const RECAPTCHA_KEY = process.env.GATSBY_SITE_RECAPTCHA_KEY;
const INITIAL_STATE: State = {
    name: "",
    email: "",
    phone: "",
    message: ""
};

const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
        .map(
            key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
};

export class ContactForm extends React.PureComponent<Props, State> {
    public state = INITIAL_STATE;
    public recaptcha?: Recaptcha;
    public handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
        this.setState({ [e.target.name]: e.target.value } as Pick<
            State,
            keyof State
        >);

    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!this.recaptcha) {
            console.error("Missing recaptcha");
            return;
        }
        this.recaptcha.execute();
    };

    public handleCaptcha = () => {
        console.log("handle captcha");
        if (!this.recaptcha) {
            console.error("Missing recaptcha");
            return;
        }
        const captcha = this.recaptcha.getResponse();
        console.log("got response", captcha);
        this.sendMessage(captcha);
    };
    public sendMessage = async (captcha: string) => {
        try {
            await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: encode({
                    "form-name": "contact",
                    "g-recaptcha-response": captcha,
                    ...this.state
                })
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
                data-netlify-recaptcha={true}
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
                <Recaptcha
                    ref={(ref: Recaptcha) => (this.recaptcha = ref)}
                    sitekey={RECAPTCHA_KEY || ""}
                    onResolved={this.handleCaptcha}
                />
                <Button arrow={true}>
                    <button type="submit">Submit</button>
                </Button>
            </form>
        );
    }
}
export default ContactForm;
