import { academicSemesterFilterableFields } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { Response, Request, NextFunction } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constans/pagination';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Aademic semester created successfully!',
    data: result,
  });
});

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    console.log(paginationOptions);

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester received Successfully !',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester received Successfully !',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};
