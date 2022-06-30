/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import "./GithubUsers.css";
import { User } from "./User";
import { ErrorContext } from "../App";

/**
 * Component for showing github users on changing input state.
 *
 * @component
 * @example
 * return (
 *  <form>
 *    <input type="text" id="search" />
 *    {users.map(user => <User .../>)}
 *  </form>
 * )
 *
 */

export default function GithubUsers(): any {
  /**
   * @typedef {Object} users
   */

  /**
   * @callback setUsers
   * @param {users} state
   * @returns {void}
   */

  const [
    /**
     * @type {users}
     */
    users,
    /**
     * @type {setUsers}
     */
    setUsers,
  ] = useState<any[]>([]);

  const [
    /**
     * @type {users}
     */
    searchText,
    /**
     * @type {setUsers}
     */
    setSearchText,
  ] = useState<string>("");

  const [
    /**
     * @type {loading}
     */
    loading,
    /**
     * @type {setLoading}
     */
    setLoading,
  ] = useState<boolean>(false);

  const contextValue: null | any = useContext(ErrorContext);

  const searchUsers = (text: string) => {
    if (searchText !== "") {
      let response = fetch(
        `https://api.github.com/search/users?q=${searchText}&page=1&per_page=10`
      )
        .then((response) => {
          if (response.status === 403) {
            contextValue.toggleError(true);
          }
          return response.json();
        })
        .catch((error) => {
          console.log(error);
          contextValue.toggleError(true);
        });

      const updateUsers = async () => {
        const r = await response.catch((error) => console.log(error));
        return r;
      };

      updateUsers()
        .then((result) => {
          if (result.status === 403) {
            contextValue.toggleError(true);
          }
          if (result.items.length === 0) {
            setLoading(false);
          } else {
            setUsers(result.items);
          }
        })
        .catch((error) => {
          contextValue.toggleError(true);
        });
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      setLoading(true);
      setUsers([]);
    }
    if (searchText === "") setUsers([]);

    const timeOutId = setTimeout(() => searchUsers(searchText), 500);
    return () => {
      clearTimeout(timeOutId);
      setLoading(false);
    };
  }, [searchText]);

  if (contextValue.isError) {
    return (
      <>
        <p id="error">Error: too many requests</p>
        <button onClick={() => window.location.reload()}>
          Go back to search. Please wait for another search.
        </button>
      </>
    );
  }

  return (
    <div id="github-users">
      <form>
        <label htmlFor="search-text">Search github users:</label>
        <input
          id="search-text"
          type="text"
          name="search-text"
          value={searchText}
          placeholder="some-user"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      {users.length > 0 ? (
        users.map((user, i) => {
          return <User key={i} id={`card-${i + 1}`} login={user.login} />;
        })
      ) : loading ? (
        <div id="loading-spinner"></div>
      ) : (
        <p>Please enter some (good) text</p>
      )}
    </div>
  );
}
