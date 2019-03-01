import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }


    render() {
        // <img src={logo_img} height={50} width={50} />
        return (
            <div id="footer">
                <nav className="navbar navbar-default navbar-bottom" role="navigation">
                    <div className="container p-10">
                        <p className="footer_headline ">Powered by natrix software private limited.</p>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Footer