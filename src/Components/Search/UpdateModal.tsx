import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { isThisTypeNode } from "typescript";

import APIURL from "../../Utils/Environment";
type PassedProps = {
  articles: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  }[];
  token: string | null;
};

type ModalState = {
  modal: boolean;


  article: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  };
  existingEntries: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }[];
  entryId: number;
  data: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: number;
    id: number;
    updatedAt: string;
  };
  id: number;
  entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  };
  selectedEntry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  };
  
  dropDownOpen: boolean;
  entrySelection: number;
};

class UpdateModal extends Component<PassedProps, ModalState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      modal: false,
  
      existingEntries: [],
      article: {
        title: "",
        author: "",
        description: "",
        content: "",
        source: { name: "" },
        publishedAt: "",
      },
      entryId: 0,
      data: {
        UserId: 0,
        createdAt: "",
        description: "",
        entryName: 0,
        id: 0,
        updatedAt: "",
      },
      id: 0,
      entry: {
        UserId: 1,
        createdAt: "",
        description: "",
        entryName: "",
        id: 0,
        updatedAt: "",
      },
      selectedEntry: {
        UserId: 0,
        createdAt: "",
        description: "",
        entryName: "",
        id: 0,
        updatedAt: "",
      },
      
      dropDownOpen: false,
      entrySelection: 0,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  getEntries = async () => {   

    let token = this.props.token ? this.props.token : localStorage.getItem("token")
    try {
      let res = await fetch(`${APIURL}/entry/mine`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
      let data = await res.json();
      console.log(data);
      this.setState({ existingEntries: data, modal: !this.state.modal});
    } catch (err) {
      console.error(err);
    }
  };
  setDropDownOpen = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
    });
  };
  
  getEntryToAddArticles = async (entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }) => {
    this.setState({
      entrySelection: entry.id,
      selectedEntry: entry,
    });
    let token = this.props.token ? this.props.token : localStorage.getItem("token")

    try {
      let res = await fetch(`${APIURL}/entry/${entry.id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
      let data = res.json();
      console.log(data);
    } catch (err) {
      console.error(err,"error happen here");
    }
  };
  updateEntry = async () => {
    //do fetch

//Add the setState and entryData to the next function to close the modal and open the second

    // this.setState({
    //   modal2: !this.state.modal2,
    // });
    // if(this.state.entryName !== ""){
    //     this.setState({
    //         updateEntryName: this.state.entryName
    //     })
    // } else

    // if(this.state.description !== ""){
        
    // }

    // let entryData = {
    //   entryName: this.state.entryName,
    //   description: this.state.description,
    // };
    // id in url will be the state of whatever entry we've selected in the menu from our GET
//     if(this.state.entryName !== "" || this.state.description !== ""){
//     try {
//       let res = await fetch(
//         `${APIURL}/entry/update/${this.state.entrySelection}`,
//         {
//           method: "POST",
//           headers: new Headers({
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${this.props.token}`,
//           }),
//           body: JSON.stringify(entryData),
//         }
//       );
//       let data = await res.json();
//       this.setState({
//         data: data,
//         id: data.data.id,
//       });
//       console.log(data.data.id);
//       console.log(this.state.id);
//     } catch (err) {
//       console.error(err);
//     }
// }
  };

  updateArticlestoEntry = () => {
    this.props.articles.map(async (article) => {
      // this.setState({
      //   article: article,
      // })
      let articleData = {
        title: article.title,
        author: article.author,
        description: article.description,
        content: article.content,
        sourceName: article.source.name,
        publishedAt: article.publishedAt,
      };

      let token = this.props.token ? this.props.token : localStorage.getItem("token")

      try {
        let res = await fetch(`${APIURL}/article/create/${this.state.entrySelection}`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify(articleData),
        });
        let data = await res.json();

        console.log(data);
      } catch (err) {
        console.error(err);
      }
    });

    console.log(this.state.article.source.name);

    this.setState({
      modal: !this.state.modal,
      
    });
  };

//   showName = () => {
//     this.setState({
//       showUpdateEntryName: !this.state.showUpdateEntryName,
//     });
//   };

//   showDescription = () => {
//     this.setState({
//       showUpdateDescription: !this.state.showUpdateDescription,
//     });
//   };

  componentDidMount() {
  
  }

  render() {
    const {} = this.props;
    const {
      modal,     
      dropDownOpen,
      existingEntries,
      selectedEntry,
    } = this.state;
    return (
      <div>
        <Button onClick={this.getEntries}>Update Entry</Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader color='danger'>Title</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Dropdown isOpen={dropDownOpen} toggle={this.setDropDownOpen}>
                <DropdownToggle caret>Choose an Entry</DropdownToggle>
                <DropdownMenu>
                  {this.state.existingEntries.map((entry) => (
                    <DropdownItem
                      key={entry.id}
                      value={entry.entryName}
                      onClick={() => this.getEntryToAddArticles(entry)}
                    >
                      {entry.entryName}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
                {selectedEntry.entryName} <br />
                {selectedEntry.description}
                {/* {this.state.entrySelection > 0
                 ? (
                  <Button onClick={this.setShowInput}>Edit Entry Details</Button>
                ) : (
                  <></>
                )} */}
              </Dropdown>
              
              {/* {showInput === true ? (
                <>
                {selectedEntry.entryName} <br />
                  {" "}
                  <Input
                    type='text'
                    placeholder="Edit Entry Name"
                    value={entryName}
                    onChange={this.updateEntryName}
                  />
                  {selectedEntry.description}<br />
                  <Input
                    type='text'
                    placeholder="Edit Description"
                    value={description}
                    onChange={this.updateDescription}
                  />{" "}
                  <br />
                  <Button>Update Entry Details</Button>
                  <Button>Cancel Changes</Button>
                </>
              ) : (
                <> </>
              )} */}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.updateArticlestoEntry}>
              OK{" "}
            </Button>
          </ModalFooter>
        </Modal>
     
        {/* Second modal triggered by closing of first */}
      </div>
    );
  }
}

export default UpdateModal;
