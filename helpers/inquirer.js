const inquirer = require('inquirer');
const Tarea = require('../models/tarea');
require('colors');

// configurando las preguntas del menu
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar una tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];
//armando el menu para mostrar
const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Selecciones una opción  '.green);
    console.log('==========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}
//ponemos en pausa la consola para que no salga del programa
const pausa= async () =>{
    console.log(`\n`);
    return await inquirer.prompt([{type: 'input', name:'enter', message: `presione ${'ENTER'.green} para continuar`}]);

}
//Le pedimos al usuairo que no indique algo hacer como por ejemplo el nombre de una tarea
const leerInput= async(message)=>{
    const question=[
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingresa un valor';
                }
                return true;
            }
        }
    ];
    const {desc}= await inquirer.prompt(question);
    return desc;
}
//listado para menu de borrar tareas
const listadoTareasBorrar= async(tareas= [])=>{
    const choices= tareas.map((tarea, i)=>{
        const idx= `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    });
    choices.unshift({
        value: '0',
        name: `${'0.'.green} ${'Cancelar'}`

    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ];
    const {id} = await inquirer.prompt(preguntas);
    return id;

}
const confirmar= async(message)=>{
    const question=[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ] 
    const {ok} = await inquirer.prompt(question);
    return ok;

}

const mostarListadoChecklist= async(tareas= [])=>{
    const choices= tareas.map((tarea, i)=>{
        const idx= `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn)? true: false
        }
    });
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccionar',
            choices
        }
    ];
    const {ids} = await inquirer.prompt(pregunta);
    return ids;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostarListadoChecklist
}