const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

function managerInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter manager's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Enter manager's employee ID:",
            },
            {
                type: "input",
                name: "email",
                message: "Enter manager's email:",
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Enter manager's office number:",
            },
        ])
        .then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            team.push(manager);
            promptGetTeam();
        });
}

function engineerInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter engineer's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Enter engineer's employee ID:",
            },
            {
                type: "input",
                name: "email",
                message: "Enter engineer's email:",
            },
            {
                type: "input",
                name: "github",
                message: "Enter engineer's GitHub username:",
            },
        ])
        .then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            team.push(engineer);
            promptGetTeam();
        });
}

function internInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter intern's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Enter intern's employee ID:",
            },
            {
                type: "input",
                name: "email",
                message: "Enter intern's email:",
            },
            {
                type: "input",
                name: "school",
                message: "Enter intern's school:",
            },
        ])
        .then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            team.push(intern);
            promptGetTeam();
        });
    }

    function promptGetTeam() {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "memberType",
                    message: "Select a team member to add:",
                    choices: ["Engineer", "Intern", "Finish building your team"],
                },
            ])
            .then((answer) => {
                if (answer.memberType === "Engineer") {
                    engineerInfo();
                } else if (answer.memberType === "Intern") {
                    internInfo();
                } else {
                    
                    const html = render(team);
                    fs.writeFileSync(outputPath, html);
                    console.log("Your team HTML file has been generated!");
                }
            });
    }
    
    
    