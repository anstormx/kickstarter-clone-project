import React from "react";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from '../routes'; //allows us to create link tags for navigation 

const Header = () => {
    return (
        <Menu style = {{ marginTop : "30px" }}>
            <Link route='/'>
                        <a className="item">
                         <h2>CrowdCoin</h2>
                        </a>
            </Link>
            <Menu.Menu position="right">
                <Link route='/'>
                        <a className="item">
                         <h4>Campaigns</h4>
                        </a>
                </Link>
                <Link route='/campaigns/new'>
                        <a className="item">
                         <h2>+</h2>
                        </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}
    
export default Header;