0x00. Webpack
Front-end
JavaScript
ES6


Resources
Read or watch:

Webpack documentation
Webpack beginner guide
npm-package.json



GENERAL

1. How to setup Webpack for a basic project

Setting up Webpack for a basic project involves several steps to bundle and manage your project's assets effectively. Webpack is a popular build tool commonly used in modern web development to bundle JavaScript, CSS, and other assets. Below is a step-by-step guide on how to set up Webpack for a basic project:

Prerequisites:

Node.js and npm: Make sure you have Node.js and npm installed on your system. You can download them from the official Node.js website: https://nodejs.org/

Initialize your project:
Create a new project folder and navigate to it in your terminal or command prompt.

Initialize npm:
Run the following command to initialize npm in your project folder. This will create a package.json file that will keep track of your project's dependencies.
npm init
Follow the prompts to set up your project's details. You can press Enter to accept the default values for most of the fields.

Install Webpack and other necessary packages:
Next, install Webpack and other required packages. For a basic setup, you'll need webpack, webpack-cli, and webpack-dev-server. Additionally, you'll need babel if you want to transpile modern JavaScript to older versions for better browser compatibility.

npm install webpack webpack-cli webpack-dev-server --save-dev
npm install babel-loader @babel/core @babel/preset-env --save-dev


Create the configuration files:
In the root of your project folder, create a file named webpack.config.js. This file will contain the configuration for Webpack.
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/, // Exclude the node_modules folder
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // Serve content from the dist directory
    open: true, // Open the project in the default browser
  },
};


Create the source files:
Inside your project folder, create a src directory, and inside it, create a file named index.js. This will be the entry point of your application.
// src/index.js
console.log('Hello, Webpack!');


Update the package.json file:
Modify the "scripts" section of your package.json file to include the following commands:
"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack --mode production"
}


Build and run the project:
Open your terminal or command prompt, and run the following command to start the development server:
npm start
This will build your project and start the development server. If everything is set up correctly, you should see the "Hello, Webpack!" message in the browser console when you navigate to http://localhost:8080.

To build the project for production, use the following command:
npm run build
This will create optimized and minified files in the dist folder, ready to be deployed to a production server.




2. Entry points, output, and loaders

In Webpack, "Entry points," "Output," and "Loaders" are essential concepts for configuring the build process. They help Webpack understand how to bundle your assets and what transformations to apply to them. Let's take a closer look at each of these concepts:

Entry Points:
The entry point is the starting point of your application or the main file that Webpack uses to begin the bundling process. It's the file where Webpack starts analyzing your dependencies and building the dependency graph. From the entry point, Webpack traverses the imports and dependencies to bundle all the required assets into one or more output files.

For example, if you have an entry point named index.js, it might look like this:
// index.js
import { greet } from './greeting.js';

greet('Hello, Webpack!');

Output:
The output configuration in Webpack specifies how and where the bundled files should be generated. Typically, you will set an output path and filename for the generated bundle. The output path is a directory where the bundle(s) will be saved, and the filename is the name of the generated bundle file.

In the webpack.config.js, the output configuration looks like this:
// webpack.config.js
const path = require('path');

module.exports = {
  // ... other configurations ...
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
  },
};

In this example, the bundle will be generated as bundle.js in the dist directory.


Loaders:
Loaders in Webpack are transformations that allow you to process and transform files before they are added to the bundle. They are useful for handling different types of files other than JavaScript, like CSS, images, and more. Loaders are defined in the module.rules array within the Webpack configuration.

For instance, if you want to use Babel to transpile modern JavaScript code into older versions for better browser compatibility, you can use the babel-loader:
// webpack.config.js
module.exports = {
  // ... other configurations ...
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/, // Exclude the node_modules folder
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
        },
      },
    ],
  },
};

This configuration tells Webpack to use babel-loader for all .js files and exclude the node_modules folder. The babel-loader will transpile the JavaScript code using Babel's preset configurations specified in a separate .babelrc or babel.config.js file.

Loaders can also be used for other tasks, such as handling CSS, SASS, or images. For example, you might use style-loader and css-loader to handle CSS files:
// webpack.config.js
module.exports = {
  // ... other configurations ...
  module: {
    rules: [
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
    ],
  },
};

The order of loaders matters, as they are applied from right to left. In this case, the css-loader will be executed first to process CSS files, and then the style-loader will add the CSS styles to the DOM.


By understanding and configuring these concepts, you can effectively use Webpack to bundle your project's assets, optimize them for production, and apply various transformations during the build process. As your project grows and requires additional asset handling, you can expand your Webpack configuration by adding more loaders and plugins.



3. How to add plugins

Adding plugins in Webpack allows you to perform a wide range of tasks during the build process, such as optimizing bundles, injecting environment variables, generating HTML files, and more. Plugins extend the functionality of Webpack beyond what loaders can do. To add plugins to your Webpack configuration, follow these steps:

Install the plugin:
First, you need to install the plugin you want to use. For example, if you want to use the HtmlWebpackPlugin to generate an HTML file for your bundle, you can install it using npm:
npm install html-webpack-plugin --save-dev


Import the plugin:
In your webpack.config.js file, import the plugin at the top:
const HtmlWebpackPlugin = require('html-webpack-plugin');


Configure the plugin:
Add an instance of the plugin to the plugins array in your webpack.config.js. You can pass an object with specific configurations to the plugin.

For example, to use HtmlWebpackPlugin to generate an HTML file with a custom template, you can do the following:
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // ... loaders configuration ...
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Specify the template file
      filename: 'index.html', // Output filename (relative to the output.path)
    }),
    // ... other plugins ...
  ],
};

In this example, we're using HtmlWebpackPlugin to generate an HTML file based on the index.html template. The generated index.html will be placed in the dist folder.

Additional Plugins:
Webpack has a rich ecosystem of plugins that cater to various needs. You can explore and install other plugins as needed for your project. For example:

CleanWebpackPlugin: Cleans the output directory (e.g., dist) before each build, so no leftover files remain from previous builds.
MiniCssExtractPlugin: Extracts CSS into separate files during the build process for better performance.
DefinePlugin: Allows you to define global constants/variables that can be accessed within your application.


To use these plugins, follow a similar process as mentioned above: install the plugin, import it in your webpack.config.js, and add an instance of the plugin to the plugins array with appropriate configurations.



4. How to split your code into chunks

Splitting your code into smaller chunks (also known as code splitting) is an important technique in Webpack to improve the performance of your application. Code splitting allows you to break your bundle into smaller pieces, which can be loaded dynamically when needed, reducing the initial load time and optimizing the user experience. Webpack provides multiple ways to achieve code splitting. Here's how to do it:

Entry Points:
The simplest form of code splitting can be achieved using multiple entry points in your webpack.config.js file. Each entry point will generate a separate bundle. For example, you might have an entry point for your main application and another entry point for a specific feature or page.

// webpack.config.js
module.exports = {
  entry: {
    main: './src/index.js', // Main application entry point
    feature: './src/feature.js', // Separate entry point for a feature
  },
  output: {
    filename: '[name].bundle.js', // [name] will be replaced with the entry point name
    // ... other output configurations ...
  },
  // ... other configurations ...
};

In this example, Webpack will generate two bundles: main.bundle.js and feature.bundle.js.


Dynamic Import (Recommended):
Another powerful way to achieve code splitting is by using dynamic import (also known as "dynamic imports" or "import()"). Dynamic import allows you to split your code based on specific conditions, such as user interactions or route changes. It enables you to load modules on-demand, reducing the initial bundle size.

To use dynamic import, you can use the import() function with the await keyword (or .then() for older environments) inside your code:

// app.js
document.getElementById('button').addEventListener('click', async () => {
  const featureModule = await import('./feature.js');
  // Use the imported module here
});

With this approach, the feature.js module will be loaded only when the button is clicked. Webpack will automatically create a separate chunk for the dynamically imported module.


SplitChunksPlugin:
Webpack's SplitChunksPlugin is a powerful built-in plugin that helps you automatically split common dependencies into separate chunks. It identifies common modules used across multiple entry points and extracts them into a shared chunk. This can reduce duplication and make the initial load faster.

The SplitChunksPlugin can be configured in your webpack.config.js:

// webpack.config.js
module.exports = {
  // ... other configurations ...
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

With this configuration, Webpack will create a separate chunk (e.g., vendors.bundle.js) containing common dependencies used in your main application and feature entry points.


Dynamic Imports with React (React.lazy and Suspense):
If you are using React, you can also use React.lazy and React.Suspense for code splitting. React.lazy allows you to import components dynamically, and React.Suspense provides a fallback UI while the component is being loaded.

// app.js
import React, { lazy, Suspense } from 'react';

const FeatureComponent = lazy(() => import('./FeatureComponent'));

function App() {
  return (
    <div>
      {/* Other components */}
      <Suspense fallback={<div>Loading...</div>}>
        <FeatureComponent />
      </Suspense>
    </div>
  );
}

With this approach, FeatureComponent will be loaded on-demand only when it's needed.

Code splitting is a powerful technique that can significantly improve your application's performance. By applying code splitting, you can reduce the initial bundle size and load only the required parts of your application when necessary, leading to a better user experience.



5. How to setup a dev server

To set up a development server in Webpack, you can use webpack-dev-server. It provides a simple development server that serves your project and automatically reloads the browser when changes are made to your code. Here's how to set it up:

Install webpack-dev-server:
First, you need to install webpack-dev-server as a development dependency in your project:

npm install webpack-dev-server --save-dev


Configure webpack.config.js:
Update your existing webpack.config.js to include configurations for webpack-dev-server. Specifically, set the devServer property:

// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
  },
  module: {
    rules: [
      // ... other loaders ...
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // The directory to serve static files from
    open: true, // Automatically open the browser when the server starts
  },
};

In this configuration, contentBase specifies the directory from which the server will serve your static files, and open automatically opens the browser when the server starts.


Add a development script:
Modify the "scripts" section of your package.json file to add a script to start the development server:

"scripts": {
  "start": "webpack serve --mode development"
}


Now, you can start the development server by running the following command:

npm start

Webpack will build your project and start the development server. By default, the server will run on http://localhost:8080/. If you have specified open: true in your webpack.config.js, the browser will automatically open and display your project.


Hot Module Replacement (Optional):
To enable Hot Module Replacement (HMR), which allows you to see changes in your code without a full page reload, you can add the hot option to the devServer configuration:

// webpack.config.js
module.exports = {
  // ... other configurations ...
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    hot: true, // Enable Hot Module Replacement
  },
};

With HMR enabled, the page will update dynamically when you make changes to your code, providing a smoother development experience.

Now you have a dev server set up using webpack-dev-server. It will continuously serve and reload your project during development, making the development process more efficient and enjoyable.



Requirements
All of your code will be executed on Ubuntu 18.04 LTS using Node 12.x.x
Allowed editors: vi, vim, emacs, Visual Studio Code
All of your files should end with a new line
A README.md file at the root of the folder of the project is mandatory