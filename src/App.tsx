import React, { useEffect, createContext, useState } from "react";
import "./App.css";
import GithubUsers from "./github-users/GithubUsers";

interface ErrorContextInterface {
  isError: boolean;
  toggleError?: () => void;
}

const defaultState = {
  isError: false,
};

export const ErrorContext =
  createContext<Partial<ErrorContextInterface> | null>(defaultState);

function App() {
  const [
    /**
     * @type {isError}
     */
    isError,
    /**
     * @type {setIsError}
     */
    setIsError,
  ] = useState<boolean | undefined>(defaultState.isError);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const toggleError = (errorParam?: boolean) => {
    if (errorParam) {
      setIsError(errorParam);
    } else {
      setIsError(!isError);
    }
  };

  return (
    <div className="App">
      <ErrorContext.Provider
        value={{
          isError: isError,
          toggleError: toggleError,
        }}
      >
        <GithubUsers />
      </ErrorContext.Provider>
    </div>
  );
}

export default App;
