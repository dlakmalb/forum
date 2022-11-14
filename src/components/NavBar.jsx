import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const NavBar = (props) => {
    const { brandLink, brandName, navItems } = props;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary form-group">
            <div className="container-fluid">
                <Link className="navbar-brand" to={brandLink}>
                    {brandName}
                </Link>
                {props.hasOwnProperty('navItems') ? (
                    <div className="navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {navItems.map((item, i) => {
                                return (
                                    <NavLink
                                        key={i}
                                        to={item.link}
                                        activeClassName="active-nav"
                                        className="nav-item nav-link"
                                    >
                                        {item.name}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
            {props.hasOwnProperty('showLogout') ? (
                <div className="navbar-collapse">
                    <div className="navbar-nav">
                        <a
                            className="nav-link"
                            onClick={() => props.history.replace('/')}
                        >
                            Logout
                        </a>
                    </div>
                </div>
            ) : null}
        </nav>
    );
};

export default withRouter(NavBar);
