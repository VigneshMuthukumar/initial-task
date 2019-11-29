import React, { Component } from "react";
import { Header, Rating, Input, Image } from "semantic-ui-react";
import PeopleJson from "../data/people.json";
import { connect } from "react-redux";
import store from "../store/store";

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: PeopleJson.People[0]
    };
  }
  render() {
    return (
      <div>
        <Image size="tiny" src={this.props.currentUser.img} circular />
        <Header as="h2">Name</Header>
        <Input disabled value={this.props.currentUser.name} size="large" />
        <Header as="h2">Rating</Header>
        <Rating
          icon="star"
          defaultRating={this.props.currentUser.rating}
          maxRating={5}
        />
        <Header as="h2">Description</Header>
        <Input
          disabled
          value={this.props.currentUser.Description}
          size="large"
        />
        <Header as="h2">Likes</Header>
        <Input
          disabled
          value={this.props.currentUser.Likes.toString()}
          rows={3}
          size="large"
          fluid
        />
        <Header as="h2">Dislikes</Header>
        <Input
          disabled
          value={this.props.currentUser.Dislikes.toString()}
          size="large"
          fluid
        />
      </div>
    );
  }
}

export default connect(store => {
  return {
    userData: store.userData,
    currentUser: store.currentUser
  };
})(DetailView);
