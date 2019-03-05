import React from 'react';
import react_logo from './../../_images/react-logo.png';
import { Link } from 'react-router-dom';
const server = 'http://localhost:4000/';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem, Form, Row, Col } from 'react-bootstrap';
import CustomizedSnackbars from './CustomizedSnackbars';
import BoostrapModal from './modal';
import { userActions } from '../../_actions';
import { connect } from 'react-redux';
import Clock from 'react-live-clock';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLogin: this.props.isLogin || false,
            activeTab: this.props.activeTab || 'login',
            isEditProfile: false,
            show: false,
            submitted: false,
            c_password_err: 'Confirm password is required',
            isProfileAvialble: false,
            isMathPassword: false,
            isSnackbarOpen: false,
            snackbarMsg: '',
            snackbarType: '',
            changePasswordEnabled: false,

        };
    }

    onUserProfileActive = () => {
        this.props.onChangeActiveHeader('userProfile');
    }
    onUserHomeActive = () => {
        this.props.onChangeActiveHeader('home');
    }
    handleClose = () => {
        debugger
        this.setState({ show: false, user: '', changePasswordEnabled: false });
    }
    handleChange = (event) => {

        const { name, value } = event.target;
        var { user } = this.state;
        var propsUser = this.props.user;
        this.setState({
            user: {
                ...user,
                ...propsUser,
                [name]: value
            }
        });
    }


    handleSubmit = (event) => {
        debugger
        event.preventDefault();
        this.setState({ submitted: true });
        const { user, profilePicture } = this.state;
        const { dispatch, alert } = this.props;

        if (user.password && user.c_password) {
            if (user.password == user.c_password) {

                this.setState({
                    isMathPassword: true,
                    isSnackbarOpen: true,
                    isMathPassword: true,
                    snackbarMsg: 'Password Updated SuccessFully.',
                    snackbarType: 'success',
                    user: "",
                    show: false
                }, () => {
                    setTimeout(() => {
                        this.setState(() => ({
                            isSnackbarOpen: false,
                            snackbarMsg: "",
                        }
                        ))
                    }, 5000);
                })
                dispatch(userActions.update(user));
            }
            else {
                this.setState({
                    isMathPassword: false,
                    c_password_err: 'Confirm password are not matched',
                    isSnackbarOpen: true,
                    isMathPassword: true,
                    snackbarMsg: 'Confirm password are not matched',
                    snackbarType: 'error'
                }, () => {
                    setTimeout(() => {
                        this.setState(() => ({
                            isSnackbarOpen: false,
                            snackbarMsg: "",
                        }
                        ))
                    }, 5000);
                })
            }
        }
        else {
            if (show) {
                this.setState({
                    isSnackbarOpen: true,
                    isMathPassword: true,
                    snackbarMsg: 'all fields are required',
                    snackbarType: 'error'
                }, () => {
                    setTimeout(() => {
                        this.setState(() => ({
                            isSnackbarOpen: false,
                            snackbarMsg: "",
                        }
                        ))
                    }, 5000);
                })
            }
        }
    }
    handleShow = () => {
        this.setState({ show: true, changePasswordEnabled: true });
    }
    handleSnackbarClose = () => {
        this.setState({
            isSnackbarOpen: false
        })
    }
    modalBody = () => {
        const { user, submitted, isMathPassword, c_password_err, validOldPassword } = this.state;
        return (
            <Form name="form" onSubmit={this.handleSubmit}>
                {!validOldPassword ?
                    <Row>
                        <Col md={12}>
                            <div className={'form-group' + (submitted &&  !user.password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={user && user.password} onChange={this.handleChange}  />
                                {submitted && !user.password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className={'form-group' + (submitted && user && !user.c_password ? ' has-error' : submitted && !isMathPassword && ' has-error')}>
                                <label htmlFor="c_password">Confirm Password</label>
                                <input type="password" className="form-control" name="c_password" value={user && user.c_password} onChange={this.handleChange} />
                                {submitted && !user.c_password ? <div className="help-block"> {c_password_err}</div> : submitted && !isMathPassword && <div className="help-block">{c_password_err}</div>}
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="form-group m-t-b-10">
                                <button className="btn btn-primary">Change</button>
                                {/* {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            } */}
                                <button type="reset" className="btn btn-default m-l-r-10" onClick={this.handleClose}>Cancle</button>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col md={12}>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                {submitted && !user.password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="form-group">
                                <button className="btn btn-primary" >Apply</button>
                                {/* {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        } */}
                                <button type="button" className="btn btn-default" name="cancle" onClick={this.handleClose}>Cancle</button>
                            </div>
                        </Col>
                    </Row>

                }
            </Form>
        );
    }

    render() {
        debugger
        // <img src={logo_img} height={50} width={50} />
        let { isLogin, activeTab, show, submitted, changePasswordEnabled } = this.state;
        let { user } = this.props;
        const fullName = user && user.firstName + ' ' + user.lastName
        return (
            <div id="header_page">
                <BoostrapModal
                    isOpen={show}
                    handleClose={this.handleClose}
                    modalTitle={'Change Password'}
                    modalBody={this.modalBody()}
                />
                <CustomizedSnackbars
                    isSnackbarOpen={this.state.isSnackbarOpen}
                    snackbarMsg={this.state.snackbarMsg}
                    handleSnackbarClose={this.handleSnackbarClose}
                    verticalAlign="top"
                    horizontalAlign="right"
                    snackbarType={this.state.snackbarType}
                    isIconButtonCloseDisplay={true}
                />
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <img src={react_logo} height={50} width='auto' />
                            <a className="navbar-brand header_title" href="#">
                                React
                            </a>

                        </div>
                        <ul className="nav navbar-nav">
                            {/* <li className="active"><a href="#">Home</a></li>
                            <li><a href="#">Page 1</a></li>
                            <li><a href="#">Page 2</a></li> */}
                            {isLogin && <li><a onClick={this.onUserHomeActive} className={this.props.activeTab == "home" ? " active_header_menu" : ""}><span className="glyphicon glyphicon-home"></span> Home</a></li>}
                        </ul>
                        {isLogin ?
                            <ul className="nav navbar-nav navbar-right header_menu">
                                {/* <li><Link to="/register" className={this.props.activeTab == "ragister" ? " active_header_menu" : ""}><span className="glyphicon glyphicon-user"></span> Sign Up </Link></li> */}

                                <li className="dropdown-bar"><img onClick={this.onUserProfileActive} src={user && server + user.pictures} className="header-user-profile" />
                                    <div className="dropdown-display my-heder-dropdown-display">
                                        <div className="upper-arrow" />
                                        <div onClick={this.onUserProfileActive} className={this.props.activeTab == 'userProfile' ? 'Active-dropdown-menu' : ''} ><span className="glyphicon glyphicon-user" ></span> Edit Profile</div>
                                        <div onClick={this.handleShow}  className={changePasswordEnabled ? 'Active-dropdown-menu' : ''}><span className="glyphicon glyphicon-refresh"></span> Change Password</div>
                                        <div className="dropdown-divider"></div>
                                        <div ><Link to="/login" ><span className="glyphicon glyphicon-off"></span> Logout </Link></div>
                                    </div>
                                </li>
                                <li className="header-clock">
                                <Clock format={'h:mm:ssa'} ticking={true} />
                                </li>

                                {/* <li><a onClick={this.onUserProfileActive} > {fullName}</a></li> */}
                                {/* <li><Link to="/login" ><span className="glyphicon glyphicon-log-in"></span> Logout</Link></li> */}
                            </ul>
                            :
                            <ul className="nav navbar-nav navbar-right header_menu">
                                <li><Link to="/register" className={activeTab == "ragister" ? " active_header_menu" : ""}><span className="glyphicon glyphicon-user"></span> Sign Up </Link></li>
                                <li><Link to="/login" className={activeTab == "login" ? " active_header_menu" : ""}><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                            </ul>
                        }
                    </div>
                </nav>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
    };
}


export default connect(mapStateToProps)(Header);