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

* IT9: Se ejecuta el watch:
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

* IT10: watcher.on entra en la pila de llamadas:
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

* IT11: watcher.on se ejecuta pasando al registro de evento
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

* IT12: watcher.on se mantiene en ejecución y sigue el flujo. Llega el siguiente console.log a la pila de llamadas
---------------

Pila de llamadas:

-console.log(`File ${filename} is no longer watched`);
-manejador access
-main

Registro de eventos:

-watcher.on('change')

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}

---------------

* IT13: Se ejecuta el console.log reflejando el resultado en la salida
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
- File ${filename} is no longer watched

---------------

{ 
  Hasta aquí se habría completado el flujo mínimo del programa.
  A partir de ahora se evaluará el caso de modificación donde
  entrará en juego el watcher.on change y su correspondiente flujo
}

* IT14: Cuando el fichero se modifica entramos en el evento correspondiente y se añade el console.log a la pila
---------------

Pila de llamadas:

-console.log(`File ${filename} has been modified somehow`);
-manejador access
-main

Registro de eventos:

-watcher.on('change')

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}
- File ${filename} is no longer watched

---------------

* IT15: Se ejecuta el console.log y se muestra por pantalla
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
- File ${filename} is no longer watched
- File ${filename} has been modified somehow

---------------

* IT16: Se repetirá este bucle  con las iteraciones 14 y 15 cada vez que se realice un cambio en el fichero vigilado. Una vez cerrado el programa, watcher.on('change') saldrá del registro de eventos y finalizará el flujo (saldrá también el manejador de access y main).
---------------

Pila de llamadas:

-

Registro de eventos:

-

Cola de manejadores:

-

Consola:

- Starting to watch file ${filename}
- File ${filename} is no longer watched
- File ${filename} has been modified somehow

---------------

*/

/* 

Teniendo en cuenta que el fichero se modifica 2 veces, se repetiran las iteraciones 14 y 15 dos veces. La salida
de consola acaba así:

- Starting to watch file ${filename}
- File ${filename} is no longer watched
- File ${filename} has been modified somehow
- File ${filename} has been modified somehow

*/

/* 

La funcion access nos permitirá acceder al fichero y, por lo tanto, comprobar si existe, si se tienen permisos para acceder 
y manejar los posibles errores de este acceso.

Las constantes (constants) nos servirán para manipular el archivo teniendo en cuenta sus parámetros dentro de la llamada
a la función access.

*/