import { NextResponse, NextRequest } from "next/server";
import dbconnect from "@/db/dbconnect";
import User from "@/models/userModel";
import bcrypt, { hashSync } from "bcrypt";
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
    const existingUser = await User.findOne({ username: name });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 403 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: name,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User registered successfully!", user },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
