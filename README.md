# Movie List App

Esta es una aplicación simple para gestionar una lista de películas.

## Instrucciones de Configuración

1. **Configurar Variables de Entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Puedes utilizar el archivo `.env-example` como base. Asegúrate de completar todas las variables necesarias.

## Instrucciones de Ejecución en Local

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo, utiliza cualquiera de los siguientes comando:

```bash
- npm run start:dev
- npm run start:debug
```

### Produccion

Para ejecutar la aplicación en un entorno productivo utilizando npm, utiliza el siguiente comando:

```bash
npm run start:prod
```

Para ejecutar la aplicación en un contenedor Docker, asegúrate de tener Docker y docker-compose instalados. Luego, ejecuta el siguiente comando:

```bash
docker-compose up -d
```

### Documentación API

La documentación de la API está disponible en http://localhost/doc cuando ejecutas la aplicación en modo desarrollo o productivo. Puedes acceder a la documentación desde tu navegador web.

### Test

```bash
- npm run test
- npm run test:cov
```
