import React, { Component } from 'react';
import APIURL from "../../Utils/Environment"


type RegisterProps = {}
type RegisterClass = {
    username: string, 
    email: string, 
    password: string,
    emailValid: boolean 
}

class Register extends Component<RegisterProps, RegisterClass> {
    constructor(props: RegisterProps){
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "", 
            emailValid: false
        }
    }

    userRegister = () => {
        console.log('userRegister function called');

        let userName = (document.getElementById('username') as HTMLInputElement).value
        let userEmail = (document.getElementById('email') as HTMLInputElement).value
        let userPass = (document.getElementById('password') as HTMLInputElement).value
         

        let newUserData = {
            username: userName,
            email: userEmail, 
            password: userPass,

                }
                console.log(`newUserData --> ${newUserData.username} ${newUserData.email} ${newUserData.password}`)
                    fetch(`${APIURL}/user/register`, {
                        method: 'POST',
                        headers: new Headers ({
                            'Content-Type' : 'application/json'
                        }),
                        body: JSON.stringify(newUserData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => {
                        console.error(err)
                    })
        }

        checkEmail = (e:React.ChangeEvent<HTMLInputElement> ) => {
            this.setState({
                email: e.target.value
            })

            if (e.target.value.includes('@') && e.target.value.includes('.')){
                this.setState({
                    emailValid: true
                }) 
            } 
        }
        
        render() {
            const { email, username, password } = this.state
        return(
            <>
            <fieldset>
            <input id="email" type="email" onChange={(e) => { this.checkEmail(e) }} /></fieldset>
            </>
        )
    }

    }

    export default Register