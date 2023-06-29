const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Create task`
            }, {
                value: 2,
                name: `${'2.'.green} List tasks`
            }, {
                value: 3,
                name: `${'3.'.green} List completed tasks`
            }, {
                value: 4,
                name: `${'4.'.green} List pending tasks`
            }, {
                value: 5,
                name: `${'5.'.green} Complete a task`
            }, {
                value: 6,
                name: `${'6.'.green} Remove/Delete Task`
            }, {
                value: 0,
                name: `${'0.'.green} Quit`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('============================'.yellow);
    console.log('  Please select an option'.yellow);
    console.log('===========================\n'.yellow);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const inquirerPause = async () => {
    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `press ${'Enter'.green} to continue.`
        }
    ])

}

const listTaskDelete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${idx}. ${task.desc}`
        }
    })
    choices.unshift({
        value: '0',
        name:`${'0.'.green} Cancel`
    })
    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'delete task',
            choices,
        }
    ]);

    return id;
}

const showListCheckList = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${idx}. ${task.desc}`,
            checked : (task.completedIn) ? true : false
        }
    })

    const { ids } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices,
        }
    ]);

    return ids;
}

const readImput = async (message) => {
    const { desc } = await inquirer.prompt([
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Enter a value:';
                }
                return true;
            }
        }
    ]);
    return desc;
}

const confirm = async (message) => {
    const { ok } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]);
    return ok;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    readImput,
    listTaskDelete,
    confirm,
    showListCheckList
}