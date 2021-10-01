import { Component } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    FormGroup,
  } from "reactstrap";
import APIURL from "../../Utils/Environment";



type PassedProps = {
    token: string | null
    entry:  {
        UserId: number;
        createdAt: string;
        description: string;
        entryName: string;
        id: number;
        updatedAt: string;
      }
}

type EditEntryState = {
    modal: boolean
}

class EditEntry extends Component <PassedProps, EditEntryState> {
    constructor(props: PassedProps){
        super(props)
            this.state = {
                modal: false
        }
    }
  
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    editEntryName = () => {
        //fetch to update the name 
    }

    render(){
        const { modal } = this.state
        return(
            <div>
            <Button color="danger" onClick={this.toggle}></Button>
            <Modal isOpen={modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>{this.props.entry.entryName}</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        )
    }
}

export default EditEntry