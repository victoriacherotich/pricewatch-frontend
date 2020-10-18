import React, { Component } from 'react';
import Slider from './Slider';
// import Categories from './Categories';
import Shops from './Shops';

class Landing extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Slider />
                {/*<Categories />*/}
                
                <Shops />
            </div>
         );
    }
}
 
export default Landing;