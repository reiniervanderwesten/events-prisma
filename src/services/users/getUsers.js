import userData from "../../data/users.json" with { type: "json" };

const getUsers = () => {
  return userData.users;
};

export default getUsers;
