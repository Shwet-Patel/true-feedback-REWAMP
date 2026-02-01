import { LoginData, ResetPasswordData, verifyOtpData } from "@/validations/auth.validation";
import bcrypt from "bcryptjs";
import { findUserByUsernameOrEmail , updateIsVerified, updatePassword} from "@/repositories/auth.repository";
import { AppEror } from "@/errors/app.error";
import { generateToken , verifyToken } from "@/utils/jwtToken.Utility";
import { JwtPayload } from "jsonwebtoken";
import { sendResetPasswordEmail } from "@/utils/sendEmail.utility";

const loginService = async (data: LoginData) => {
  // step 1: find user by username or email
  const user = await findUserByUsernameOrEmail(data.identifier);
  if (!user) {
    throw new AppEror("User not found", 404);
  }

  // step 2: verify password
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new AppEror("Invalid password", 401);
  }

  // step 3: generate JWT token
  const accessToken = generateToken(
    {
      type: "access",
      userId: user.user_id,
      username: user.username,
      email: user.email,
    },
    { expiresIn: "1h" },
  );

  let refreshToken = null;
  if (data.rememberMe) {
    refreshToken = generateToken(
      {
        type: "refresh",
        userId: user.user_id,
        username: user.username,
        email: user.email,
      },
      { expiresIn: "7d" },
    );
  }

  // step 4: return user data
  return {
    user: {
      userId: user.user_id,
      username: user.username,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

const refreshTokenService = async (refreshToken: string) => {
  // step 1: verify refresh token
  const decoded = verifyToken(refreshToken);

  // step 2: generate new access token
  const accessToken = generateToken(
    {
      type: "access",
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email,
    },
    { expiresIn: "1h" },
  );

  return {
    accessToken,
  };
};

const forgotPasswordService = async (email: string) => {
  // step 1: check if user exists
  const user = await findUserByUsernameOrEmail(email);
  if (!user) {
    throw new AppEror("User not found", 404);
  }

  // step 2: generate token including user details
  const token = generateToken(
    {
      type: "forgotPassword",
      userId: user.user_id,
      email: user.email,
    },
    { expiresIn: "15m" },
  );

  //step 3: send email with token
  sendResetPasswordEmail(token, user.email, user.username);
  
  //all set to return
  return;
};

const resetPasswordService = async (data: ResetPasswordData) => {
  const { token, newPassword } = data;

  // step 1 : validate the token.
  const decoded = verifyToken(token);

  //step 2 : hash the password.
  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  //step 3 : save it.
  const result = await updatePassword(decoded.userId, newPasswordHash);
  
  //step 4: return user without password
  const { password: _password, ...userWithoutPassword } = result;
  return userWithoutPassword;
}

const verifyOtpService = async (data: verifyOtpData) => {
  const { identifier, otp } = data;
  
  // step 1: find user by username or email
  const user = await findUserByUsernameOrEmail(identifier,false);
  if (!user) {
    throw new AppEror("User not found", 404);
  }

  // step 2: verify otp
  if (user.otp !== otp) {
    throw new AppEror("Invalid OTP", 401);
  }

  // step 3: set isVerified to true
  const result = await updateIsVerified(user.user_id, true);
  
  //step 4: return user without password
  const { password: _password, ...userWithoutPassword } = result;
  return userWithoutPassword;
}

export default {
  loginService,
  refreshTokenService,
  forgotPasswordService,
  resetPasswordService,
  verifyOtpService
};

