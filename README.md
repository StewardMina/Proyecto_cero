# Proyecto Cero v3.0

Sistema de gestión escolar con frontend Vue.js y backend Node.js.

## Configuración de Variables de Entorno

### Backend (Railway)

1. Ve al dashboard de Railway
2. Selecciona tu proyecto de backend
3. Ve a la sección "Variables" o "Environment Variables"
4. Agrega las siguientes variables:

```
PORT=3000
MYSQLHOST=ballast.proxy.rlwy.net
MYSQLPORT=15170
MYSQLUSER=root
MYSQLPASSWORD=VUjNwZWqwQZWwmmxxFtWXqqwFjfMFuVl
MYSQLDATABASE=railway
DATABASE_URL=mysql://root:VUjNwZWqwQZWwmmxxFtWXqqwFjfMFuVl@ballast.proxy.rlwy.net:15170/railway
```

**Nota**: Reemplaza los valores con los que Railway te proporcione al crear tu base de datos MySQL.

### Frontend (Railway)

1. Ve al dashboard de Railway
2. Selecciona tu proyecto de frontend
3. Ve a la sección "Variables" o "Environment Variables"
4. Agrega la siguiente variable:

```
VITE_API_BASE_URL=https://tu-backend-railway.up.railway.app/api
```

**Nota**: Reemplaza `tu-backend-railway.up.railway.app` con la URL real de tu backend desplegado en Railway.

### Desarrollo Local

Para desarrollo local, las variables ya están configuradas en los archivos `.env` de cada directorio.

## Despliegue

1. Backend: Conecta tu repositorio de GitHub a Railway y despliega
2. Frontend: Conecta tu repositorio de GitHub a Railway y despliega
3. Base de datos: Crea una base de datos MySQL en Railway y configura las variables

## Tecnologías

- Frontend: Vue.js 3 + Vite
- Backend: Node.js + Express
- Base de datos: MySQL
- Despliegue: Railway
