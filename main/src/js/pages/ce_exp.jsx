import React from "react";
// import { Context } from "../store/appContext.jsx";

export class CraftEssenceExperience extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            exp: null,
            form: {
                start: 1,
                exp: 0,
                end: 100
            },
            answer: null
		};
    }
    
    componentDidMount() {
        if(this.state.exp == null) {
            let state = this.state;
            let arr = [100];
            for(let i = 2; i <= 100; i++) {
                arr.push(arr[arr.length - 1] + (i * 100));
            }
            state.exp = arr;
            this.setState(state);
        }
    }

    formChange(form, input) {
        let state = this.state;
        if(form == "start") {
            if((input < 1 || input > 99) && input != "") {
                return;
            }
            state.form.start = input;
        }
        else if(form == "exp") {
            if((input < 0 || input > (this.state.exp[this.state.form.start - 1] - 1)) && input != "") {
                return;
            }
            state.form.exp = input;
        }
        else if(form == "end") {
            if((input < 1 || input > 100) && input != "") {
                return;
            }
            state.form.end = input;
        }
        else return;
        this.setState(state);
    }

    formCalc() {
        let state = this.state;

        if(state.form.end == 1) {
            return;
        }

        state.answer = 0;
        let exp_over = 0;
        if(state.form.exp != 0) {
            exp_over = state.exp[state.form.start - 1] - state.form.exp;
        }

        for(let i = state.form.start; i < state.form.end; i++){
            state.answer += state.exp[i - 1];
        }

        state.answer -= exp_over;
        state.answer = state.answer.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        this.setState(state);
    }

    render() {
        return (
            <div className="container">
                <div className="row border-left border-right border-dark">
                    <div className="col-12 mt-2">
                        <h3>Fate/Grand Order CE Leveling Tool</h3>
                    </div>
                    <div className="col-11 m-2 mx-auto p-2 bg-secondary border border-dark">
                        <div className="row">
                            <div className="col-12">
                                <h5>Enter in Your CE Information</h5>
                            </div>
                            <div className="col-12 col-lg-4">
                                <p style={{textAlign: "center"}}>Starting CE Level: <input type="text" name="start" maxLength="2" size="6" onChange={(e) => {this.formChange(e.currentTarget.name, e.currentTarget.value);}} value={this.state.form.start}/></p>
                            </div>
                            <div className="col-12 col-lg-4">
                                <p style={{textAlign: "center"}}>Remaining EXP: <input type="text" name="exp" maxLength="6" size="6" onChange={(e) => {this.formChange(e.currentTarget.name, e.currentTarget.value);}} value={this.state.form.exp}/></p>
                            </div>
                            <div className="col-12 col-lg-4">
                                <p style={{textAlign: "center"}}>Final CE Level: <input type="text" name="end" maxLength="3" size="6" onChange={(e) => {this.formChange(e.currentTarget.name, e.currentTarget.value);}} value={this.state.form.end}/></p>
                            </div>
                            <div className="col-12">
                                <input type="submit" className="mx-auto" style={{display: "block"}} onClick={() => this.formCalc()}/>
                            </div>
                        </div>
                    </div>

                    {
                        this.state.answer &&
                        (
                            <div className="col-11 m-2 mx-auto p-1 pt-2 bg-light border border-dark">
                                <h4>EXP Needed: {this.state.answer}</h4>
                            </div>
                        )
                    }

                    <div className="col-12">
                        <div className="row mt-3">
                            <div className="col-12 col-lg-6">
                                <table className="table table-sm table-striped table-bordered mx-auto" style={{width: "40%"}}>
                                    <caption><h6>Normal CE EXP Values</h6></caption>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Rarity</th>
                                            <th scope="col">EXP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1 &#x2606;</th>
                                            <td><strong>1,000</strong></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2 &#x2606;</th>
                                            <td><strong>3,000</strong></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3 &#x2606;</th>
                                            <td><strong>6,000</strong></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4 &#x2606;</th>
                                            <td><strong>10,000</strong></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5 &#x2606;</th>
                                            <td><strong>15,000</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 col-lg-6 my-auto">
                                <table className="table table-sm table-striped table-bordered mx-auto" style={{width: "40%"}}>
                                    <caption><h6>CE Experience EXP Values</h6></caption>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Rarity</th>
                                            <th scope="col">EXP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">3 &#x2606;</th>
                                            <td><strong>18,000</strong></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4 &#x2606;</th>
                                            <td><strong>30,000</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-12 mt-2">
                            <table className="table table-sm table-striped table-bordered mx-auto" style={{width: "40%"}}>
                                <caption><h6>CE Levels</h6></caption>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">CE Level</th>
                                        <th scope="col">EXP Needed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.exp &&
                                        (this.state.exp.map((element, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td><strong>{element.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</strong></td>
                                                </tr>
                                            );
                                        }))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CraftEssenceExperience;