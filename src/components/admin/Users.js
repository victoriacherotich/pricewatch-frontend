import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = { 
        users: [],
        userCount:null,
     }
    async componentDidMount() {
        const { data: users } = await axios.get(`${process.env.REACT_APP_API_URL}/api/registration/users/v1/`);
        const { data: userCount } = await axios.get(`${process.env.REACT_APP_API_URL}/api/registration/users/v1/userCount`);

        this.setState({users, userCount});
    }
    

    render() { 
        return ( 
            <div>

        <section className="cart-section spad">
            <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div class="col-sm-3">
                        <h3>
                        users
                        </h3>
                        <h5>{this.state.userCount}</h5>
                    </div>
                    </div> </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="cart-table">
                            <h3>Registered users</h3>
                            <div className="cart-table-warp">





                            <table
                      id="example"
                      className="display nowrap"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                        <th>File</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>County</th>
                        <th>Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.users.map(user => (
                        <tr>
                        <td><img src={user.socket_auth_user_file} alt={user.socket_auth_username}/></td>
                        <td>{user.socket_auth_username}</td>
                        <td>{user.socket_auth_useremail}</td>
                        <td>{user.socket_auth_user_county}</td>
                        <td className="total-col"><h4> {user.socket_auth_user_contact} </h4></td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                        <th>File</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>County</th>
                        <th>Contact</th>
                        </tr>
                      </tfoot>
                    </table>




                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>                
                </div>
         );
    }
}
 
export default Users;