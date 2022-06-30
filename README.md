# Search github users app

This is a little basic search user app showing how to manage a list of github users throught the power of [React](https://github.com/facebook/create-react-app)

If you want to go to the app directly, go to the [Search Github Users App]().

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

### Code

In first, I create a simple user component with his properties using Typescript @interface to check the props and their types.

The interface

```javascript
interface UserProps {
  label: string;
  defaultChecked?: boolean;
  checked: boolean;
  toggleStateInput(myKey: number): void;
  myKey: number;
  children?: JSX.Element | JSX.Element[];
}

### Improvements

I can optimize tha accessibilty by manage focus input state.
The app can be splitted more and more. Like `<Input />, <Label/> and their text with <Text /> custom component.`

It is not my choice. But if the app grow, I must create litte reusable components.

## Conclusion

It's a very good exercise to manage state in React and it's fun to do this.
