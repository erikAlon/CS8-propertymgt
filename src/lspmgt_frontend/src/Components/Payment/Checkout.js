import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';


class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(e) {
        // user clicked submit
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        let response = await fetch("/billing/testcharge", {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: token.id
        });

        if (response.ok) console.log("Purchase Complete");
    }

    render() {
        return (
            <div className="checkout">
                <p>Complete Purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);