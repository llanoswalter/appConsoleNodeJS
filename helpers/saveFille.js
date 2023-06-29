const fs = require('fs');

const file = './db/data.json';

const saveDb = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDb = () => {
    if(!fs.existsSync(file)){
        return null;
    }
    const data = JSON.parse( fs.readFileSync(file, {encoding: 'utf-8'}));
    return data
}

module.exports = {saveDb, readDb};