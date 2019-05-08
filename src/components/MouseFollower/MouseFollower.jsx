import React, { Component } from 'react'

export default class MouseFollower extends Component {
    state = {
        x: 0,
        y: 0,
    }

    onMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY,
        })
    }

    componentDidMount () {
        document.addEventListener('mousemove', this.onMouseMove)
    }

    componentWillUnmount () {
        document.removeEventListener('mousemove', this.onMouseMove)
    }
    
    render () {
        return (
            <h1>
                Position X: {this.state.x}, Y: {this.state.y}
            </h1>
        )
    }
}

