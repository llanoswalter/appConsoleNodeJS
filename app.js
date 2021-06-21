require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerDB();

    if (tareasDb) {
        //cargar tareas
        tareas.cargarTareasFromArray(tareasDb);
    }

    
    do {
        //imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //imprime la opcion para elegir la opcion deseada
                const desc = await leerInput('Descripción: ');
                //guardo la tarea
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendienteCompletadas(true);
                break;
            case '4':
                tareas.listarPendienteCompletadas(false);
                break;
            case '5':
                const ids= await mostarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id= await listadoTareasBorrar(tareas.listadoArr);
                if(id!== '0'){
                    const ok= await confirmar('¿Estas seguro que deseas borrarlo?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada con éxito!');
                    }
                }
                break;
            default:
                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');

}

main();