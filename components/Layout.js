import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import NextTopLoader from 'nextjs-toploader';
import Footer from "./Footer";


const Layout = (props) => {
    return (
        <Container> 
            <NextTopLoader
                color="red"
                height={4}
            />
            <Header/>
            { props.children }
            <Footer/>
        </Container> //adds margins to the webpage
    )

}

export default Layout;