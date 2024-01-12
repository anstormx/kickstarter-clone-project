import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";


const Layout = (props) => {
    return (
        <Container> 
            <Header/>
            { props.children }
        </Container> //adds margins to the webpage
    )

}

export default Layout;