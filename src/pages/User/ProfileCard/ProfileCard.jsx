import defaultProfileImage from "../../../assets/profile.png";

const ProfileCard = ({ user }) => {
  return (
    <div className="card text-center">
      <div className="card-header">
        <img
          className="rounded-circle shadow"
          src={defaultProfileImage}
          width="200"
          height="200"
          alt="Profile image"
        />
      </div>
      <div className="card-body">
        <h3>{user.username}</h3>
      </div>
    </div>
  );
};

export default ProfileCard;
