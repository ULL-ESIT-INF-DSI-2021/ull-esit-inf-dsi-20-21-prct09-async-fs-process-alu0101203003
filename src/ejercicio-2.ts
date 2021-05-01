import {spawn} from 'child_process';
import * as yargs from 'yargs';
const chalk=require('chalk')
import * as fs from 'fs';

/**
 * Funcion countSinPipe (No hace uso de pipe).
 * Permite mostrar las líneas, palabras y caracteres que contiene un fichero.
 * Cuando alguno de los parametros sea indicado como vacío ("") por comando, se entederá que el usuario
 * no tiene interés en esa información en concreto (de lo contrario será necesario rellenar ese parámetro
 * con cualquier valor como "si", "mostrar" o simplemente " ").
 * @param lineas del fichero
 * @param palabras del fichero
 * @param caracteres del fichero
 * @param fichero (ruta) del fichero sobre el que se aplica el comando
 */
function countSinPipe (lineas :string, palabras :string, caracteres :string, fichero :string) {
  if (!existeFichero(fichero)){
    console.log(chalk.red("Error. El fichero no existe en la ruta indicada"));
  } else {
    const wc = spawn('wc', [`${fichero}`]);

    let wcOutput = '';
    wc.stdout.on('data', (piece) => wcOutput += piece);
      
    wc.on('close', () => {
      const wcOutputAsArray = wcOutput.split(/\s+/);
      console.log(`\nEl fichero ${fichero} tiene: `);
      if (lineas != ""){
        console.log(chalk.white(`${wcOutputAsArray[0]} lineas`));
      }
      if (palabras != ""){
        console.log(chalk.white(`${wcOutputAsArray[1]} palabras`));
      }
      if (caracteres != ""){
        console.log(chalk.white(`${wcOutputAsArray[2]} caracteres`));
      }
    });
  }
  
}

/**
 * Funcion countPipe (Hace uso de pipe).
 * Permite mostrar las líneas, palabras y caracteres que contiene un fichero.
 * Cuando alguno de los parametros sea indicado como vacío ("") por comando, se entederá que el usuario
 * no tiene interés en esa información en concreto (de lo contrario será necesario rellenar ese parámetro
 * con cualquier valor como "si", "mostrar" o simplemente " ").
 * @param lineas del fichero
 * @param palabras del fichero
 * @param caracteres del fichero
 * @param fichero (ruta) del fichero sobre el que se aplica el comando
 */
 function countPipe (lineas :string, palabras :string, caracteres :string, fichero :string) {
  if (!existeFichero(fichero)){
    console.log(chalk.red("Error. El fichero no existe en la ruta indicada"));
  } else {
    const wc = spawn('wc', [`${fichero}`]);
    
    console.log(chalk.blue(`\nInformación sobre ${fichero}. Mostrando: \n`))
    wc.on('close', () => {
      if (lineas != ""){
        console.log(chalk.white(`Número de líneas`))
        var childLineas = spawn('sh', [`-c`,`wc -l < ${fichero}`]);
        childLineas.stdout.pipe(process.stdout)
      } 
      if (palabras != ""){
        console.log(chalk.white(`Número de palabras`))
        var childPalabras = spawn('sh', [`-c`,`wc -w < ${fichero}`]);
        childPalabras.stdout.pipe(process.stdout)
      }
      if (caracteres != ""){
        console.log(chalk.white(`Número de caracteres`))
        var childCaracteres = spawn('sh', [`-c`,`wc -c < ${fichero}`]);
        childCaracteres.stdout.pipe(process.stdout)
      }
      console.log(chalk.blue(`\nRespectivamente: \n`))
    });
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
 * Comando countNoPipe (Llama a la función que no hace uso de pipe).
 * Muestra las líneas, palabras y caracteres que contiene un fichero.
 */
 yargs.command({
  command: 'countNoPipe',
  describe: 'Muestra las líneas, palabras y caracteres que contiene un fichero',
  builder: {
    lineas: {
      describe: 'Mostrar lineas',
      demandOption: true,
      type: 'string',
    },
    palabras: {
      describe: 'Mostrar palabras',
      demandOption: true,
      type: 'string',
    },
    caracteres: {
      describe: 'Mostrar caracteres',
      demandOption: true,
      type: 'string',
    },
    fichero: {
      describe: 'Fichero sobre el que aplicar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.lineas === 'string' && typeof argv.palabras === 'string' && typeof argv.caracteres === 'string' && typeof argv.fichero === 'string') {
      countSinPipe(argv.lineas, argv.palabras, argv.caracteres, argv.fichero);

    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

/**
 * Comando countPipe (Llama a la función que hace uso de pipe).
 * Muestra las líneas, palabras y caracteres que contiene un fichero.
 */
 yargs.command({
  command: 'countPipe',
  describe: 'Muestra las líneas, palabras y caracteres que contiene un fichero',
  builder: {
    lineas: {
      describe: 'Mostrar lineas',
      demandOption: true,
      type: 'string',
    },
    palabras: {
      describe: 'Mostrar palabras',
      demandOption: true,
      type: 'string',
    },
    caracteres: {
      describe: 'Mostrar caracteres',
      demandOption: true,
      type: 'string',
    },
    fichero: {
      describe: 'Fichero sobre el que aplicar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.lineas === 'string' && typeof argv.palabras === 'string' && typeof argv.caracteres === 'string' && typeof argv.fichero === 'string') {
      countPipe(argv.lineas, argv.palabras, argv.caracteres, argv.fichero);

    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

yargs.argv;