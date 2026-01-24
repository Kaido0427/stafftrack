import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoutes from './routes/auth.routes.js'
import directionRoutes from './routes/direction.routes.js'

const app = new Hono()

// Middlewares
app.use('/*', cors())

// Routes
app.get('/', (c) => {
    return c.json({
        message: 'StaffTrack API',
        version: '1.0.0'
    })
})

// Health check
app.get('/health', (c) => {
    return c.json({ status: 'ok' })
})

app.route('/auth', authRoutes)
app.route('/directions', directionRoutes)


export default app