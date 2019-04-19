import React from "react";

import { Context } from "../store/appContext.jsx";

export class DamageCalc extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            list: null,
            list_select: 0,
            servant_1: null,
            servant_2: null,
            servant_3: null
		};
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/servant/list")
            .then(response => response.json())
            .then(data => {
                let state = this.state;
                state.list = [];
                if (data.length > 0) {
                    data.map(servant => {
                        state.list.push(servant);
                    });
                }
                this.setState({ state });
            })
            .catch(error => console.log(error));
    }

    dropServant() {
        return (
            <select onChange={(e) => this.listServant(e.currentTarget.value)}>
                {
                    this.state.list.map((element, index) => {
                        return (
                            <option key={index} value={index}>{element.name}</option>
                        );
                    })
                }
            </select>
        );
    }

    listServant(index) {
        let state = this.state;
        state.list_select = index;
        this.setState({ state });
    }

    addServant(servant) {
        let state = this.state;
        switch(servant) {
            case 1:
                state.servant_1 = state.list_select;
                break;
            case 2:
                state.servant_2 = state.list_select;
                break;
            case 3:
                state.servant_3 = state.list_select;
                break;
            default: return;
        }
        this.setState({ state });
    }

    deleteServant(servant) {
        let state = this.state;
        switch(servant) {
            case 1:
                state.servant_1 = null;
                break;
            case 2:
                state.servant_2 = null;
                break;
            case 3:
                state.servant_3 = null;
                break;
            default: return;
        }
        this.setState({ state });
    }

    fetchServant(id, place) {
        return (
            <Context.Consumer>
                {({ store, actions }) => {
                    return (
                        actions.fetchFrontlineServant()
                    );
                }}
            </Context.Consumer>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row border-left border-right border-dark">
                    <div className="col-12 mt-2">
                        <h3>Fate/Grand Order Damage Calculation Tool</h3>
                    </div>
                    {
                        this.state.list &&
                        (
                            <div className="col-11 m-2 mx-auto p-2 bg-secondary border border-dark">
                                <div className="row">
                                    <div className="col-2"></div>
                                    <div className="col-8 mx-auto p-2 bg-primary border border-dark">
                                        <div className="row">
                                            <div className="col-4 my-auto text-right">Servant 1: </div>
                                            <div className="col-4 my-auto mr-auto">
                                                {this.dropServant()}
                                            </div>
                                            <div className="col-2 ml-auto text-center">
                                            {
                                                 (this.state.servant_1 == null && (
                                                    <button className="btn btn-sm" onClick={() => this.addServant(1)}>
                                                        <i className="fas fa-plus text-dark"></i>
                                                    </button>
                                                )) || (this.state.servant_1 != null && this.state.servant_2 == null && (
                                                    <button className="btn btn-sm" onClick={() => this.deleteServant(1)}>
                                                        <i className="fas fa-times text-danger"></i>
                                                    </button>
                                                )) || (this.state.servant_1 != null && (
                                                    <button className="btn btn-sm" onClick={() => this.addServant(1)}>
                                                        <i className="fas fa-sync-alt text-warning"></i>
                                                    </button>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2"></div>
                                    {
                                        this.state.servant_1 !=null &&
                                        (
                                            <React.Fragment>
                                                <div className="col-2"></div>
                                                <div className="col-8 mx-auto p-2 bg-primary border border-dark">
                                                    <div className="row">
                                                        <div className="col-4 my-auto text-right">Servant 2: </div>
                                                        <div className="col-4 my-auto mr-auto">
                                                            {this.dropServant()}
                                                        </div>
                                                        <div className="col-2 ml-auto text-center">
                                                        {
                                                            (this.state.servant_2 == null && (
                                                                <button className="btn btn-sm" onClick={() => this.addServant(2)}>
                                                                    <i className="fas fa-plus text-dark"></i>
                                                                </button>
                                                            )) || (this.state.servant_2 != null && this.state.servant_3 == null && (
                                                                <button className="btn btn-sm" onClick={() => this.deleteServant(2)}>
                                                                    <i className="fas fa-times text-danger"></i>
                                                                </button>
                                                            )) || (this.state.servant_2 != null && (
                                                                <button className="btn btn-sm" onClick={() => this.addServant(2)}>
                                                                    <i className="fas fa-sync-alt text-warning"></i>
                                                                </button>
                                                            ))
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-2"></div>
                                            </React.Fragment>
                                        )
                                    }
                                    {
                                        this.state.servant_2 !=null &&
                                        (
                                            <React.Fragment>
                                                <div className="col-2"></div>
                                                <div className="col-8 mx-auto p-2 bg-primary border border-dark">
                                                    <div className="row">
                                                        <div className="col-4 my-auto text-right">Servant 2: </div>
                                                        <div className="col-4 my-auto mr-auto">
                                                            {this.dropServant()}
                                                        </div>
                                                        <div className="col-2 ml-auto text-center">
                                                        {
                                                            (this.state.servant_3 == null && (
                                                                <button className="btn btn-sm" onClick={() => this.addServant(3)}>
                                                                    <i className="fas fa-plus text-dark"></i>
                                                                </button>
                                                            )) || (this.state.servant_3 != null && (
                                                                <button className="btn btn-sm" onClick={() => this.deleteServant(3)}>
                                                                    <i className="fas fa-times text-danger"></i>
                                                                </button>
                                                            ))
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-2"></div>
                                            </React.Fragment>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        this.state.servant_1 != null &&
                        (
                            <div className="col-12">
                                <table className="table table-sm table-striped table-bordered mx-auto" style={{width: "80%"}}>
                                    <caption><h6>Servants</h6></caption>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Servants</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Servant 1</th>
                                            <th scope="row"></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default DamageCalc;