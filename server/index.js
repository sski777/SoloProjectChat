import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimiter from 'express-rate-limiter'
import RouteGetMessages from './Routes/AddMessags.js'
import RouteDeleteMessages from './Routes/DeleteMessages.js';

const server = express();

server.use(helmet())


const allowedOrigins = ['https://soloprojectchat.vercel.app', 'http://localhost:5173'];


server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Optional: if you are using cookies or sessions
}));


const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

server.use(limiter); // add it as a middlewware function


server.use('/getmessages', RouteGetMessages)

server.use('/deletemessages', RouteDeleteMessages)


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log('The Server Is Running!' + ' At Port: ' + PORT)  
})