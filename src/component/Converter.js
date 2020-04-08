import React, { Component, Fragment } from 'react';
import JSON from '../Common-Currency.json';
import Header from './Header';
import ConvertDisplay from './ConverterDisplay';

class CurrencyConverter extends Component {
    constructor() {
        super()
        this.state = {
            currencyList: JSON
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <ConvertDisplay datalist={this.state.currencyList}></ConvertDisplay>
            </Fragment>
        )


    }
}

export default CurrencyConverter;