# Search github users app

This is a little basic search user app showing how to manage a list of github users throught the power of [React](https://github.com/facebook/create-react-app)

If you want to go to the app directly, go to the [Search Github Users App](https://search-github-users-0.netlify.app).

## Table of contents

1. [Instructions](#instructions)
2. [Approach](#approach)
3. [Code](#code)
4. [Improvements](#improvements)
5. [Conclusion](#conclusion)

### Instructions

Create a search input text where users can type in and get results straight away, without ENTER keypress or submit button required.
Results will list Github users as a list. It is up to you to define which data about Github users is relevant to display.

1. Query against Github Api: GET https://api.github.com/search/users?q={USER}.
2. Try to not add any dependency library on a freshly created
   [create react app](https://github.com/facebook/create-react-app).
3. Don't forget to check against modern ways to make HTTP requests on frontend side.
4. Bonus: manage edge cases (no results, Github api rate limit, user type in quickly and going back and forth on his search)

### Approach

When I write some code with **React**, I think that all `html` things can be component. Just because component can be reusable anytime as we want.

The benefit of React is to be able to manage the state of components very easily.

In addition, the JSX syntax makes it easy to couple HTML and JavaScript code.

In this way we save a lot of time and make our code lighter and more readable.

In the case of Github API, I should test the response of requested url("https://api.github.com/users?q=blablabla") when **q** represente text input to know what it returns.

### Code

In first, I create a simple `<User/>` component with his properties using Typescript @interface to check the props and their types.

The interface

```typescript
interface UserProps {
  /** login {string} */ login: string;
  /** id {number} */ id: string;
}

return <div className="card">...all user infos</div>;
```

In second time, I create `<GithubUsers/>` component with his states to manage array of github users.

```typescript
const [users, setUsers] = useState<any[]>([]);

const [searchText, setSearchText] = useState<string>("");

const [loading, setLoading] = useState<boolean>(false);
```

And, the most important thing is to request Github Api url. To handle query, I create input state. On every change, requests are made and I fetch result to create to set the `users` state with his setter `setUsers`.

When typing, the programm wait for stop typing before returns fetch() Api method. To do this, I subscribe to `searchText` State.

```typescript
useEffect(() => {
  if (searchText !== "") {
    setLoading(true); // return loading when typing
    setUsers([]); // clean the state users
  }
  if (searchText === "") setUsers([]); // clean the state users

  // Handle the typing like debounce
  const timeOutId = setTimeout(() => searchUsers(searchText), 500);
  return () => {
    clearTimeout(timeOutId);
    setLoading(false);
  };
}, [searchText]);
```

In my `<App/>` component, I create a context for request error and print the default render when is error.

```typescript
interface ErrorContextInterface {
  isError: boolean;
  toggleError?: () => void;
}

const defaultState = {
  isError: false,
};

export const ErrorContext =
  createContext<Partial<ErrorContextInterface> | null>(defaultState);
```

Note the `toggleError` function is the calling for handle error.

I return a context provider like this:

```typescript
<ErrorContext.Provider
  value={{
    isError: isError,
    toggleError: toggleError,
  }}
>
  <GithubUsers />
</ErrorContext.Provider>
```

### Improvements

## Conclusion

It's a very good exercise to manage request and his result in React with context and fetch github API.
