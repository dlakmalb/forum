import { Component } from 'react';
import '../App.css';

import constant from '../config/constants.json';
import http from '../config/httpService';
import NavBar from "../components/NavBar";

class RegisterUser extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        errors: {},
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value, errors: {} });
    };

    clickRegister = async (event) => {
        event.preventDefault();

        const { email, password, confirmPassword } = this.state;
        const errors = this.validateForm();

        this.setState({ errors });

        if (Object.keys(errors).length) return;

        const url = `${constant.serverSideUrl}/register-user`;
        const requestData = { email, password, confirmPassword };

        const { data } = await http.post(url, requestData);

        if (data.result === 'fail') alert(data.message);

        if (data.result === 'success') {
            this.props.history.replace('/');
        }
    };

    validateForm = () => {
        const errors = {};

        const { email, password, confirmPassword } = this.state;

        if (email.trim() === '') errors.email = 'E-mail is required.';

        if (password.trim() === '') errors.password = 'Password is required.';

        if (password.trim() !== confirmPassword.trim())
            errors.confirmPassword = 'Password is not matched.';

        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email))
            errors.email = 'Invalid e-mail.';

        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{5,}/.test(password))
            errors.password = 'Invalid password.';

        return !Object.keys(errors).length ? {} : errors;
    };

    render() {
        const { errors } = this.state;
        const { email, password, confirmPassword } = errors;

        return (
            <>
            <NavBar brandLink="./" brandName="Home" />
            <form>
                <div className="col-md-4 container login-form">
                    <h1 className="text-center form-group">Register User</h1>
                    <div className="pt-2">
                        <div className="form-group">
                            <label htmlFor="email" className="mb-1">
                                Email
                            </label>
                            <input
                                autoFocus
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your e-mail"
                                onChange={(event) => this.handleChange(event)}
                            />
                            {email && (
                                <div className="alert alert-danger">
                                    {email}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(event) => this.handleChange(event)}
                            />
                            <div className="password-text">
                                Password must have at least 5 characters and
                                contains at least one digit, one uppercase
                                letter and one lower case letter
                            </div>
                            {password && (
                                <div className="alert alert-danger">
                                    {password}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm password"
                                onChange={(event) => this.handleChange(event)}
                            />
                            {confirmPassword && (
                                <div className="alert alert-danger">
                                    {confirmPassword}
                                </div>
                            )}
                        </div>
                        <div className="d-flex justify-content-end mb-2">
                            <button
                                className="btn btn-primary col-6"
                                onClick={this.clickRegister}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            </>
        );
    }
}

export default RegisterUser;
