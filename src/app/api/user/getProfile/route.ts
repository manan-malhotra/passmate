import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import User from "@/models/userModel";
import Password from "@/models/passwordModel";
import dbconnect from "@/db/dbconnect";
import jwt, { JwtPayload } from "jsonwebtoken";
dbconnect();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (token == "")
      return NextResponse.json(
        { message: "No Token Provided" },
        { status: 401 }
      );
    const data = jwt.decode(token) as JwtPayload;
    const userID = data.userID;
    const user = await User.findOne({ _id: userID }).select(
      "-password -_id -__v"
    );
    if (!user)
      return NextResponse.json(
        { message: "Invalid Token Provided" },
        { status: 401 }
      );
    const userData = await Password.find({ user: userID })
      .select("-user -username -password -_id -__v")
      .sort({ key: 1 });
    return NextResponse.json({ message: "Success", userData, user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
