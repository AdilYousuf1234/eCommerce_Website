import React, { Component } from "react";
import Carousel from "./Carousel";
import Kitchenitem from "./kitechen-info";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = localStorage.getItem("user")
        var dataJson = JSON.parse(data)
        const mongoUserData = (<div style={{marginTop:'10%'}}>
            Hi, {dataJson?.name}
        </div>)

        return (
            <div>
                {data && (<h1>{mongoUserData}</h1>)}
                <Kitchenitem />
            </div>
        )
    }
}
