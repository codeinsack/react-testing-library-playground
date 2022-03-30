import { Component } from "react";
import { loadUsers } from "../../api/apiCalls";

class UserList extends Component {
  state = {
    page: {
      content: [],
      page: 0,
      size: 0,
      totalPages: 0,
    },
  };

  async componentDidMount() {
    const { data } = await loadUsers();
    this.setState({
      page: data,
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-header text-center">
          <h3>Users</h3>
        </div>
        <ul className="list-group list-group-flush">
          {this.state.page.content.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
