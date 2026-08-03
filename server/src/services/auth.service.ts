import User  from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

export class AuthService {
  async registerUser({
    name,
    email,
    password,
  }: RegisterUserInput) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async loginUser({ email, password }: LoginUserInput) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export const authService = new AuthService();