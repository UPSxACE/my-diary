import jwt, { JwtPayload } from "jsonwebtoken";
import "server-only";

interface TokenVerification {
  valid: boolean;
  token: JwtPayload;
}

export default function jwtVerify(token: string): TokenVerification {
  try {
    const verifiedToken = jwt.verify(
      token,
      process.env.NEXT_SERVER_JWT_SECRET || "",
    );

    if (typeof verifiedToken === "string") {
      return { valid: false, token: {} };
    }

    return { valid: true, token: verifiedToken };
  } catch (err) {
    return { valid: false, token: {} };
  }
}
