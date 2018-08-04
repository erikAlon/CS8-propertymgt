import React, { Component } from 'react';
import { Grid, Form, Header, Message, Icon, Button } from 'semantic-ui-react';
import axios from 'axios';

class WorkOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PropertyAddr: '',
      Issue: '',
      PhotoIssue: '',
      Permission: true,
      TenantPhone: '',
      Status: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/tenant/workorder', this.state)
      .then((res) => {
        console.log('Post under tenants workorder successfull', res);
      })
      .catch((err) => {
        console('Error under tenants workorder', err);
      });
  };

  render() {
    const { PropertyAddr, Issue, TenantPhone } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16}>
            <Header as="h1">Submit a Work Order </Header>
            <Message style={styles.maintenanceInfo}>
              <Icon name="phone" />
              <p>24/7 Maintenance</p>
              <p>1-800-123-9876</p>
            </Message>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} computer={8} tablet={8}>
            <Form>
              <Form.Input
                fluid
                label="Address"
                placeholder="1234 Cherry St"
                name="PropertyAddr"
                value={PropertyAddr}
                onChange={this.handleChange}
              />
              <Form.TextArea
                label="Work Order Description"
                name="Issue"
                value={Issue}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                label="Phone Number"
                name="TenantPhone"
                value={TenantPhone}
                onChange={this.handleChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8} tablet={8} style={styles.imageColumn}>
            <Icon name="file image outline" size="massive" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <Form.Checkbox label="Permission to enter residence without tenant home" />
              <Button secondary type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const styles = {
  imageColumn: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: '2rem',
  },
  maintenanceInfo: {
    maxWidth: '270px',
    marginTop: '1.68rem',
  },
};

export default WorkOrders;
