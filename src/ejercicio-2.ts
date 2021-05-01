import {watchFile} from 'fs';
import {spawn} from 'child_process';
import * as yargs from 'yargs';
const chalk=require('chalk')
import * as fs from 'fs';

/*
watchFile('helloworld.txt', (curr, prev) => {
  console.log(`File was ${prev.size} bytes before it was modified.`);
  console.log(`Now file is ${curr.size} bytes.`);

  const wc = spawn('wc', ['helloworld.txt']);

  let wcOutput = '';
  wc.stdout.on('data', (piece) => wcOutput += piece);

  wc.on('close', () => {
    const wcOutputAsArray = wcOutput.split(/\s+/);
    console.log(`File helloworld.txt has ${wcOutputAsArray[1]} lines`);
    console.log(`File helloworld.txt has ${wcOutputAsArray[2]} words`);
    console.log(`File helloworld.txt has ${wcOutputAsArray[3]} characters`);
  });
});
*/

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
      var correccionLineas :number = parseInt(wcOutputAsArray[0]) + 1 //Mostrar número de líneas correctamente
      if (lineas != ""){
        console.log(`El fichero ${fichero} tiene ${correccionLineas} lineas`);
      }
      if (palabras != ""){
        console.log(`El fichero ${fichero} tiene ${wcOutputAsArray[1]} palabras`);
      }
      if (caracteres != ""){
        console.log(`El fichero ${fichero} tiene ${wcOutputAsArray[2]} caracteres`);
      }
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
 * Añade una nota al directorio del usuario
 */
 yargs.command({
  command: 'countNoPipe',
  describe: 'Añade una nueva nota',
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

yargs.argv;