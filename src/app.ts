import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandeler from './app/middlewares/globalErrorHandeler';
import routes from './app/routes';
import httpStatus from 'http-status';

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.log(process.env)

//application route
app.use('/api/v1/', routes);

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error Logger')
// })

//global error handeler
app.use(globalErrorHandeler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
