import { Component } from "react";
import { loadUsers } from "../../api/apiCalls";
import UserListItem from "../UserListItem/UserListItem";
import Spinner from "../Spinner/Spinner";

class UserList extends Component {
  state = {
    page: {
      content: [],
      page: 0,
      size: 0,
      totalPages: 0,
    },
    pendingApiCall: false,
  };

  async componentDidMount() {
    this.setState({ pendingApiCall: true });
    const { data } = await loadUsers();
    this.setState({
      page: data,
      pendingApiCall: false,
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
    const { pendingApiCall } = this.state;

    return (
      <div className="card">
        <div className="card-header text-center">
          <h3>Users</h3>
        </div>
        <ul className="list-group list-group-flush">
          {content.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
        <div className="card-footer text-center">
          {page !== 0 && !pendingApiCall && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.loadData(page - 1)}
            >
              &lt; previous
            </button>
          )}
          {totalPages > page + 1 && !pendingApiCall && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.loadData(page + 1)}
            >
              next &gt;
            </button>
          )}
          {pendingApiCall && <Spinner />}
        </div>
      </div>
    );
  }
}

export default UserList;
