import React, { useState, useEffect } from 'react';

export default function MouseFollowerFunctional () {
    const [state, setState] = useState({
        x: 0,
        y: 0,
    })

    const onMouseMove = (event) => setState({
        x: event.clientX,
        y: event.clientY,
    })

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove)
        return () => document.removeEventListener('mousemove', onMouseMove)
    }, []) // Como si fuese el componentDidMount y el componentWillUnmount, si esta lleno es como el componentDidUpdate

    return (
        <h1>
            Position X: {state.x}, Y: {state.y}
        </h1>
    )
}