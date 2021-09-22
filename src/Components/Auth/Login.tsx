import React, { Component } from 'react';
import APIURL from "../../Utils/Environment"

type PassedProps = {
    email: string
    password: string
    username: string
    emailValid: boolean
    token: string | null
    showLogin: boolean
    toggle() : void
    checkEmail(e:React.ChangeEvent<HTMLInputElement>) : void
    setPassword(e:React.ChangeEvent<HTMLInputElement>) : void
    newToken(newToken: string): void
    logout() : void
   
}
type LoginState = {
    localToken: string
}

class Login extends Component<PassedProps, LoginState> {
    constructor(props:PassedProps){
        super(props)
        this.state = {
            localToken: ""
        }
    }
confirmAndSend = () => {
    this.userLogin()
}

userLogin = () => {
    
    let userData = {
        email: this.props.email,
        password: this.props.password,
    }
 const postLogin = async () => {
        await fetch(`${APIURL}/user/login`, {
            method: "POST",
            headers: new Headers({
                "Content-TYpe": "application/json",
            }),
            body: JSON.stringify(userData)
        })
        .then((res) => res.json())
        .then((data) => {
            let dataToken = data.sessionToken;
            this.props.newToken(dataToken)
            this.setState({
                localToken: dataToken
            })
            console.log(data);
        
        })
    .catch((err) => {
        console.error(err)
    })}
    postLogin()
}

    render(){
        const { checkEmail, setPassword, toggle } = this.props
        return(
            <>
            <fieldset>
            <input id="email" type="email" onChange={(e) =>  checkEmail(e) } />
            <input id="password" type="text" onChange={(e) =>  setPassword(e) }/>
            <input type="submit" onClick={() => this.confirmAndSend()} />
            <input type="submit" onClick={() => toggle()} />
            </fieldset>
            </>
        )
    }
}

export default Login