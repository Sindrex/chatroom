import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

import './ColorPicker.css'

export class ColorPicker extends Component {
    static displayName = ColorPicker.name;
    state = {
        color: '#000000'
    }

    render() {
        return (
            <div id="colorpickerdiv">
                <SketchPicker
                    color={this.state.color}
                    onChange={this.handleChange}
                    onChangeComplete={this.handleChangeComplete}
                />
            </div>
        );
    }

    handleChange = (color) => {
        this.setState({ color: color.hex });
        //this.props.handleChange(color);
    };

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
        this.props.handleChange(color);
    };
}
