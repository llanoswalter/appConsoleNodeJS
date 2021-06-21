const { v4: uuidv4 } = require('uuid');

class Tarea{
    id='';
    descripcion='';
    completadoEn= null;

    constructor(desc){
        this.id= uuidv4();
        this.descripcion= desc;
    }
}

module.exports= Tarea;