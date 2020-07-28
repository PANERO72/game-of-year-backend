# Backend-Server

Este es el código necesario para establecer el 'backend' conectado a Firebase usando la librería angularfirebase2.

Es necesario iniciar sesión en Firebase usando el comando:
```
firebase login
```

Para iniciar el 'backend' es necesario ejecutar el comando:
```
firebase init
```

Después de iniciar el 'backend' aparecerán las opciones que Firebase ofrece para implementar su proyecto.

## Dentro de la carpeta functions

El directorio 'lib' están los archivos JS compilados desde los archivos Typescript, que se suben a Cloud Functions de Firebase.

Para compilar y subir a Firebase es necesario ejecutar el comando:
```
firebase deploy
```

El directorio 'src' están los archivos Typescript sin compilar los cuales se utilizan para escribir las funciones de Firebase y en el archivo 'serviceAccountKey.json' debe incluir la información de la aplicación para conectar el 'backend' con Firebase.

Para que cualquier cambio realizado en los Typescript sea escuchado por Firebase es necesario usar el comando:
```
npm run build
```

o el comando:

```
tsc -w <file.ts>
```

Para probar 'backend' y utilizar las funciones desde Firebase es necesario usar el comando:
```
firbase serve
```