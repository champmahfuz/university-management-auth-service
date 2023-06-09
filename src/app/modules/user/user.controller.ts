import { RequestHandler } from 'express';
import { usersServices } from './user.services';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    //
    // const createUserZodSchema = z.object({
    //   body: z.object({
    //     user: z.object({
    //       role: z.string({
    //         required_error: 'Role is required!!!',
    //       }),
    //       password: z.string().optional(),
    //     }),
    //   }),
    // })

    // export const UserValidation = {
    //   createUserZodSchema,
    // }
    //

    const { user } = req.body;
    const result = await usersServices.createUser(user);
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
};
