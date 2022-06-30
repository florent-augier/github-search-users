import React, { useEffect, useState, useContext } from "react";
import "./User.css";
import { ErrorContext } from "../App";

/**
 * Interface for User's props
 *
 * @interface UserProps -
 */

interface UserProps {
  /** login {string} */ login: string;
  /** id {number} */ id: string;
}

/**
 * Component for handle label and input User.
 *
 * @component  
 * @example
 * const login = florent-augier

 * return (
 *   <User
            login={login}
            avatar_url={avatar_url}
            html_url={html_url}
            public_repos={public_repos}
      />
 * )
 */

export const User: React.FC<UserProps> = ({
  login,
  id,
}): React.ReactElement => {
  const [userInfo, setUserInfo] = useState<
    | undefined
    | {
        login: string;
        name: string;
        html_url: string;
        avatar_url: string;
        following: number;
        followers: number;
        id: string;
        repos: [];
      }
  >(undefined);

  const [userRepos, setUserRepos] = useState<any[]>([]);

  const contextValue: null | any = useContext(ErrorContext);

  useEffect(() => {
    let getUserInfo = fetch(`https://api.github.com/users/${login}`)
      .then((response) => {
        if (response.status === 403) {
          contextValue.toggleError(true);
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });

    let getUserRepos = fetch(`https://api.github.com/users/${login}/repos`)
      .then((response) => {
        if (response.status === 403) {
          contextValue.toggleError(true);
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
    let getAllInfos = async () => {
      const responseGetUserInfo = await getUserInfo.catch((error) => {
        console.log(error);
      });
      const responseGetUserRepos = await getUserRepos.catch((error) =>
        console.log(error)
      );

      return { responseGetUserInfo, responseGetUserRepos };
    };

    getAllInfos()
      .then((response: any) => {
        if (response.status === 403) {
          contextValue.toggleError(true);
        }
        setUserInfo(response.responseGetUserInfo);
        setUserRepos(response.responseGetUserRepos);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userInfo) return <p>Chargement des données</p>;

  return (
    <div className="card" id={id}>
      <div id="avatar-url">
        <img
          src={userInfo?.avatar_url}
          alt={`profil github de ${userInfo.login}`}
          className="avatar"
        />
      </div>
      <div className="user-info">
        <h2>{userInfo?.name ? userInfo.name : userInfo.login}</h2>
        <ul>
          <li>
            {userInfo?.followers}
            <strong>Followers</strong>
          </li>
          <li>
            {userInfo?.following}
            <strong>Following</strong>
          </li>
        </ul>

        <ul id="repos">
          {userRepos &&
            userRepos.length > 0 &&
            userRepos.map((repo: any, i: number) => {
              return (
                <li key={i}>
                  <a href={repo.html_url} target="blank" className="repo-link">
                    {repo.name}
                  </a>
                </li>
              );
            })}
        </ul>
        <ul>
          <li>
            <a href={userInfo?.html_url} target="blank">
              Voir le profil 🚀
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
