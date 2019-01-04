import React from 'react';
import './square.css';

class Square extends React.Component {

    render() {
        return (
            <button onClick={this.props.changeStatus} className="square">
                {this.props.value}
            </button>
        );
    }
}

export default Square;