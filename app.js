require('colors');

const { inquirerMenu,
    inquirerPause,
    readImput,
    listTaskDelete,
    confirm,
    showListCheckList } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const { saveDb, readDb } = require('./helpers/saveFille');

const main = async () => {
    let opt = ''

    const tasks = new Tasks();
    const taskDb = readDb();
    if (taskDb) {
        tasks.loadTaskFromArray(taskDb);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const desc = await readImput('description:');
                tasks.createTask(desc);
                break;
            case 2:
                tasks.completTaskList();
                break;
            case 3:
                tasks.listPendingCompleted(true);
                break;
            case 4:
                tasks.listPendingCompleted(false);
                break;
            case 5:
                const ids = await showListCheckList(tasks.listArr);
                tasks.toggleComplete(ids);
                break;
            case 6:
                const taksId = await listTaskDelete(tasks.listArr);
                if (taksId !== '0') {
                    const confirmDelate = await confirm('Are you sure you want to delete it?');
                    if (confirmDelate) {
                        tasks.deleteTaskById(taksId);
                        console.log('deleted task');
                    }
                }
                break;
            default:
                break;
        }

        saveDb(tasks.listArr);
        if (opt !== 0) await inquirerPause();
    } while (opt !== 0)

}

main();