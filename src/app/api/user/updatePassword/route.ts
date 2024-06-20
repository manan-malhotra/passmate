import { NextRequest, NextResponse } from "next/server";
import dbconnect from "@/db/dbconnect";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

dbconnect();
export async function PUT(req: NextRequest) {
  try {
    const { currentPassword, newPassword } = await req.json();
    const token = req.cookies.get("token")?.value || "";
    if (token == "")
      return NextResponse.json(
        { message: "No Token Provided" },
        { status: 401 }
      );
    const data = jwt.decode(token) as JwtPayload;
    const userID = data?.userID;
    const user = await User.findOne({ _id: userID });
    if (!user)
      return NextResponse.json({ message: "Invalid User" }, { status: 401 });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.save();
    return NextResponse.json({ message: "Password Updated!", userID });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!!" },
      { status: 500 }
    );
  }
}
