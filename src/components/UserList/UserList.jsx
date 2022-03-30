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
        {this.state.page.content.map((user) => (
          <span key={user.id}>{user.username}</span>
        ))}
      </div>
    );
  }
}

export default UserList;
