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
- `flex-grow`: The flex-grow property controls how much a flex item will grow relative to the other flex items inside the same flex container. It determines how much of the remaining space in the flex container should be allocated to the item.
- `flex-shrink`: Use flex-shrink to allow elements to shrink if necessary.
- `flex-basis`: Use flex-basis to set the initial size of the element before distributing space.
  Using `flex-1`, the div can expand/shrink depending on the available space

## ImageKit api

- Upload images for free, resize etc

## GEMINIAPI

- Initialize the model in the gemini.js file
- Using `generateContent()` we can send the question to the gem api and handle the response by saving it in a state var
- using state var, display on the chat list,user on the right and response to the left
- For images, convert the file to dataURL before sending to gem api for faster response.

- 2 options to generate text from image, 1. send img to google and wait for ans 2. Reads local file without uploading and responds.(recommended)

## Challenges

1. I was trying to apply `w-full h-full` to every div to make sure it takes the full w&h of parent. Instead use `relative` on the parent div and use `absolute inset-0` on the child div.

- If the child div needs to take up as many space as needed, we can use `flex` on parent div and use `flex-grow` on child div

2. Scrollbar on the dashboard page does not go away inspite of removing h-screen and added `min-h-screen`. Need to figure out
