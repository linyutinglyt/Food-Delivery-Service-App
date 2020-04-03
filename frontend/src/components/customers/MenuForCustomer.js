import React, { Component } from 'react'
import { Card, Table } from 'semantic-ui-react';
import myAxios from '../../webServer.js'
import OrderMenuModal from '../customers/OrderMenuModal.js';

class MenuForCustomer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            restaurantMenu: [],
            currentRestaurant: props.restaurant,
            infoList: props.infoList,
            location: props.location
        }
        this.updateMenu(props.restaurant)
        console.log("Logging location in MenuForCustomer: ", this.state.location)
    }

    updateMenu = rname => {
      console.log("Updating the menu")
        myAxios.get('/restaurant_sells', {
          params: {
              restaurant: rname
          }
        })
        .then(response => {
          console.log("response from restaurant sells: ", response);
          this.setState({
            restaurantMenu: response.data.result,
            isLoading: false
          })
        })
        .catch(error => {
          console.log(error);
        });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ 
          currentRestaurant: nextProps.restaurant,
          isLoading: true 
      });  
      this.updateMenu(nextProps.restaurant)
    }
    

    render() {
        if (this.state.isLoading) {
            return null// <Loader active/>
          }
          return (
            <Card color='red' style={{maxWidth: 250}}>
              <Card.Content>
                <Card.Header>Menu</Card.Header>
              </Card.Content>
              <Card.Content>
                <Table basic='very' celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Avail.</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.restaurantMenu.map((item) => (
                        <Table.Row key={item[0]}>
                            <Table.Cell>
                                {item[0]}
                            </Table.Cell>
                            <Table.Cell>
                                {item[1]}
                            </Table.Cell>
                            <Table.Cell>
                                {item[2]}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table>
              </Card.Content>
              <Card.Content>
                <OrderMenuModal restaurant={this.state.currentRestaurant} getCreditCardInfo={this.props.getCreditCardInfo} 
                    getLocation={this.props.getLocation} location={this.state.location} 
                        infoList={this.state.infoList} submitHandler={this.updateMenu} submitOrder={this.props.submitOrder}/>
              </Card.Content>
            </Card>
          )
    }
}   

export default MenuForCustomer;