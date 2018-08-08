import React from 'react';
import { Grid, Dropdown, Container, Header } from 'semantic-ui-react';
import BillingForm from './BillingForm';
import Selector from './PropertySelector';
import axios from 'axios';

class Billing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SelectedProperty: '', // Property Address
      SelectedPropertyId: '', // Property ID
      SelectedTenantId: '',
      PropertyList: [],
      SavedCard: {},
      SelectedLast4: '',
      PaymentHistory: [],
    };

    this.setProperty = this.setProperty.bind(this);
    this.getPropertyId = this.setProperty.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/property/all')
      .then((res) => {
        this.setState({
          PropertyList: res.data.data.Items,
        });
      })
      .catch((error) => {
        console.log('Error in Billing GET');
      });
  }

  getPropertyId = (address) => {
    const { PropertyList } = this.state;
    for (let i = 0; i < PropertyList.length; i++) {
      if (address === PropertyList[i].PropertyAddr) {
        return PropertyList[i].propertyId;
      }
    }
  };

  getCustomer = () => {};

  getPropList = () => {
    const myArr = this.state.PropertyList.map((property, index) => {
      const constructingTheObject = {
        key: index,
        value: property.PropertyAddr,
        flag: '',
      };
      const array = Object.keys(property);
      const x = array.indexOf('PropertyAddr');
      const addrToText = property[Object.keys(property)[x]];
      const propertyWithText = Object.assign({ text: addrToText }, constructingTheObject);
      return propertyWithText;
    });
    return myArr;
  };

  // GET CREDIT CARD
  // getCreditCard = (custId) => {
  //   Query Tenants Table for Tenant with matching Property ID
  //   If found matching
  //     Get Stripe ID from Tenant
  //   Use Stripe ID on DynamoDB to Query Stripe DB -- customerId === Stripe ID
  //   Pass Stripe customerId to '/billing/customerCC' and the Route in
  //   Billing Router.js should return credit card object
  // };

  // axios
  //         .get(`http://localhost:5000/api/billing/get/${SelectedTenantId}`)
  //         .then((res) => {
  //           // Store CC in state to display
  //           // console.log('response success ==>', res.data.charges.data);
  //           // console.log('tenant last four ==>', res.data.customer.sources.data[0].last4);
  //           this.setState({
  //             SelectedLast4: res.data.customer.sources.data[0].last4,
  //             PaymentHistory: res.data.charges.data,
  //           });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  setProperty = (e, { name, value }) => {
    const { PropertyList, SelectedPropertyId, SelectedTenantId } = this.state;
    console.log(name);
    console.log(value);
    let Selected = {};
    PropertyList.forEach((Item) => {
      // console.log('Item in propertyList ==>', Item);
      if (value === Item.PropertyAddr) {
        Selected = {
          PropId: Item.propertyId,
          TenantId: Item.tenantId,
        };
      }
    });
    console.log('Selected object ==>', Selected);

    // this.setState({
    //   [name]: value,
    // });

    // () => {
    // for (let i = 0; i < PropertyList.length; i++) {
    //   if (value === PropertyList[i].PropertyAddr) {
    //     this.setState({
    //       SelectedPropertyId: PropertyList[i].propertyId,
    //       SelectedTenantId: PropertyList[i].tenantId,
    //     });
    //   }
    // }

    if (Selected.TenantId) {
      axios
        .get(`http://localhost:5000/api/billing/get/${Selected.TenantId}`)
        .then((res) => {
          // Store CC in state to display
          // console.log('response success ==>', res.data.charges.data);
          // console.log('tenant last four ==>', res.data.customer.sources.data[0].last4);
          this.setState({
            SelectedLast4: res.data.customer.sources.data[0].last4,
            PaymentHistory: res.data.charges.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Get CC information
  };

  render() {
    console.log(this.state.PaymentHistory);

    // const x = this.getPropertyId();
    // console.log(x);

    const { SelectedProperty } = this.state;

    const testArr = this.getPropList();

    const History = this.state.PaymentHistory.map((value, index) => {
      return <DisplayRentHistory payHistory={value} key={index} />;
    });

    return (
      <div>
        <Grid celled>
          <Grid.Row textAlign="left">
            <Dropdown
              placeholder="Select Property"
              selection
              name="SelectedProperty"
              options={testArr}
              onChange={this.setProperty}
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <p>Last 4 digits of Saved Card Info for {SelectedProperty}:</p>
              <h2>{this.state.SelectedLast4}</h2>
            </Grid.Column>
            <Grid.Column width={13}>{History}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const DisplayRentHistory = (props) => {
  // console.log(props.props);
  return (
    <Container>
      <Header>Amount Paid</Header>
      {props.payHistory.amount}
    </Container>
  );
};

export default Billing;
