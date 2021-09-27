import http from 'http'
import fs from 'fs'
import {datosPokemon} from './index.js'

// servidor para el index.html
http.createServer((req, res) => {
    if (req.url == '/'){
        fs.readFile('index.html', 'utf-8', (err, data) => {
            if (err) {console.log(err)}
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'})
            res.end(data)
        })
    }
// servidor para el index.html/pokemones en formato JSON, recordar que el json empieza desde el 0 por lo que el ultimo tiene que ser el 149
    if (req.url == '/pokemones'){
        res.writeHead(200, {'Content-type': 'Application/json'})
        datosPokemon()
        .then((resp) => {
            console.log(resp)
            res.end(JSON.stringify(resp))
        }) 
    }
})
.listen(3000, () => console.log('Puerto 3000 ok'))
