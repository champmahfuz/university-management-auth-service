import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandeler from './app/middlewares/globalErrorHandeler';
import { UserRoutes } from './app/modules/user/user.route';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.log(process.env)

//application route

app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error Logger')
// })

//global error handeler
app.use(globalErrorHandeler);

export default app;
