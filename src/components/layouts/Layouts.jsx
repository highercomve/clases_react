import React from "react"
import Menu from "../menu/Menu"

// This is a HIGHER ORDER COMPONENT
export function FullPageLayout (Component) {
    return (props) => {
        return (
            <div>
                <Menu />
                <Component {...props} />
            </div>
        )
    }
}

export function NoMenuLayout (Component) {
    return (props) => {
        return (
            <div>
                <Component {...props} />
            </div>
        )
    }
}

