import React from 'react';
import natrix_logo from './../../_images/natrix_logo.png';
import { Link } from 'react-router-dom';
const server = 'http://localhost:4000/';
import { Navbar,Nav, NavItem, DropdownButton,MenuItem} from 'react-bootstrap';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLogin: this.props.isLogin || false,
            activeTab: this.props.activeTab || 'login',
            isEditProfile: false
        };
    }

    onUserProfileActive = () =>{
         this.props.onChangeActiveHeader('userProfile');
    }
    onUserHomeActive = () => {
        this.props.onChangeActiveHeader('home');
    }

    render() {

        // <img src={logo_img} height={50} width={50} />
        let {isLogin, activeTab} = this.state;
        let {user} = this.props;
        const fullName = user && user.firstName + ' ' + user.lastName
        return (
            <div id="header_page">
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                  
                        <div className="navbar-header">
                        <img src={natrix_logo} height={50} width='auto'  />
                            <a className="navbar-brand header_title" href="#">
                                Natrix Software
                            </a>
                        </div>
                        <ul className="nav navbar-nav">
                            {/* <li className="active"><a href="#">Home</a></li>
                            <li><a href="#">Page 1</a></li>
                            <li><a href="#">Page 2</a></li> */}
                              {isLogin &&  <li><a onClick={this.onUserHomeActive} className={this.props.activeTab == "home" ? " active_header_menu" : ""}><span className="glyphicon glyphicon-home"></span> Home</a></li>}
                        </ul>
                       { isLogin ?
                            <ul className="nav navbar-nav navbar-right header_menu">
                                {/* <li><Link to="/register" className={this.props.activeTab == "ragister" ? " active_header_menu" : ""}><span className="glyphicon glyphicon-user"></span> Sign Up </Link></li> */}
                        
                                <li> <img onClick={this.onUserProfileActive} src={user && server + user.pictures} className="header-user-profile" /></li>
                                <li ><a onClick={this.onUserProfileActive} > {fullName}</a></li>
                                <li><Link to="/login" ><span className="glyphicon glyphicon-log-in"></span> Logout</Link></li>
                            </ul>
                       :
                        <ul className="nav navbar-nav navbar-right header_menu">
                            <li><Link to="/register" className={activeTab =="ragister"? " active_header_menu" :""}><span className="glyphicon glyphicon-user"></span> Sign Up </Link></li>
                            <li><Link to="/login" className={activeTab == "login"? " active_header_menu" :""}><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        </ul>
                       }
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header