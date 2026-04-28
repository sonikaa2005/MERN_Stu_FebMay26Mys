import React, { Component } from "react";

export class ClasscomponentsBasics extends Component {
    //1. Class extends React.Component
    // sate, lifecycle methods, props, setState()

    render() {
        //render(): Returns JSX describing what to show
        //called whenever components needs to update
        return (
            <>
                <h2>Class Components</h2>
                <p>Class components use render() and support lifecycle methods.</p>
            </>
        )
    }
}