import React, { Component } from "react";
import {
  Modal,
  Button,
  Form,
  Rating,
  Header,
  Input,
  TextArea,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import store from "../store/store";

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      name: "",
      desc: "",
      modalOpen: this.props.modalOpen
    };
  }
  handleRate = (e, { rating }) => {
    this.setState({ rating: rating });
  };
  handleDesc = e => {
    this.setState({ desc: e.target.value });
  };
  handleName = e => {
    this.setState({ name: e.target.value });
  };
  addUser = e => {
    if (
      this.state.name.length > 0 &&
      this.state.rating !== null &&
      this.state.desc.length > 0
    ) {
      let user = {
        name: this.state.name,
        rating: this.state.rating,
        img: "http://www.fillmurray.com/200/200",
        Description: this.state.desc,
        Likes: [],
        Dislikes: []
      };
      let userData = this.props.userData;
      userData.push(user);
      store.dispatch({
        type: "UPDATE",
        userData: userData
      });
      this.setState({ modalOpen: false });
      store.dispatch({
        type: "MODAL",
        modalOpen: false
      });
      store.dispatch({
        type: "CURRENT_SELECTION",
        currentUser: this.props.userData[this.props.userData.length - 1]
      });
    } else alert("enter details");
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
    store.dispatch({
      type: "MODAL",
      modalOpen: false
    });
  };

  modalTrigger = () => {
    this.setState({ modalOpen: true });
    store.dispatch({
      type: "MODAL",
      modalOpen: true
    });
  };
  render() {
    return (
      <Modal
        trigger={
          <Button
            circular
            icon="add"
            color="blue"
            onClick={this.modalTrigger}
          />
        }
        closeOnEscape={false}
        open={this.state.modalOpen}
      >
        <Modal.Content>
          {/* <Image size="tiny" src={} circular/> */}
          <Icon name="user" size="huge" />
          <Header as="h2">Name</Header>
          <Input
            id="modalName"
            placeholder=""
            size="large"
            onChange={e => this.handleName(e)}
          />
          <Header as="h2">Rating</Header>
          <Rating
            icon="star"
            defaultRating={0}
            maxRating={5}
            onRate={this.handleRate}
          />
          <Header as="h2">Description</Header>
          <Form>
            <TextArea
              placeholder="Add some description"
              rows="2"
              style={{ height: 125 }}
              onChange={e => this.handleDesc(e)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" circular onClick={this.closeModal}>
            Cancel
          </Button>
          <Button color="blue" circular onClick={e => this.addUser(e)}>
            Add User
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(store => {
  return {
    userData: store.userData,
    currentUser: store.currentUser
  };
})(AddUserModal);
