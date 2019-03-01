import React from 'react';
import { userActions } from '../../_actions';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FilePond, registerPlugin, } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
import { has } from 'lodash';
import CustomizedSnackbars from './../pages/CustomizedSnackbars';
import moment from 'moment';
import DatePicker from 'react-date-picker';
const server = 'http://localhost:4000/';

import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
} from "react-image-magnifiers";
class UserProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user || '',
            submitted: false,
            isProfileAvialble: true,
            isLoaded: true,
            c_password_err: 'Confirm password is required',
            isMathPassword: false,
            isSnackbarOpen: false,
            snackbarMsg: '',
            snackbarType: ''
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());

        const { user } = this.props;
        const source = server + user.pictures


        this.setState({
            user: this.props.user,
            files: [{
                source: source,
                options: {
                    type: 'local',

                    // mock file information

                }
            }]
        })

    }

    selectCountry(val) {
        let user = this.state.user;
        user.country = val;
        user.region = '';
        this.setState({ user });
    }

    selectRegion(val) {
        let user = this.state.user;
        user.region = val
        this.setState({ user });
    }

    onDrop = (picture) => {
        this.setState({
            isLoaded: false
        })
        let user = this.state.user;
        user.pictures = picture.file.name;

        this.setState({
            isProfileAvialble: false,
            user,
            profilePicture: picture.file
        });

    }
    handleSnackbarClose = () => {
        this.setState({
            isSnackbarOpen: false,
            snackbarMsg: '',
        })

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


    handleSubmit(event) {

        event.preventDefault();
        this.setState({ submitted: true });
        const { user, profilePicture } = this.state;
        let File = new FormData()
        File.append('picture', profilePicture)

        const { dispatch } = this.props;

        this.setState({
            isProfileAvialble: true
        })

        if (user.firstName && user.lastName && user.username && user.bod && user.pictures && user.region && user.country) {
            dispatch(userActions.getAll());
            dispatch(userActions.update(user));
            this.setState({
                isSnackbarOpen: true,
                snackbarMsg: 'Data updated Successfully',
                snackbarType: 'success'
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
        else {
            this.setState({
                isSnackbarOpen: true,
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
        this.props.dispatch(userActions.getAll());
    }


    render() {

        const { registering } = this.props;
        const { submitted, files, user, } = this.state;
        const fullName = user.firstName + ' ' + user.lastName
        const Address = 'From - ' + user.region + ' , ' + user.country;
        const profile = server + user.pictures;
        const email = user.username;
        const bod = user.bod;

        return (
            <div id="profile-page">
                <CustomizedSnackbars
                    isSnackbarOpen={this.state.isSnackbarOpen}
                    snackbarMsg={this.state.snackbarMsg}
                    handleSnackbarClose={this.handleSnackbarClose}
                    verticalAlign="top"
                    horizontalAlign="right"
                    snackbarType={this.state.snackbarType}
                    isIconButtonCloseDisplay={true}
                />
                <div>
                    <Col md={3}>
                        <div className="well well-sm">
                            <div >
                                <div >
                                    <SideBySideMagnifier
                                        imageSrc={profile}
                                        imageAlt="Example"
                                    />
                                    {/* <img src={profile} alt="" class="img-rounded img-responsive profile-image" /> */}
                                </div>
                                <div className="profile-content">
                                    <h4 className="font-heading-style">{fullName}</h4>
                                    <small><cite title={Address}> {Address} <i className="glyphicon glyphicon-map-marker"> </i></cite></small>
                                    <p>
                                        <i className="glyphicon glyphicon-envelope"></i>{email}
                                        <br />
                                        <i className="glyphicon glyphicon-globe"></i><a href="http://www.natrixsoftware.com/">www.natrixsoftware.com</a>
                                        <br />
                                        <i className="glyphicon glyphicon-gift"></i>{bod}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={9}>
                        <Form name="form" onSubmit={this.handleSubmit}>
                            <div>

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
                                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} disabled={true} />
                                        {submitted && !user.username &&
                                            <div className="help-block">Username is required</div>
                                        }
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className={'form-group' + (submitted && !user.bod ? ' has-error' : '')}>
                                        <label htmlFor="password">Birth Date</label>
                                        <DatePicker
                                            onChange={this.onDateChange}
                                            value={user.bod ? new Date(user.bod) : ''}

                                        />
                                        {submitted && !user.bod &&
                                            <div className="help-block">Birthdate is required</div>
                                        }
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className={'form-group' + (submitted && !user.country ? ' has-error' : '')}>
                                        <label htmlFor="password">Country</label>
                                        <CountryDropdown
                                            value={user.country}
                                            className="form-control"
                                            onChange={(val) => this.selectCountry(val)} />
                                        {submitted && !user.country &&
                                            <div className="help-block">Country is required</div>
                                        }
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className={'form-group' + (submitted && !user.region ? ' has-error' : '')}>
                                        <label htmlFor="password">Region</label>
                                        <RegionDropdown
                                            country={user.country}
                                            value={user.region}
                                            className="form-control"
                                            onChange={(val) => this.selectRegion(val)} />
                                        {submitted && !user.region &&
                                            <div className="help-block">Region is required</div>
                                        }
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div >
                                        <label htmlFor="password">Profile Picture</label>
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

                                        <FilePond
                                            ref={ref => this.pond = ref}
                                            files={files}
                                            allowMultiple={false}
                                            onaddfilestart={this.onDrop}
                                            onremovefile={this.removeFiles}
                                            instantUpload={false}
                                            onupdatefiles={(fileItems) => {
                                                this.setState({
                                                    files: fileItems.map(fileItem => fileItem.file)
                                                });
                                            }}
                                            server={
                                                this.state.isLoaded ? {
                                                    load: (uniqueFileId, load, error) => {
                                                        fetch(uniqueFileId)
                                                            .then(res => res.blob())
                                                            .then(load)
                                                            .catch(error)
                                                    },

                                                }
                                                    :
                                                    'http://localhost:4000/users/uploadProfile'
                                            }
                                        >
                                        </FilePond>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <button className="btn btn-primary">save</button>
                                        {registering &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }

                                    </div>
                                </Col>
                            </div>
                        </Form>
                    </Col>
                </div>


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

const connectedHomePage = connect(mapStateToProps)(UserProfileView);
export { connectedHomePage as UserProfileView };
