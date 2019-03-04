import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './../_components/pages/header';
import { userActions } from '../_actions';
import { Container, Row, Col, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter , dateFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {UserProfileView}   from './../_components/routes/userProfileView';
import CustomizedSnackbars from './../_components/pages/CustomizedSnackbars';
import { has } from 'lodash';
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ActiveHeader:'home',
            isSnackbarOpen: false,
            snackbarMsg: '',
            snackbarType: ''
        };

    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }
   
    handleDeleteUser = (id) => {
        return (e) => {
           this.deleteUser(id);
        }   
    }
    handleSnackbarClose = () => {
        this.setState({
            isSnackbarOpen: false
        })
    }
    deleteUser = (id) => {
        const {user} = this.props;
        const loginId = user._id;
        if(id == loginId){
            this.setState({
                isSnackbarOpen: true,
                snackbarMsg: ' Sorry you can not delete login user !',
                snackbarType: 'error'
            },() => {setTimeout(()=> {
                this.setState(()=> ( {
                        isSnackbarOpen: false,
                        snackbarMsg: "",}
                ))
            }, 5000);
            })
        }
        else
        {
            this.props.dispatch(userActions.delete(id));
            this.setState({
                isSnackbarOpen: true,
                snackbarMsg: 'ID No-' + id + ' ' +' Record Deleted',
                snackbarType: 'success'
            },() => {setTimeout(()=> {
                this.setState(()=> ( {
                        isSnackbarOpen: false,
                        snackbarMsg: "",}
                ))
            }, 5000);
            })
        }
      
    }

    ActionFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="d-flex">
                {/* <span className="edit-icon-class"><i  className="glyphicon glyphicon-edit"></i></span> */}
                <span className="delete-icon-class"><i onClick={this.handleDeleteUser(row && row.id)} className="glyphicon glyphicon-trash"></i></span>
            </div>
        );
    }

    profileFormatter = (cell, row, rowIndex, formatExtraData) => {
        const server = 'http://localhost:4000/';
        return (
            <div>
                <img src={server + row.pictures} className="img-responsive img-rounded"></img>
            </div>
        );
    }
     onChangeActiveHeader = (ActiveHeader)=> {
        
        this.setState({
            ActiveHeader
        })
     }

    render() {
     
        const {  users } = this.props;
        const {ActiveHeader} = this.state;

        
         const user =   _.find(users && users.items, { 'id':this.props.user && this.props.user._id, });
        const columns = users && users.items && [
            //     {
            //     dataField: 'id',
            //     text: 'User ID',
            //     sort: true,
            //     filter: textFilter({ caseSensitive: true })
            // },
            {
                dataField: 'firstName',
                text: 'First Name',
                filter: textFilter({ caseSensitive: true })

            }, {
                dataField: 'lastName',
                text: 'Last Name',
                sort: true,
                filter: textFilter({ caseSensitive: true })
            },
            {
                dataField: 'username',
                text: 'Email Address',
                sort: true,
                filter: textFilter({ caseSensitive: true })
            },
            {
                dataField: 'country',
                text: 'Contry',
                sort: true,
                filter: textFilter({ caseSensitive: true })
            },
            {
                dataField: 'region',
                text: 'State',
                sort: true,
                filter: textFilter({ caseSensitive: true })
            },
            {
                dataField: 'bod',
                text: 'Birth Date',
                sort: true,
                filter: dateFilter()
            },
            {
                dataField: 'profile',
                text: 'Profile Picture',
                formatter: this.profileFormatter,
            },
            {
                dataField: 'actoion',
                text: 'Action',
                formatter: this.ActionFormatter,
                formatExtraData: {
                    up: 'glyphicon glyphicon-chevron-up',
                    down: 'glyphicon glyphicon-chevron-down'
                }
            },
        ];
        const options = users && users.items && {
            paginationSize: 4,
            pageStartIndex: 0,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }, {
              text: 'All', value: users && users.items && users.items.length
            }] // A numeric array is also available. the purpose of above example is custom the text
          };
          const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
              Showing { from } to { to } of { size } Results
            </span>
          );
        const CaptionElement = () => <h3 className="boostrap-home-title"> Hi... <p className="userName-title"> {user.firstName + ' ' +user.lastName }</p> Welcome To React Project</h3>;
        // const rowStyle = { backgroundColor: '#c8e6c9' };

        return (
            <div>
                <Header activeTab={ActiveHeader}  isLogin={true} user={user} onChangeActiveHeader={this.onChangeActiveHeader} />
                <div>

                 { ActiveHeader == 'userProfile' ?
                    <Row className="justify-content-md-center">
                        <UserProfileView user={user}/>
                    </Row>
                 :
                    
                    <Row className="justify-content-md-center">
                    
                        <Col md={1} />
                        <Col md={10} className="m-page-footer">
                        {/* <h1>Hi {user && user.firstName}!</h1> */}
                            {users && users.items &&
                                <BootstrapTable
                                    keyField='id'
                                    // remote
                                    data={user && users.items}
                                    columns={columns}
                                    striped
                                    hover
                                    condensed
                                    bordered={false}
                                    noDataIndication="Sorry No Records Found..."
                                    pagination={paginationFactory(options)}
                                    filter={filterFactory()}
                                    caption={<CaptionElement />}
                                // headerClasses="boostrap-header-class"
                                // rowStyle={ rowStyle }
                                />

                            }
                        </Col>
                        <Col md={1} />
                        <Col md={12}>
                            <CustomizedSnackbars
                            isSnackbarOpen={this.state.isSnackbarOpen}
                            snackbarMsg={this.state.snackbarMsg}
                            handleSnackbarClose={this.handleSnackbarClose}
                            verticalAlign="top"
                            horizontalAlign="right"
                            snackbarType={this.state.snackbarType}
                            isIconButtonCloseDisplay={true}
                        />
                        </Col>
                    </Row>
                 }
                   
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };