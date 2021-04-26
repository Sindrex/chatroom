import React, { Component } from 'react';
import { SetupColorStateReciever, SetupColorReciever, SendColorMessage } from '../signalr/PlaceConnection';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './PaintArea.css'

//https://casesandberg.github.io/react-color/

export class PaintArea extends Component {
    static displayName = PaintArea.name;
    state = {
        colors: [
            ['#1DC983', '#1D76C9'],
            ['#C91D32', '#BFC91D']
        ] //hex values
    }

    constructor(props) {
        super(props);
        SetupColorStateReciever((update) => {
            this.setState({
                colors: update
            });
        });
        SetupColorReciever((update) => {
            let newColors = this.state.colors;
            newColors[update.x][update.y] = update.hex;
            this.setState({
                colors: newColors
            });
        });
    }

    render() {
        const colors =
            this.state.colors.map((row, x) => {
                return (
                    <Row key={x} style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    {row.map((color, y) => {
                        return (
                            <Col md="auto" key={y}>
                                <button id="colorsquare"
                                    x={x}
                                    y={y} 
                                    style={{ backgroundColor: color }}
                                    onClick={(e) => this.changeColor(x, y)}
                                />
                            </Col>
                        )
                    })}
                    </Row>
                    
                )
            });

        return (
            <Container id="paintarea" fluid>
                {colors}
            </Container>
        );
    }

    changeColor = (x, y) => {
        let newColors = this.state.colors;
        newColors[x][y] = this.props.color;
        this.setState({
            colors: newColors
        });
        SendColorMessage(this.props.color, x, y)
    }
}
