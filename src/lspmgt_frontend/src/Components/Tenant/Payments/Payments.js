import React, { Component } from 'react';
import { Grid, Form, Header, Message, Input, Button, Select } from 'semantic-ui-react'; // Segment deleted from here
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Payments extends Component {
  constructor() {
    super();

    this.state = {
      BalanceDue: '$400.00',
      // PaymentAmount: '',
      // PaymentType: '',
      id: '', // stripeId is saved to redux store when tenant visits dashboard. Set to state using component did mount
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.userHandle.stripeId,
    });
  }

  render() {
    const { BalanceDue } = this.state;
    // console.log('THIS IS SPAAARDAAAA', this.props.userHandle.stripeId, this.state);
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16}>
            <Header as="h1">Payments</Header>
            <Header as="h2" style={styles.balanceHeader}>
              Outstanding Balance for:
              <span style={{ color: 'red' }}>{this.state.id}</span>
            </Header>
            <Message style={styles.balanceDue}>
              <Message.Header>{BalanceDue}</Message.Header>
            </Message>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={styles.paymentHeader}>
          <Grid.Column mobile={16}>
            <Header as="h2">Make a Payment</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2} style={styles.paymentRow}>
          <Grid.Column mobile={16} computer={8} tablet={8}>
            <Form style={styles.paymentForm}>
              <Form.Field
                icon="dollar"
                iconPosition="left"
                control={Input}
                placeholder="Payment Amount"
                style={styles.paymentField}
              />
              <Form.Group>
                <Form.Field
                  control={Select}
                  label="Payment Method"
                  options={fields}
                  placeholder="Select Method"
                  style={{ marginBottom: '1rem' }}
                />
                {/* <Form.Field label="Visa" control="input" type="radio" name="paymentType" />
              <Form.Field label="MasterCard" control="input" type="radio" name="paymentType" /> */}
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8} tablet={8}>
            <Form>
              <Form.Field
                id="CCName"
                icon="user"
                iconPosition="left"
                control={Input}
                label="Cardholder's Name"
                placeholder="John Doe"
              />

              <Form.Field
                id="CCNumber"
                icon="credit card"
                iconPosition="left"
                control={Input}
                label="Card Number"
                // placeholder=""
              />

              <Form.Group widths="2">
                <Form.Field
                  id="CCExpiration"
                  icon="calendar alternate"
                  iconPosition="left"
                  control={Input}
                  label="Expiration Date"
                  placeholder="MM/YY"
                />
                <Form.Field
                  id="CCCVV"
                  icon="protect"
                  iconPosition="left"
                  control={Input}
                  label="CVV"
                />
              </Form.Group>

              <Form.Field
                id="CCAcountType"
                control={Input}
                label="Account Type"
                placeholder="Checking, Savings, etc"
              />

              <Form.Field
                id="CCRoutingNumber"
                icon="hashtag"
                iconPosition="left"
                control={Input}
                placeholder="Routing Number"
              />

              <Form.Field
                id="CCAccountNumber"
                icon="hashtag"
                iconPosition="left"
                control={Input}
                placeholder="Account Number"
              />

              <Button secondary style={styles.button}>
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const fields = [
  { key: 'bank', text: 'Bank Account', value: 'bankaccount' },
  {
    key: 'visa',
    icon: 'cc visa',
    iconPosition: 'left',
    text: 'Visa',
    value: 'visa',
  },
  {
    key: 'mc',
    icon: 'cc mastercard',
    iconPosition: 'left',
    text: 'MasterCard',
    value: 'mastercard',
  },
];

const styles = {
  button: {
    // backgroundColor: 'rgb(0, 94, 155)',
    backgroundColor: '#093F6B',
    color: '#F2F2F0',
    width: '120px',
  },
  balanceHeader: {
    marginTop: '2rem',
    marginBottom: '0',
  },
  balanceDue: {
    maxWidth: '226px',
    marginTop: '1.68rem',
  },
  paymentHeader: {
    paddingBottom: '0',
  },
  paymentRow: {
    paddingTop: '0',
  },
  paymentForm: {
    paddingTop: '1.65rem',
  },
  paymentField: {
    maxWidth: '196px',
  },
};

const mapStateToProps = (state) => {
  return {
    userHandle: state,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Payments)
);
