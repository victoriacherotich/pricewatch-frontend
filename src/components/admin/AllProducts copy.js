import React from 'react';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Form from '../../reusables/Form';
import Joi from 'joi-browser';
// import DataTable, { createTheme } from 'react-data-table-component';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class AllProducts extends Form {
    state = {
        products: [],
        openaccount: false,
        products_id: null,
        anchorEl: null,
        data: { price: '', product_description: '', category: '' },
        JoannaCount: null,
        CanvasCount: null,
        JoylipsCount: null,
        HuddahCount: null
    }


    schema = {
        price: Joi.string().required().label('Price'),
        product_description: Joi.string().required().label('Description'),
        category: Joi.string().label('Category')
    };

    handleaccountOpen = (e) => {
        const products_id = e.currentTarget.id;
        this.setState({ openaccount: true, products_id });
    };
    handleaccountClose = () => {
        this.setState({ openaccount: false });
    };

    handleClose = () => {
        this.setState({ anchorEl: null })
    };

    handleHuddah = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/huddah/`);
        this.handleAllProducts();
    };

    handleJoylips = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/joylips/`);
        this.handleAllProducts();
    };

    handleCanvas = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/canvas/`);
        this.handleAllProducts();
    };

    handleJoanna = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/joanna/`);
        this.handleAllProducts();
    };

    handleAllProducts = async () => {
        const { data: products } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/allproducts/`);
        this.setState({ products });
    }

    async componentDidMount() {
        const { data: products } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/allproducts/`);
        const { data: JoannaCount } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/productCount/Joanna`);
        const { data: CanvasCount } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/productCount/Canvas`);
        const { data: JoylipsCount } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/productCount/Joylips`);
        const { data: HuddahCount } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/productCount/Huddah`);

        this.setState({ products, JoannaCount, CanvasCount, JoylipsCount, HuddahCount });
    }

    doUpdate = async () => {
        const { data: products } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/allproducts/`);
        this.setState({ products });
    }

    doSubmit = async () => {
        const obj = { ...this.state.data };
        const products_id = this.state.products_id;


        await axios.patch(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/${products_id}`, obj)
            .then((response) => {
                toast(response.data.message);
                this.handleaccountClose();
                this.doUpdate();
            }, (error) => {
                toast('Error! cant add to wishlist');
            });
    };
    handleDelete = async (e) => {
        const products_id = e.currentTarget.id;
        console.log(products_id);
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/${products_id}`)
            .then((response) => {
                toast(response.data.message);
                this.handleaccountClose();
                this.doUpdate();
            }, (error) => {
                toast('Error! cant delete product');
            });
    }

    render() {
        // const {errors} = this.state;

        return (
            <div>
                <ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />

                <ButtonGroup style={{ flex: "100% !important", width: "100%", textAlign: "center" }} color="secondary" size="large" aria-label="large outlined secondary button group" >
                    <Button onClick={this.handleHuddah} style={{ width: "100%" }} variant="outlined" > huddah</Button>
                    <Button onClick={this.handleJoylips} style={{ width: "100%" }} variant="outlined" >joylips</Button>
                    <Button onClick={this.handleCanvas} style={{ width: "100%" }} variant="outlined" > canvas</Button>
                    <Button onClick={this.handleJoanna} style={{ width: "100%" }} variant="outlined" > joanna</Button>
                </ButtonGroup>
                <section className="cart-section spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div class="col-sm-3" style={{ flex: "100% !important", width: "100%", textAlign: "center" }} color="secondary" size="large" aria-label="large outlined secondary button group">
                                    <h3 style={{ width: "100%" }}> Joanna </h3>
                                    <h5>{this.state.JoannaCount}</h5>
                                </div>
                                <div class="col-sm-3">
                                    <h3 style={{ width: "100%" }}> Canvas </h3>
                                    <h5>{this.state.CanvasCount}</h5>
                                </div>
                                <div class="col-sm-3">
                                    <h3 style={{ width: "100%" }}> Joylips </h3>
                                    <h5>{this.state.JoylipsCount}</h5>
                                </div>
                                <div class="col-sm-3">
                                    <h3 style={{ width: "100%" }}> Huddah </h3>


                                    <h5>{this.state.HuddahCount}</h5>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="cart-table">
                                    <h3>Products list</h3>

                                    <div className="cart-table-warp">
                                        <table
                                            id="example1"
                                            className="display nowrap"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>image</th>
                                                    <th>title</th>
                                                    <th>price</th>
                                                    <th>category</th>
                                                    <th>brand</th>
                                                    <th>action</th>
                                                    <th>action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.products.map(product => (
                                                    <tr>
                                                        <td><img alt="asd" src={product.image} style={{ height: "30px" }} /></td>
                                                        <td>{product.title}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.brand}</td>
                                                        <td>
                                                            <ButtonGroup style={{ flex: "100% !important", textAlign: "center" }} color="secondary" size="small" aria-label="large outlined secondary button group" >
                                                                <Button onClick={this.handleaccountOpen} id={product.products_id} variant="outlined" >Edit</Button>
                                                                <Button onClick={this.handleDelete} id={product.products_id} variant="outlined" >Delete</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                        <td>
                                                            <Dialog open={this.state.openaccount} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                                                                <DialogTitle id="alert-dialog-title">{"Account"}</DialogTitle>
                                                                <DialogContent>
                                                                    <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                                                                        <div className="mdl-tabs__panel is-active" id="fullnow">
                                                                            <div style={{ width: "100%" }}>

                                                                                <form onSubmit={this.handleSubmit}>
                                                                                    <TextField name="price" type="number" style={{ width: "100%" }} id="outlined-uncontrolled" label="Provide price" margin="normal" variant="outlined"
                                                                                        value={this.state.data.price}
                                                                                        onChange={this.handleChange}
                                                                                        // error={errors.price} autoFocus 
                                                                                        placeholder="Provide price" />
                                                                                    {/* {errors.price && <span  className="spanform">{errors.price}</span>} */}

                                                                                    <TextField name="product_description" type="text" style={{ width: "100%" }} id="outlined-uncontrolled" label="Provide description" margin="normal" variant="outlined"
                                                                                        value={this.state.data.product_description}
                                                                                        onChange={this.handleChange}
                                                                                        // error={errors.product_description} autoFocus 
                                                                                        placeholder="product description" />
                                                                                    {/* {errors.product_description && <span  className="spanform">{errors.product_description}</span>} */}

                                                                                    <TextField name="category" type="text" style={{ width: "100%" }} id="outlined-uncontrolled" label="Edit category" margin="normal" variant="outlined"
                                                                                        value={this.state.data.category}
                                                                                        onChange={this.handleChange}
                                                                                        // error={errors.category} autoFocus 
                                                                                        placeholder="Edit category" />
                                                                                    {/* {errors.category && <span  className="spanform">{errors.category}</span>} */}

                                                                                    <Button type="submit" variant="outlined" color="primary" >Update</Button>
                                                                                </form>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={this.handleaccountClose} color="primary" autoFocus>
                                                                        Close
    </Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>image</th>
                                                    <th>title</th>
                                                    <th>price</th>
                                                    <th>category</th>
                                                    <th>brand</th>
                                                    <th>action</th>
                                                    <th>action</th>
                                                </tr>
                                            </tfoot>
                                        </table>








                                    </div>
                                    {/* <div className="total-cost">
                                <h6>Total <span>ksh 137.70</span></h6>
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

export default AllProducts;