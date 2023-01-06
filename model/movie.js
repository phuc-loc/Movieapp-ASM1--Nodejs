const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename), 'data', 'movieList.json' 
);

const getDataFromFile = (cb) => {
    fs.readFile( p, (err, fileContent) => { 
        if (err) {
            cb( [] );
        } else {
            cb( JSON.parse(fileContent) );
        }
    } 
    )
} 
class MovieModel {

    static fetchAll(cb) {
        getDataFromFile(cb);
        // console.log("fetchtAll")
    }

}
module.exports = MovieModel