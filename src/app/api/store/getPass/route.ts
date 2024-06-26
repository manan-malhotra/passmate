import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import User from "@/models/userModel";
import Password from "@/models/passwordModel";
import dbconnect from "@/db/dbconnect";
import jwt, { JwtPayload } from "jsonwebtoken";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();
    if (key == null || key.trim() == "") {
      return NextResponse.json(
        { message: "Key cannot be empty" },
        { status: 400 }
      );
    }
    const token = request.cookies.get("token")?.value || "";
    if (token == "")
      return NextResponse.json(
        { message: "No Token Provided" },
        { status: 401 }
      );
    const data = jwt.decode(token) as JwtPayload;
    const userId = data.userID;
    const user = await User.findOne({ _id: userId });
    if (!user)
      return NextResponse.json(
        { message: "Invalid Token Provided" },
        { status: 401 }
      );
    const cryptr = new Cryptr(key + process.env.CRYPTR_KEY);
    const storeData = await Password.findOne({ user, key });
    if (!storeData)
      return NextResponse.json(
        { message: "No such key found!" },
        { status: 400 }
      );
    let username = "";
    if (storeData.username) {
      username = cryptr.decrypt(storeData.username);
    }
    const password = cryptr.decrypt(storeData.password);
    return NextResponse.json({
      message: "Data fetched Successfully",
      data: { username, password },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
