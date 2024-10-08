import express from 'express'
import areasRouter from './routes/areas.routes.js'
import rolesRouter from './routes/roles.routes.js'
import estadosRouter from './routes/estados.routes.js'
import marcasRouter from './routes/marcas.routes.js'
import modelosRouter from './routes/modelos.routes.js'
import usuariosRouter from './routes/usuarios.routes.js'
import bajasbienesRouter from './routes/bajasbienes.routes.js'
import bienRouter from './routes/bienes.routes.js'
import auditoriaRouter from './routes/auditoriabienes.routes.js'

const app = express()

app.listen(3000)
app.use(express.json())
console.log('Server running on port 3000')

app.use('/api/areas',areasRouter)
app.use('/api/roles',rolesRouter)
app.use('/api/estados',estadosRouter)
app.use('/api/marcas',marcasRouter)
app.use('/api/modelos',modelosRouter)
app.use('/api/usuarios',usuariosRouter)
app.use('/api/bajasbienes',bajasbienesRouter)
app.use('/api/bien',bienRouter)
app.use('/api/auditoria',auditoriaRouter)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });

