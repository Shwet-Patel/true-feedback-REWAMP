import { LoginData, ResetPasswordData, verifyOtpData } from "@/validations/auth.validation";
import { Request, Response } from "express";
import authService from "@/services/auth.service";

const loginHandler = async (
  req: Request,
  res: Response,
) => {
  const data = req.body as LoginData;
  const result = await authService.loginService(data);

  // store tokens in httpOnly cookies
  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  if (result.refreshToken) {
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  res.success(result.user, 'Login successful');
};

const logoutHandler = async (
  req: Request,
  res: Response,
) => {
  // Clear the cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.success(null, 'Logout successful');
};

const refreshTokenHandler = async (
  req: Request,
  res: Response,
) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.notFound('Refresh token not found');
  }
  
  const result = await authService.refreshTokenService(refreshToken);

  // Update the access token cookie
  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.success(null, 'Token refreshed successfully');
};

const forgotPasswordHandler = async (
  req: Request,
  res: Response,
) => {
  const { email } = req.body;
  await authService.forgotPasswordService(email);
  res.success(null, 'Forgot password process initiated');
};

const resetPasswordHandler = async (
  req: Request,
  res: Response,
) => {
  const body = req.body as ResetPasswordData;
  const result = await authService.resetPasswordService(body);

  res.success(result, 'password updated successfully');
};

const verifyOtpHandler = async (
  req: Request,
  res: Response,
) => {
  const body = req.body as verifyOtpData;
  const result = await authService.verifyOtpService(body);
  res.success(result, 'otp verified successfully');
};

export default {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  verifyOtpHandler
};
