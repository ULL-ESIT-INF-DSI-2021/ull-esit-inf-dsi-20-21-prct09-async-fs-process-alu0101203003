import * as yargs from 'yargs';
import { Usuario } from '../aplicacion/usuario';
const chalk=require('chalk')

/**
 * Comando add.
 * Añade una nota al directorio del usuario
 */
 yargs.command({
    command: 'add',
    describe: 'Añade una nueva nota',
    builder: {
      usuario: {
        describe: 'Nombre del usuario',
        demandOption: true,
        type: 'string',
      },
      titulo: {
        describe: 'Titulo de la nota',
        demandOption: true,
        type: 'string',
      },
      cuerpo: {
        describe: 'Cuerpo de la nota',
        demandOption: true,
        type: 'string',
      },
      color: {
        describe: 'Color de la nota',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string' && typeof argv.cuerpo === 'string' && typeof argv.color === 'string') {
        var usuario = new Usuario(argv.usuario);
        usuario.añadirNota(argv.titulo, argv.cuerpo, argv.color);
        
      } else {
        console.log(chalk.red("Error. Comando mal especificado"));
      }
    },
  });

/**
 * Comando modify.
 * Modifica una nota al directorio del usuario
 */
 yargs.command({
  command: 'modify',
  describe: 'Modifica una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    tituloMod: {
      describe: 'Titulo nuevo de la nota',
      demandOption: true,
      type: 'string',
    },
    cuerpoMod: {
      describe: 'Cuerpo nuevo de la nota',
      demandOption: true,
      type: 'string',
    },
    colorMod: {
      describe: 'Color nuevo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string' && typeof argv.tituloMod === 'string'&& typeof argv.cuerpoMod === 'string' && typeof argv.colorMod === 'string') {
      var usuario = new Usuario(argv.usuario);
      usuario.modificarNota(argv.titulo, argv.tituloMod, argv.cuerpoMod, argv.colorMod);
      
    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

/**
 * Comando remove.
 * Elimina una nota al directorio del usuario
 */
 yargs.command({
  command: 'remove',
  describe: 'elimina una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string') {
      var usuario = new Usuario(argv.usuario);
      usuario.eliminarNota(argv.titulo);
      
    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

/**
 * Comando list.
 * Lista las notas del directorio del usuario
 */
 yargs.command({
  command: 'list',
  describe: 'lista las notas del usuario',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string') {
      var usuario = new Usuario(argv.usuario);
      usuario.listarNotas();
      
    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

/**
 * Comando read.
 * Lee una nota al directorio del usuario
 */
 yargs.command({
  command: 'read',
  describe: 'lee una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string') {
      var usuario = new Usuario(argv.usuario);
      usuario.leerNota(argv.titulo);
      
    } else {
      console.log(chalk.red("Error. Comando mal especificado"));
    }
  },
});

yargs.argv;

