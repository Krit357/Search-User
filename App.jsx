import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const getUsers = await fetch(
        "https://randomuser.me/api/?results=20"
      ).then((res) => res.json());
      console.log(getUsers);
      setUsers(getUsers.results);
      setIsLoading(false);
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLocaleLowerCase();
    const location =
      `${user.location.city} ${user.location.country}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      location.includes(search.toLocaleLowerCase())
    );
  });

  return (
    <div className="main-box">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form className="form-box">
            <h2>Live User Filter</h2>
            <p>Search by name and/or location</p>
            <input
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="secondary-box">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <div key={i} className="card">
                  <img src={user.picture.thumbnail} alt="" />
                  <div className="card-detail">
                    <h3>
                      {user.name.title}. {user.name.first}{" "}
                      <span>{user.name.last}</span>
                    </h3>

                    <p>
                      {user.location.city} <span>{user.location.country}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>no results found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
