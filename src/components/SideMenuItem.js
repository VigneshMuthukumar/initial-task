import React, { Component } from "react";
import { Menu, Image, Checkbox } from "semantic-ui-react";
import UserJson from "../data/people.json";
import { connect } from "react-redux";
import store from "../store/store";
import { toRefObject } from "@stardust-ui/react-component-ref";
class SideMenuItem extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  handleCheckChange = (e, id) => {
    console.log(id);
  };
  render() {
    return (
      <div>
        {UserJson.People.map((user, id) => {
          return (
            <Menu.Item style={{ paddingBottom: "20px" }} name={user.name}>
              <Checkbox
                style={{ marginRight: "5px" }}
                id={id}
                onChange={e => this.handleCheckChange(e, id)}
              />
              <Image src={user.img} avatar rounded={true} />
              {user.name}
            </Menu.Item>
          );
        })}
      </div>
    );
  }
}

export default connect(store => {
  return {
    userData: store.userData
  };
})(SideMenuItem);
