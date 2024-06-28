import { NextResponse, NextRequest } from "next/server";
import dbconnect from "@/db/dbconnect";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (
      username == null ||
      username.trim() == "" ||
      password == null ||
      password.trim() == ""
    ) {
      return NextResponse.json(
        { message: "Username or password cannot be empty" },
        { status: 400 }
      );
    }
    const name: string = username.trim().toLowerCase();
    const user = await User.findOne({ username: name });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return NextResponse.json({ message: "Wrong password" }, { status: 401 });
    }

    const token = jwt.sign(
      { userID: user.id, username: name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "10000d",
      }
    );
    const response = NextResponse.json(
      { message: "Login Success" },
      { status: 200 }
    );
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
