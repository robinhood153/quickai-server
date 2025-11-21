import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'

async function startServer() {
    const app = express()

    // Cloudinary connection
    await connectCloudinary()

    app.use(cors({
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }))

    app.use(express.json())
    app.use(clerkMiddleware())

    app.get('/', (req, res) => res.send('Server is Live!'))

    app.use('/api/ai', aiRouter)
    app.use('/api/user', userRouter)

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    )
}

startServer()
