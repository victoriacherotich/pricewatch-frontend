import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

class Orderes extends Component {
  state = {
    carts: []
  };
  async componentDidMount() {
    // const public_id = 0;
    const { data: carts } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cart/v1/`
      
    );
    this.setState({ carts });
  }
  doUpdate = async e => {
    const { data: carts } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cart/v1/`
    );
    this.setState({ carts });
  };
  handleProcess = async e => {
    const cart_id = e.currentTarget.id;

    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/cart/v1/processedtrue/${cart_id}`
      )
      .then(
        response => {
          console.log(response.data.message);
          this.doUpdate();
        },
        error => {
          console.log("Error! cant remove quantity");
        }
      );
  };
  render() {
    return (
      <div>
        <section className="cart-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-table">
                  <h3>Customer orders</h3>
                  <div className="cart-table-warp">


                  




                  <table
                      id="example"
                      className=" "
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                        <th>name</th>
                            <th>contact</th>
                            <th>file</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>time</th>
                            <th>title</th>
                            <th>image</th>
                            <th>brand</th>
                            <th>category</th>
                            <th>Retained</th>
                            <th>Sent</th>
                            <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {

                        
                          
                          this.state.carts.map(
                          (cart, key) => 

                          

                          
                            <tr>
                              <td>{cart.socket_auth_username}</td>
                              <td>{cart.brand}</td>
                              <td><img alt="asd" src={cart.socket_auth_user_file} style={{height:"30px",width:"30px"}} /></td>
                              <td>{cart.quantity}</td>
                              <td>{cart.total_price}</td>
                              <td>{cart.time_added_to_cart}</td>
                              <td>{cart.title}</td>
                              <td><img alt="asd" src={cart.image} style={{height:"30px",width:"30px"}} /></td>
                              <td>{cart.brand}</td>
                              <td>{cart.category}</td>
                              <th>{(cart.total_price/100 )* 20}</th>
                              <th>{(cart.total_price/100 )* 80}</th>
                              <th>
                              <Button
                                    onClick={this.handleProcess}
                                    id={cart.cart_id}
                                    variant="outlined"
                                  >
                                    Done
                                  </Button>
                              </th>
                            </tr>
                          
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                        <th>name</th>
                            <th>contact</th>
                            <th>file</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>time</th>
                            <th>title</th>
                            <th>image</th>
                            <th>brand</th>
                            <th>category</th>
                            <th>Retained</th>
                            <th>Sent</th>
                            <th>action</th>
                        </tr>
                      </tfoot>
                    </table>





                  </div>
                  {/* <div className="total-cost">
                    <h6>
                      Total <span>ksh 137.70</span>
                    </h6>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Orderes;
