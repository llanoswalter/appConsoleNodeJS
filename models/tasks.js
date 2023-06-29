const Task = require('./task');
const colors = require('colors');

class Tasks {
    _list = {}

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });
        return list;
    };

    loadTaskFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }


    constructor (){
        this._list = {};
    }

    createTask (desc = ''){
        const task = new Task(desc);

        this._list[task.id] = task;
    }

    deleteTaskById (id = '') {
        if(this._list[id]){
            delete this._list[id];
        }
    }

    completTaskList() {
        console.log();
        this.listArr.forEach( (task, index) =>{
            const idx = `${index + 1}`.green;
            const {desc, completedIn } = task;
            const status = (completedIn) ? `completed`.green : `pending`.red; 
            console.log(`${idx}. ${desc} :: ${status}`);
        });
    }

    listPendingCompleted(completed = true) {
        console.log();
        let index = 0;
        this.listArr.forEach( (task, index) =>{
            const {desc, completedIn } = task;
            const status = (completedIn) ? `completed`.green : `pending`.red; 
            if(completed){
                if(completedIn){
                    index += 1;
                    console.log(`${(index + '.').green} ${desc} :: ${completedIn.green}`);
                }
            }else{
                if(!completedIn){
                    index += 1;
                    console.log(`${(index + '.').green} ${desc} :: ${status}`);
                }            }
        });
    }
    toggleComplete(ids = []) {
        ids.forEach(id =>{
            const task = this._list[id];
            if(!task.completedIn){
                task.completedIn = new Date().toISOString();
            }
        })
        this.listArr.forEach(task =>{
            if( !ids.includes(task.id)){
                this._list[task.id].completedIn = null;
            }
        })
    }
}

module.exports = Tasks;