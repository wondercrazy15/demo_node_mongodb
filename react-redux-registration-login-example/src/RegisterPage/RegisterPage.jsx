import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './../_components/pages/header';
import { userActions, alertActions } from '../_actions';
import ImageUploader from 'react-images-upload';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FilePond, registerPlugin } from 'react-filepond';
import DatePicker from 'react-date-picker';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import CustomizedSnackbars from './../_components/pages/CustomizedSnackbars';
import moment from 'moment';
registerPlugin(FilePondPluginImagePreview);

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                c_password: '',
                country: '',
                region: '',
                pictures: '',
                bod: '',
            },
            submitted: false,
            c_password_err: 'Confirm password is required',
            isProfileAvialble: false,
            isMathPassword: false,
            isSnackbarOpen: false,
            snackbarMsg: '',
            snackbarType: ''

        };
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    selectCountry(val) {
        let user = this.state.user;
        user.country = val
        this.setState({ user });
    }

    selectRegion(val) {
        let user = this.state.user;
        user.region = val
        this.setState({ user });
    }

    onDrop = (picture) => {
        let user = this.state.user;
        user.pictures = picture.file.name;

        this.setState({
            user,
            profilePicture: picture.file
        });
    }

    removeFiles = (picture) => {
        let user = this.state.user;
        user.pictures = '';

        this.setState({
            user,
            profilePicture: ''
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    onDateChange = (date) => {
        const { user } = this.state;
        var dateToFormat = date.toLocaleString();
        // user.bod =  moment(dateToFormat).format('MMMM Do YYYY');
        user.bod = moment(dateToFormat).format('MMM DD YYYY');;
        this.setState({
            user
        });
    }
    handleSnackbarClose = () => {
        this.setState({
            isSnackbarOpen: false
        })
    }
    componentWillReceiveProps() {
        const { alert, dispatch } = this.props;


        if (alert && alert.message) {
            const alertType = alert.type == 'alert-danger' ? 'error' : 'success';
            this.setState({
                isSnackbarOpen: true,
                snackbarType: alertType,
                snackbarMsg: alert.message
            }, () => {
                setTimeout(() => {
                    this.setState(() => ({
                        isSnackbarOpen: false,
                        snackbarMsg: "",
                    }
                    ))
                }, 5000);
            })

            dispatch(alertActions.clear());
            if (alert && alert.type !== 'alert-danger') {
                dispatch(userActions.getAll());
            }
        }

    }
    handleSubmit(event) {

        event.preventDefault();
        this.setState({ submitted: true });
        const { user, profilePicture } = this.state;
        let File = new FormData()
        File.append('picture', profilePicture)

        const { dispatch, alert } = this.props;

        this.setState({
            isProfileAvialble: true,
        })

        if (user.firstName && user.lastName && user.username && user.password && user.c_password && user.country && user.region && user.bod && user.pictures) {
            if (user.password == user.c_password) {
                this.setState({
                    isMathPassword: true
                })

                dispatch(userActions.register(user));
                dispatch(userActions.uploadProfile(File));

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

    render() {

        const { registering } = this.props;
        const { user, submitted, isMathPassword, c_password_err } = this.state;
        const { country, region, isProfileAvialble } = this.state;
        return (
            <div>
                <Header activeTab="ragister" isLogin={false} />
                <Container>
                    <CustomizedSnackbars
                        isSnackbarOpen={this.state.isSnackbarOpen}
                        snackbarMsg={this.state.snackbarMsg}
                        handleSnackbarClose={this.handleSnackbarClose}
                        verticalAlign="top"
                        horizontalAlign="right"
                        snackbarType={this.state.snackbarType}
                        isIconButtonCloseDisplay={true}
                    />
                    <Row className="justify-content-md-center">
                        <Col md={4} className="m-page-footer">
                            <h2>Register</h2>
                            <Form name="form" onSubmit={this.handleSubmit}>
                                <Container>
                                    <Row>
                                        <Col md={6}>
                                            <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                                <label htmlFor="firstName">First Name</label>
                                                <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                                {submitted && !user.firstName &&
                                                    <div className="help-block">First Name is required</div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                                                {submitted && !user.lastName &&
                                                    <div className="help-block">Last Name is required</div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                                <label htmlFor="username">Username</label>
                                                <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                                                {submitted && !user.username &&
                                                    <div className="help-block">Username is required</div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                                {submitted && !user.password &&
                                                    <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className={'form-group' + (submitted && !user.c_password ? ' has-error' : submitted && !isMathPassword && ' has-error')}>
                                                <label htmlFor="c_password">Confirm Password</label>
                                                <input type="password" className="form-control" name="c_password" value={user.c_password} onChange={this.handleChange} />
                                                {submitted && !user.c_password ? <div className="help-block"> {c_password_err}</div> : submitted && !isMathPassword && <div className="help-block">{c_password_err}</div>}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className={'form-group' + (submitted && !user.country ? ' has-error' : '')}>
                                                <label htmlFor="country">Country</label>
                                                <CountryDropdown
                                                    value={user.country}
                                                    className="form-control"
                                                    name="country"
                                                    onChange={(val) => this.selectCountry(val)} />
                                                {submitted && !user.country &&
                                                    <div className="help-block">Country is required</div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className={'form-group' + (submitted && !user.region ? ' has-error' : '')}>
                                                <label htmlFor="region">Region</label>
                                                <RegionDropdown
                                                    country={user.country}
                                                    value={user.region}
                                                    className="form-control"
                                                    name="region"
                                                    onChange={(val) => this.selectRegion(val)} />
                                                {submitted && !user.region &&
                                                    <div className="help-block">Region is required</div>
                                                }
                                            </div>
                                        </Col>

                                        <Col md={6}>
                                            <div className={'form-group' + (submitted && !user.bod ? ' has-error' : '')}>
                                                <label htmlFor="bod">Birth Date</label>
                                                <DatePicker
                                                    onChange={this.onDateChange}
                                                    name='bod'
                                                    className={submitted && !user.bod ? ' has-date-error' : ''}
                                                    value={user.bod ? new Date(user.bod) : ''}

                                                />
                                                {submitted && !user.bod &&
                                                    <div className="help-block">Birthdate is required</div>
                                                }
                                            </div>
                                        </Col>

                                        <Col md={12}>
                                            <div >
                                                <label >Profile Picture</label>
                                                {/* <ImageUploader
                                                    withIcon={true}
                                                    buttonText='Choose images'
                                                    onChange={this.onDrop}
                                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                    maxFileSize={5242880}
                                                    buttonText="Please Select Your Profile"
                                                    withPreview={true}
                                                    singleImage={true}
                                                /> */}
                                                <FilePond className={user.pictures ? ' ' : 'has-file-error'} allowMultiple={false} onaddfilestart={this.onDrop} onremovefile={this.removeFiles} instantUpload={false} server="http://localhost:4000/users/uploadProfile" />
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="form-group">
                                                <button className="btn btn-primary">Register</button>
                                                {registering &&
                                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                }
                                                <Link to="/login" className="btn btn-link">Cancel</Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering, } = state.registration;
    const { alert } = state
    return {
        registering,
        alert
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };