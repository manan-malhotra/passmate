import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import dbconnect from "@/db/dbconnect";
import jwt, { JwtPayload } from "jsonwebtoken";
import Password from "@/models/passwordModel";
import Cryptr from "cryptr";
dbconnect();
export async function POST(request: NextRequest) {
  const { key, username, password } = await request.json();
  if (
    password == null ||
    password.trim() == "" ||
    key == null ||
    key.trim() == ""
  ) {
    return NextResponse.json(
      { message: "Key and Password cannot be empty" },
      { status: 400 }
    );
  }
  const token = request.cookies.get("token")?.value || "";
  if (token == "")
    return NextResponse.json({ message: "No Token Provided" }, { status: 401 });
  const data = jwt.decode(token) as JwtPayload;
  const userId = data.userID;
  const user = await User.findOne({ _id: userId });
  if (!user)
    return NextResponse.json(
      { message: "Invalid Token Provided" },
      { status: 401 }
    );
  const cryptr = new Cryptr(key + process.env.CRYPTR_KEY);
  let enryptedUser = "";
  if (username != null && username.trim() !== "") {
    enryptedUser = cryptr.encrypt(username);
  }
  const encryptedPass = cryptr.encrypt(password);
  const alreadyExist = await Password.findOne({ user, key });
  if (alreadyExist) {
    return NextResponse.json(
      { message: "Cannot add with same key: " + key },
      { status: 401 }
    );
  }
  const newStore = await Password.create({
    username: enryptedUser,
    password: encryptedPass,
    user,
    key,
  });

  return NextResponse.json({ message: "Key Added Successfully" });
}
