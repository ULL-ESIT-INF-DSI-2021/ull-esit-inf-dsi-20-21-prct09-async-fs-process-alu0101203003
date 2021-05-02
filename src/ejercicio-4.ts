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
    if (!existeRuta(ruta)){
      console.log(chalk.red("Error. No existe la ruta indicada"));
    } else {
        var childCheck = spawn(`[ -d "${ruta}" ] && echo "La ruta ${ruta} es un directorio" || echo "La ruta ${ruta} es un fichero"`, {
            shell: true
        });
        
        childCheck.stdout.pipe(process.stdout)
    }    
  }

/**
 * Funcion crearDirectorio.
 * Permite crear un nuevo directorio en la ruta indicada.
 * @param ruta destino
 * @param nombreDir nombre del directorio
 */
 function crearDirectorio (ruta :string, nombreDir :string) {
    if (!existeRuta(ruta)){
        console.log(chalk.red("Error. La ruta especificada no existe"));
    }
    if (existeDirectorio(ruta, nombreDir)){
      console.log(chalk.red("Error. Ya existe un directorio con ese nombre en esa ruta"));
    } else {
        fs.mkdir(`${ruta}/${nombreDir}`,() => {
            console.log(chalk.green(`Directorio ${nombreDir} creado con éxito`));
        });
    }  
  }

/**
 * Funcion mostrarFicheros.
 * Permite mostrar los ficheros del directorio en la ruta indicada.
 * @param ruta del directorio
 */
 function mostrarFicheros (directorio :string) {
    if (!existeRuta(directorio)){
        console.log(chalk.red("Error. La ruta especificada no existe"));
    } else {
        var childLs = spawn('sh', [`-c`,`ls ${directorio}`]);
        
        childLs.stdout.pipe(process.stdout)
    }  
  }

/**
 * Funcion mostrarContenido.
 * Permite el contenido de un fichero de texto.
 * @param ruta del directorio
 */
 function mostrarContenido (fichero :string) {
    if (!existeRuta(fichero)){
        console.log(chalk.red("Error. El fichero especificado no existe"));
    } else {
        var childCat = spawn('cat', [`${fichero}`]);
        
        childCat.stdout.pipe(process.stdout)
    }
  }

/**
 * Funcion borrarArchivos.
 * Permite borrar ficheros y directorios
 * @param ruta archivo
 */
 function borrarArchivos (ruta :string) {
    if (!existeRuta(ruta)){
        console.log(chalk.red("Error. La ruta especificada no existe"));
    } else {
        var childRm = spawn('sh', [`-c`,`rm -rf ${ruta}`]);
        
        childRm.on('close', () => {
            console.log(chalk.green(`Archivo en la ruta ${ruta} borrado con éxito`));
        });
    }  
  }

  /**
  * Función existeRuta.
  * Permite comprobar si la ruta existe
  * @param ruta a comprobar
  */ 
 function existeRuta (ruta :string){
    if (fs.existsSync(`${ruta}`)){
        return true
    } else {
        return false
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
 * Comando comprobar.
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

/**
 * Comando mkdir.
 * Crea un nuevo directorio en la ruta indicada
 */
 yargs.command({
    command: 'mkdir',
    describe: 'Crea un nuevo directorio en la ruta indicada',
    builder: {
      ruta: {
        describe: 'Ruta donde crear el directorio',
        demandOption: true,
        type: 'string',
      },
      nombre: {
        describe: 'Nombre del directorio a crear',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.ruta === 'string' && typeof argv.nombre === 'string' ) {
        crearDirectorio(argv.ruta, argv.nombre);
  
      } else {
        console.log(chalk.red("Error. Comando mal especificado"));
      }
    },
  });

/**
 * Comando ls.
 * Muestra los ficheros del directorio en la ruta indicada.
 */
 yargs.command({
    command: 'ls',
    describe: 'Muestra los ficheros del directorio en la ruta indicada',
    builder: {
      ruta: {
        describe: 'Ruta del directorio cuyos ficheros se desean mostrar',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.ruta === 'string') {
        mostrarFicheros(argv.ruta);
  
      } else {
        console.log(chalk.red("Error. Comando mal especificado"));
      }
    },
  });

/**
 * Comando cat.
 * Muestra el contenido del fichero en la ruta indicada.
 */
 yargs.command({
    command: 'cat',
    describe: 'Muestra el contenido del directorio en la ruta indicada',
    builder: {
      ruta: {
        describe: 'Ruta del fichero cuyo contenido se desea mostrar',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.ruta === 'string') {
        mostrarContenido(argv.ruta);
  
      } else {
        console.log(chalk.red("Error. Comando mal especificado"));
      }
    },
  });

  /**
 * Comando rm.
 * Borra el archivo en la ruta indicada.
 */
 yargs.command({
    command: 'rm',
    describe: 'Borra el archivo en la ruta indicada',
    builder: {
      ruta: {
        describe: 'Ruta del fichero que se desea borrar',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.ruta === 'string') {
        borrarArchivos(argv.ruta);
  
      } else {
        console.log(chalk.red("Error. Comando mal especificado"));
      }
    },
  });

  yargs.argv;