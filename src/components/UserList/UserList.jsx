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

  loadData = async (pageIndex) => {
    const { data } = await loadUsers(pageIndex);
    this.setState({
      page: data,
    });
  };

  render() {
    const { totalPages, page, content } = this.state.page;

    return (
      <div className="card">
        <div className="card-header text-center">
          <h3>Users</h3>
        </div>
        <ul className="list-group list-group-flush">
          {content.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
        <div className="card-footer">
          {page !== 0 && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.loadData(page - 1)}
            >
              &lt; previous
            </button>
          )}
          {totalPages > page + 1 && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.loadData(page + 1)}
            >
              next &gt;
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default UserList;
