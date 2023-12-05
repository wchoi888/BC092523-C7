// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");
// Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of the Project?",
  },
  {
    type: "input",
    name: "description",
    message: "What is the description of the Project?",
  },
  {
    type: "input",
    name: "installation",
    message: "What is the installation procedure for the Project?",
  },
  {
    type: "input",
    name: "usage",
    message: "What is the usage of the Project?",
  },
  {
    type: "input",
    name: "contributing",
    message: "How does one contribute to the Project?",
  },
  {
    type: "list",
    message: "Which license is the Project covers under?",
    name: "license",
    choices: [
      "Apache License 2.0",
      "GNU General Public License v3.0",
      "MIT License",
      "BSD 2-Clause Simplified License",
      "BSD 3-Clause New or Revised License",
      "Boost Software License 1.0",
      "Creative Commons Zero v1.0 Universal",
      "Eclipse Public License 2.0",
      "GNU Affero General Public License v3.0",
      "GNU General Public License v2.0",
      "GNU Lesser General Public License v2.1",
      "Mozilla Public License 2.0",
      "The Unlicense",
    ],
  },
  {
    type: "input",
    name: "test",
    message: "What is the testing procedure?",
  },
  {
    type: "input",
    name: "github",
    message: "what is your github username?",
  },
  {
    type: "input",
    name: "email",
    message: "what is your email address?",
  },
];

// Create a function to write README file
function writeToFile(fileName, data) {
  let fileContent = `#  ${data.title} \n`;
  fileContent += "## Description \n" + data.description + "\n";
  fileContent +=
    "## Table of Content \n - [Installation](#installation) \n - [Usage](#usage) \n - [Contributing](#contributing) \n - [License](#license) \n - [Testing](#testing) \n - [Questions](#questions) \n";
  fileContent += "## Installation \n" + data.installation + "\n";
  fileContent += "## Usage \n" + data.usage + "\n";
  fileContent += "## Contributing \n" + data.contributing + "\n";
  fileContent +=
    "## License \n" +
    generateMarkdown.renderLicenseBadge(data.license) +
    "\n" +
    generateMarkdown.renderLicenseLink(data.license) +
    "\n";
  fileContent += "## Testing \n" + data.test + "\n";
  fileContent +=
    "## Questions \n" +
    "[github profile](https://github.com/" +
    data.github +
    ") \n";
  fileContent += "\n Please contact me on this email " + data.email;
  fs.writeFile(fileName, fileContent, (err) =>
    err ? console.log(err) : console.log("Success!")
  );
}

// Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((data) => {
    const filename = "README.md";

    writeToFile(filename, data);
  });
}

// Function call to initialize app
init();
