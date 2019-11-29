import React, { Component } from "react";
import People from "./data/people.json";
import {
  Grid,
  Menu,
  Button,
  Checkbox,
  Header,
  Icon,
  Image
} from "semantic-ui-react";
import SideMenuItem from "./components/SideMenuItem";
import DetailView from "./components/DetailView.js";
import AddUserModal from "./components/AddUserModal.js";
import UserJson from "./data/people.json";
import { connect } from "react-redux";
import store from "./store/store";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      checkAll: false,
      checkedUsers: this.props.userData
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleCheckChange = (e, id) => {
    // e.stopPropagation();
    // e.preventDefault();

    this.state.checked.push(id);
  };

  eraseUser = e => {
    console.log("erase clicked");
    // e.stopPropagation();
    // e.preventDefault();
    if (this.state.checkAll) {
      console.log("in check all");
      store.dispatch({
        type: "UPDATE",
        userData: []
      });
      this.setState({ checked: [], checkAll: false });
    }
    if (!this.state.checkAll && this.state.checked.length > 0) {
      console.log("in check user");
      for (var i = 0; i < this.state.checked.length; i++) {
        console.log(this.state.checked[i]);
        this.state.checkedUsers.splice(this.state.checked[i], 1);
      }
      this.setState({ checked: [] });
      store.dispatch({
        type: "UPDATE",
        userData: this.state.checkedUsers
      });
    } else alert("No users selected");
  };

  eraseAll = e => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({ checkAll: !this.state.checkAll });
    console.log(this.state.checkAll);
  };

  currentClick = (e, id) => {
    console.log(id);
    store.dispatch({
      type: "CURRENT_SELECTION",
      currentUser: this.props.userData[id]
    });
  };

  render() {
    return (
      <div>
        {/* Top Menu with add icon */}
        <Menu>
          <Menu.Item position="right">
            <AddUserModal />
          </Menu.Item>
        </Menu>
        {/* Grid contains two columns */}
        <Grid style={{ minHeight: "100vh", margin: 0 }}>
          <Grid.Column width={3}>
            <Menu
              vertical
              style={{ minHeight: "90vh", margin: 0 }}
              activeIndex={2}
              fluid
            >
              <Menu.Item>
                <Checkbox label="People" onChange={e => this.eraseAll(e)} />
                <Icon
                  name="trash alternate outline"
                  onClick={e => this.eraseUser(e)}
                />
              </Menu.Item>

              {/* <SideMenuItem/> */}
              <div>
                {this.props.userData &&
                  this.props.userData.map((user, id) => {
                    return (
                      <Menu.Item
                        style={{ paddingBottom: "20px" }}
                        name={user.name}
                        key={id}
                        onClick={e => this.currentClick(e, id)}
                      >
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
            </Menu>
          </Grid.Column>
          <Grid.Column width={10}> 
            {this.props.currentUser !== false && <DetailView />}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(store => {
  return {
    userData: store.userData,
    currentUser: store.currentUser
  };
})(App);
