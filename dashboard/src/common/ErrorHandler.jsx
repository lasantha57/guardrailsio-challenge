import React, { Component } from 'react';
import { logError } from '../utils/logger';

class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { errorOccurred: false }
    }

    componentDidCatch(error, info) {
        this.setState({ errorOccurred: true });
        logError(error, info)
    }

    render() {
        return this.state.errorOccurred ? <h1>Something went wrong!</h1> : this.props.children;
    }
}

export default ErrorHandler;
