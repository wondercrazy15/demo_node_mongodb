import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions,userActions  } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
// import { UserProfileView }  from './../_components/routes/userProfileView';
import Footer from './../_components/pages/footer';
import CustomizedSnackbars from './../_components/pages/CustomizedSnackbars';
// import './../_styles/_css/main.css';
class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
        this.state = {
            isSnackbarOpen: false,
            snackbarMsg:'',
            snackbarType:''
        }
    }
    handleSnackbarClose =() =>{
        this.setState({
            isSnackbarOpen:false
        })
    }
   
    componentWillReceiveProps(){
    
        const { alert , dispatch} = this.props;
        // this.props.dispatch(userActions.getAll());
        if(alert && alert.message){
            const alertType =  alert.type == 'alert-danger' ? 'error': 'success';
            this.setState({
                isSnackbarOpen: true,
                snackbarType:alertType,
                snackbarMsg: alert.message
            },() => {setTimeout(()=> {
                this.setState(()=> ( {
                        isSnackbarOpen: false,
                        snackbarMsg: "",}
                ))
            }, 5000);
            })
            dispatch(alertActions.clear());
        }

    }
    render() {
        const { alert } = this.props;
        const {snackbarMsg, snackbarType, isSnackbarOpen} = this.state;
        return (
            <div>
              {/* <Header /> */}

                            {alert.message &&
                                <div>
                               
                                    <CustomizedSnackbars
                                    isSnackbarOpen={ isSnackbarOpen}
                                    snackbarMsg={snackbarMsg}
                                    handleSnackbarClose={this.handleSnackbarClose}
                                    verticalAlign= "top"
                                    horizontalAlign="right"
                                    snackbarType={snackbarType}
                                    isIconButtonCloseDisplay={true}
                                    />
                                </div>
                            } 
                            
                            <Router history={history}>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                    {/* <Route path="/userProfileView" component={UserProfileView} />
                                     */}
                                  
                                </div>
                            </Router>
                            <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 