import { Component } from "react";
import Register from "./Register";

type PassedProps = {
    login: string,
    password: string,
    username: string
}

class Portal extends Component<PassedProps, {}> {

    render(){
        return(
            <>
            <Register />
            </>
        )
    }
}