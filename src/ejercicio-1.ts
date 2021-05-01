import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}


/*

* IT0: Inicio :
---------------

Pila de llamadas:

-

Registro de eventos:

-

Cola de manejadores:

-

Consola:

-

---------------

* IT1: Introducir script main en la pila de llamadas:
---------------

Pila de llamadas:

-main

Registro de eventos:

-

Cola de manejadores:

-

Consola:

-

---------------

* IT2: Se comprueba el acceso al archivo con la constante F_OK (el fichero existe):
---------------

Pila de llamadas:

-access
-main

Registro de eventos:

-

Cola de manejadores:

-

Consola:

-

---------------

* IT3: access no es un elemento de JavaScript ni de V8, por lo tanto pasa directamente a los registros de API:
---------------

Pila de llamadas:

-main

Registro de eventos:

-access

Cola de manejadores:

-

Consola:

-

---------------

* IT4: el manejador de access va a la cola de manejadores y access sale del registro de eventos:
---------------

Pila de llamadas:

-main

Registro de eventos:

-

Cola de manejadores:

-manejador access

Consola:

-

---------------

* IT5: al ser el primero de la cola, va a la pila de llamadas:
---------------

Pila de llamadas:

-manejador access
-main

Registro de eventos:

-

Cola de manejadores:

-

Consola:

-

---------------

* IT6: empieza la ejecución del manejador (no saldrá hasta que se detenga la ejecución) y llega el primer console.log a la pila de llamadas:
---------------

Pila de llamadas:

-console.log(`Starting to watch file ${filename}`)
-manejador access
-main

Registro de eventos:

-

Cola de manejadores:

-

Consola:

-

---------------

* IT7: se ejecuta el console log y sale de la pila (se muestra por consola):
---------------

Pila de llamadas:

-manejador access
-main

Registro de eventos:

-

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}

---------------

* IT8: entra watch a la pila de llamadas:
---------------

Pila de llamadas:

-watch(process.argv[2])
-manejador access
-main

Registro de eventos:

-

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}

---------------

* IT9: watch no es un elemento de JavaScript ni de V8, por lo tanto pasa directamente a los registros de API:
---------------

Pila de llamadas:

-manejador access
-main

Registro de eventos:

-watch(process.argv[2])

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}

---------------

* IT10: watch sale del registro de eventos:
---------------

Pila de llamadas:

-manejador access
-main

Registro de eventos:

-

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}

---------------

* IT11: watcher.on entra en la pila de llamadas:
---------------

Pila de llamadas:

-watcher.on('change')
-manejador access
-main

Registro de eventos:

-

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}

---------------

* IT12: watcher.on se ejecuta pasando al registro de evento
---------------

Pila de llamadas:

-manejador access
-main

Registro de eventos:

-watcher.on('change')

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}

---------------

* IT13: watcher.on se mantiene en ejecución y sigue el flujo
---------------

Pila de llamadas:

-manejador access
-main

Registro de eventos:

-watcher.on('change')

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}

---------------


*/