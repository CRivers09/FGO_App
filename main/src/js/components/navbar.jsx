import React from "react";

import { Link, withRouter } from "react-router-dom";
// import { Context } from "../store/appContext.jsx";

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
            drop: false
		};
    }

    changeDrop() {
        this.setState({ drop: !this.state.drop });
    }

    setMenu() {
        return (
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/ce/">
                            <button type="button" style={{whiteSpace: "normal"}} className="btn my-1 mr-2">
                                {" "}CE Leveling
                            </button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/level/">
                            <button type="button" style={{whiteSpace: "normal"}} className="btn my-1 mr-2">
                                {" "}Servant Leveling
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light d-flex">
                <ul className="nav">
                    <li className="nav-item">
						<Link className="navbar-brand mb-1" to="/">
							fgo-tools
						</Link>
					</li>
                </ul>

                <div className="collapse navbar-collapse">
                    { this.setMenu() }
                </div>

                <button
                    style={{ float: "right" }}
                    className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					onClick={() => this.changeDrop()}>
					<span className="navbar-toggler-icon" />
				</button>
            </nav>
        );
    }
}

export default NavBar;