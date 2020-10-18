import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {MyCredentials} from '../../protect/Protected.Route';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, Slider } from '@material-ui/core';
import PriceSlider from '@material-ui/core/Slider';
import Joi from 'joi-browser';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
class Products extends Component {
    state = { 
        data: { min: '', max: '' },
        products: [],
        brands: [],
        categories: [],
        search: '',
        open: false,
        singleProduct: [],
        productCompare: []
     };

     schema = {
        min: Joi.string().required().min(5).email().label('min'),
        max: Joi.string().required().min(8).label('max')
    };

     handleClose = () => {
        this.setState({open: false});
     };

     handleOpen = async (e) => {
        this.setState({open: true});
        const products_id = e.currentTarget.value;
        const brand = e.currentTarget.id;
        const category = e.currentTarget.name;


        const { data: singleProduct } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/singleProducts/${products_id}`);
        const { data: productCompare } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/compareProduct/${brand}/${category}`);
        this.setState({singleProduct, productCompare}); 
        console.log(productCompare)
    };

    async componentDidMount() {
        const { data: products } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/allproducts/`);
        const { data: brands } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/allbrands/`);
        const { data: categories } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/allcategories/`);
        this.setState({products, brands, categories});
    }

     handleAddToWishlist = async (event) => {
        const products_id = event.currentTarget.value;
        console.log(products_id)
        const public_id = MyCredentials().socket_auth_users_public_id;
        console.log(public_id)

        await axios.post(`${process.env.REACT_APP_API_URL}/api/favourites/v1/`, {products_id, public_id} )
        .then((response) => {
            toast(response.data.message);
        }, (error) => {
            toast('Error! cant add to wishlist');
        });
        
    }

    handleAddCart = async (event) => {
        const products_id = event.currentTarget.id;
        const price = event.currentTarget.value;
        const public_id = MyCredentials().socket_auth_users_public_id;

        await axios.post(`${process.env.REACT_APP_API_URL}/api/cart/v1/`, {public_id, products_id, price} )
        .then((response) => {
            toast(response.data.message);
        }, (error) => {
            toast('Error! cant add to cart');
        });

    }

    
     filterByCategory = async(e) => {
        const category = e.currentTarget.id;
        console.log(category)
        const { data: products } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/specificcategories/${category}`);
        this.setState({products});
        };
        filterByBrand = async(e) => {
            const brand = e.currentTarget.id;
            console.log(brand)
            const { data: products } = await axios.get(`${process.env.REACT_APP_API_URL}/api/productCrawler/v1/specificbrands/${brand}`);
            this.setState({products});
            };

            updateSearch = (e) => {
                this.setState({ search: e.currentTarget.value.substr(0,20) })
            }
    render() { 
      
        let filterProducts = this.state.products.filter(
            (product) => {
                return product.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
             
        return ( 
            <div>
            <ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />

            <div className="page-top-info row">
            <div className="container col-xl-6 col-lg-5">
                <h4>Category Page</h4>
                <div className="site-pagination">
                    <Link to={'/'}>Home</Link> /
                    <Link to={'/'}>Shop</Link> /
                </div>
            </div>
            <div className="col-xl-6 col-lg-5">
                <form className="header-search-form">
                    <input type="text" placeholder="Search and compare ...."
                    onChange={this.updateSearch}
                    value={this.state.search} />
                    <button><i className="flaticon-search"></i></button>
                </form>
            </div>
        </div>
            <section className="category-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 order-2 order-lg-1">
                        <div className="filter-widget">
                            <h2 className="fw-title">Brand</h2>
                            <ul className="category-menu">
                            {this.state.brands.map(brand => (
                                <li><Link onClick={this.filterByBrand} id={brand.brand}>{brand.brand} </Link></li>
                            ))}
                                
                            </ul>
                        </div>
                        <hr />
                        <PriceSlider 
                        oh
                        defaultValue={5000} 
                        aerial-labeledby="discrete-slider-always"
                        step={10} />

                        <div className="filter-widget">
                            <h2 className="fw-title">Categories</h2>
                            <ul className="category-menu">
                                {this.state.categories.map(category => (
                                    <li><Link onClick={this.filterByCategory} id={category.category}>{category.category} </Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>



                    <div className="col-lg-9 order-2 order-lg-1">
                    <section className="product-filter-section">
<div className="container">


<div className="row">

{filterProducts.map(product => (
    <div className="col-lg-4 col-sm-6" key={product.products_id}>
    <div className="product-item">
    <div className="pi-pic">
    <img src={product.image} alt={product.title}/>
    <div className="pi-links">
    <button onClick={this.handleOpen} 
    value={product.products_id}
    id={product.brand}
    name={product.category}
     className="wishlist-btn"><i class="fa fa-eye" aria-hidden="true"></i>
     </button>

    <button href onClick={this.handleAddToWishlist} value={product.products_id} className="wishlist-btn"><i className="flaticon-heart"></i></button>
    <button onClick={this.handleAddCart} id={product.products_id} value={product.price} className="add-card"><i class="fa fa-shopping-cart" aria-hidden="true"></i><span>Add to cart</span></button>
    </div>
    </div>
    <div className="pi-text">
    <h6>KES {product.price}</h6>
    <p>{product.title}</p>
    </div>
    </div>
    </div>
))}



</div>
</div>
</section>
</div>


</div>
</div>

</section>            
<Dialog open={this.state.open} onClose={this.handleClose} 
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">Compare</DialogTitle>
    <DialogContent>
        <DialogContent>
        {this.state.singleProduct.map(sproduct => (
        <div className="row">
            <div classRow="col-sm-6">
                <div>
                <img src={sproduct.image} alt={sproduct.title} style={{height:"200px",borderRadius:"20px"}}/>
                </div>
            </div>
            <div classRow="col-sm-6" style={{paddingLeft:"10%"}}>
                {sproduct.title}<br />
              
                {sproduct.price}<br />
                <button onClick={this.handleAddCart} id={sproduct.products_id} value={sproduct.price}  className="add-card"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>ADD TO CART</span></button>

            </div>
        </div>
        ))}
        <div className="row" style={{marginTop:"5%"}}>
            {this.state.productCompare.map(pCompare => (
                <div classRow="col-sm-3" style={{paddingLeft:"5%"}}>
                <button onClick={this.handleOpen} 
            value={pCompare.products_id}
            id={pCompare.brand}
            name={pCompare.category}
             className="wishlist-btn"> 
                    <div>
                    <img src={pCompare.image} alt={pCompare.title} style={{height:"100px",borderRadius:"10px"}}/><br />
                    {pCompare.price}
                    </div>
                 </button>
                </div>
            ))}
        </div>
        </DialogContent>
    </DialogContent>
</Dialog>
</div>
         );
    }
}
 
export default Products;