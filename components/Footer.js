import React from "react";
import { Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Footer = () => {
    return (
        <footer>
            <Message
                floating // Set the message to be floating
                content="Made with ❤️ by Aniket Kini"
                style={{position: "fixed",
                bottom: 0,
                left: "50%",
                textAlign: "center",
                fontWeight: "bold",
                transform: "translateX(-50%)",
                marginBottom: "10px", 
                backgroundColor: "#FFFFFF",
                color: "#333", 
                borderRadius: "15px", 
                border: "1px solid #1DB954"}} // Adjust the top margin as needed
            />
        </footer>
    );
}
    
export default Footer;