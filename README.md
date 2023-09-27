# Breaking Down the Magic: Creating a Personalized JavaScript Bundler

This project serves as a demonstration of a JavaScript bundler created during the React India Workshop titled "**Breaking Down the Magic: Creating a Personalized JavaScript Bundler.**" In this workshop, we explore the core concepts and mechanics behind JavaScript bundlers by building a simplified version.

## Project Structure

The project is organized as follows:

- `src` Directory: This directory contains three JavaScript files:

  - `entry.js`: The entry point of our application.
  - `message.js`: A module that defines a greeting message.
  - `name.js`: A module that defines a name.

- `bundler.js`: This file is located at the root of the project. It's where we will implement the bundler logic during the workshop. The bundler's purpose is to take the code from the src directory and bundle it into a single file that can be easily used in a web application.
- `package.json`: This file includes project metadata and dependencies. It also includes a "**build**" script that runs our bundler script.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/snitin315/bundler-workshop-demo.git
```

2. Navigate to the project directory & install dependencies:

```bash
cd bundler-workshop-demo && npm install
```

3. Build the project using the bundler:

```bash
npm run build
```

This will execute the bundler script defined in package.json, which will bundle the code from the src directory into a single file. The bundled file will be placed in the dist directory (which will be created if it doesn't exist).
