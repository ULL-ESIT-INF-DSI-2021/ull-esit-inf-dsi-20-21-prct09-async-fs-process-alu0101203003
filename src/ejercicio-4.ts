import {spawn} from 'child_process';
import * as yargs from 'yargs';
const chalk=require('chalk')
import * as fs from 'fs';

/**
 * Funcion comprobarRuta.
 * Permite mostrar si una ruta es un directorio o un fichero.
 * @param ruta a evaluar
 */
 function comprobarRuta (ruta :string) {
    if (!existeFichero(ruta)){
      console.log(chalk.red("Error. No existe la ruta indicada"));
    } else {
        console.log(ruta)
        var childCheck = spawn(`[ -d "${ruta}" ] && echo "La ruta ${ruta} es un directorio" || echo "La ruta ${ruta} es un fichero"`, {
            shell: true
        });
        
        childCheck.stdout.pipe(process.stdout)
    }    
  }

  /**
  * Función existeFichero.
  * Permite comprobar si el fichero existe
  * @param ruta del fichero
  */ 
 function existeFichero (ruta :string){
    if (fs.existsSync(`${ruta}`)){
        return true
    } else {
        return false
    }
  }

  /**
 * Comando comprobarRuta.
 * Muestra si una ruta es un directorio o un fichero.
 */
 yargs.command({
    command: 'comprobar',
    describe: 'Muestra si una ruta es un directorio o un fichero',
    builder: {
      ruta: {
        describe: 'Ruta a evaluar',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.ruta === 'string') {
        comprobarRuta(argv.ruta);
  
      } else {
        console.log(chalk.red("Error. Comando mal especificado"));
      }
    },
  });

  yargs.argv;