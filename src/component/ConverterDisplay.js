import React, { Component, Fragment } from 'react';
import fx from 'money';

const url = 'https://api.exchangeratesapi.io/latest?base='

class ConvertDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseCurrency: 'USD',
            outputCurrency: 'USD',
            amount: '',
            converted: '',
            rates: '',
            inputText: ''
        }
    }

    handleChangeBase = (event) => {
        this.setState({ baseCurrency: event.target.value })
    }

    handleChangOuput = (event) => {
        this.setState({ outputCurrency: event.target.value })
    }

    handleChangeAmount = (event) => {
        const input = event.target.value.split("  ")[1];
        if (isNaN(input)) {
            alert("Only Numbers are allowed");
            return false;
        }
        if (input === undefined) {
            this.setState({ amount: '', inputText: '' })
        }
        else {
            if (Number.isInteger(Number(input))) {
                this.setState({ amount: (input / 100).toFixed(2), inputText: input })
            }
            else {
                this.setState({ amount: Number(input).toFixed(2), inputText: input })
            }
        }
    }

    handleBlur = (event) => {
        const input = event.target.value.split("  ")[1];
        if (input === undefined) {
            this.setState({ amount: '', inputText: '' })
        }
        else {
            if (Number.isInteger(Number(input))) {
                this.setState({ inputText: (input / 100).toFixed(2) })
            }
            else {
                this.setState({ inputText: Number(input).toFixed(2) })
            }
        }
    }

    onfocus = () => {
        this.setState({ amount: '', inputText: '', converted: '' })
    }

    handleSubmit = () => {
        fx.base = this.state.baseCurrency;
        fx.rates = ''
        fetch(`${url}${fx.base}`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                fx.rates = data.rates;
                var result = fx(parseFloat(this.state.amount)).from(this.state.baseCurrency).to(this.state.outputCurrency)
                this.setState({ converted: result })
            })
    }

    renderbase = ({ datalist }) => {
        if (datalist) {
            return Object.keys(datalist).map((item, index) => {
                return (
                    <option value={datalist[item].code} key={index}>
                        {datalist[item].code}
                    </option>
                )
            })
        }
    }

    render() {
        return (
            <Fragment>
                <label>Base</label>
                <select onChange={this.handleChangeBase} >
                    {this.renderbase(this.props)}
                </select>
                <br /><br />
                <label>Output</label>
                <select onChange={this.handleChangOuput}>
                    {this.renderbase(this.props)}
                </select>
                <br /><br />
                <input id="txtFld" type="text"
                    value={`${this.state.baseCurrency}  ${this.state.inputText}`}
                    onChange={this.handleChangeAmount}
                    onBlur={this.handleBlur}
                    onFocus={this.onfocus} />
                <br /><br />
                <button className="btn btn-success"
                    onClick={this.handleSubmit}>
                    Check Price
                </button>
                <br /><br />
                <br />
                <p>Converted value of {this.state.amount} {this.state.baseCurrency} into {this.state.outputCurrency} is {this.state.converted}</p>
            </Fragment>
        )
    }

}

export default ConvertDisplay;