import {spawn} from 'child_process';
import * as yargs from 'yargs';
const chalk=require('chalk')
import * as fs from 'fs';

/**
 * Funcion watchNotas.
 * Indica los cambios realizados sobre el directorio de notas de un usuario
 * @param nombre del usuario
 * @param directorio donde se almacenan las notas
 */
function watchNotas (nombre :string, directorio :string) {
    if (!existeDirectorio(directorio,nombre)){
      console.log(chalk.red("Error. El fichero no existe en la ruta indicada"));
    } else {
        var dir = `${directorio}/${nombre}`
        fs.watch(dir, (event, trigger) => {
            if (event == "change"){
                console.log(chalk.white(`Se ha modificado el contenido de la nota ${trigger}`))
            }
            if (event == "rename"){
                if (existeDirectorio(dir,trigger)){
                    console.log(chalk.white(`Se ha añadido la nota ${trigger}`));
                } else {
                    console.log(chalk.white(`Se ha eliminado la nota ${trigger}`));
                }
            }
        });
      
    }
    
}

/**
 * Función existeDirectorio.
 * Permite comprobar si el directorio existe
 * @param ruta del directorio
 */ 
function existeDirectorio (ruta :string, nombre :string){
    if (fs.existsSync(`${ruta}/${nombre}`)){
        return true
    } else {
        return false
    }
}


/**
 * Comando watch.
 * Indica los cambios realizados sobre el directorio de notas de un usuario
 */
 yargs.command({
    command: 'watch',
    describe: 'Indica los cambios realizados sobre el directorio de notas de un usuario',
    builder: {
      ruta: {
        describe: 'Ruta del directorio de notas',
        demandOption: true,
        type: 'string',
      },
      nombre: {
        describe: 'Nombre del usuario',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.ruta === 'string' && typeof argv.nombre === 'string') {
        watchNotas(argv.nombre, argv.ruta);
  
      } else {
        console.log(chalk.red("Error. Comando mal especificado"));
      }
    },
  });

yargs.argv;