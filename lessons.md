## Pages

- Home page --> dashboard
- Chat list --> single chat
- login
- register

- Since navbar is constant throughout the app, use a layout component and add outlet to add other routes a child componentss

## Clerk

- USe client side helpers from documentation to add authentication to the app
- To add protected routes to all pages, `useAuth` method will be helpful

## CSS

- `min-h-screen` : This ensures that the section always takes at least the height of the viewport, which prevents the unnecessary scrollbar while keeping the layout responsive.

## Challenges

1. I was trying to apply `w-full h-full` to every div to make sure it takes the full w&h of parent. Instead use `relative` on the parent div and use `absolute inset-0` on the child div.

2. If the child div needs to take up as many space as needed, we can use `flex` on parent div and use `flex-grow` on child div
