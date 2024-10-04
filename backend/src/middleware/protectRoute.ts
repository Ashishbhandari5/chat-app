  // import jwt, { JwtPayload } from "jsonwebtoken";
  // import { Request, Response, NextFunction } from "express";
  // import prisma from "../db/prisma.js";

  // interface DecodedToken extends JwtPayload {
  //   userId: string;
  // }
  // declare global {
  //   namespace Express {
  //     export interface Request {
  //       user: {
  //         id: string;
  //       };
  //     }
  //   }
  // }
  // const protectRoute = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const token = req.cookies.jwt;
  //     if (!token) {
  //       return res.status(401).json({ error: "Unauthorized -No token provided" });
  //     }
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  //     if (!decoded) {
  //       return res.status(401).json({ error: "Unauthorized- Invalid Token" });
  //     }
  //     const user = await prisma.user.findUnique({
  //       where: { id: decoded.userId },
  //       select: { id: true, username: true, fullname: true, profilepic: true },
  //     });
  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }
  //     req.user = user;

  //     next();
  //   } catch (error: any) {
  //     console.log("Error in ProtectRoute", error.message);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // };
  // export default protectRoute;

  import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

// Interface for the decoded JWT payload
interface DecodedToken extends JwtPayload {
  userId: string;
}

// Extend the Express Request interface
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        username: string;
        fullname: string;
        profilepic: string;
      };
    }
  }
}

// Middleware to protect routes
const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt; // Retrieve the JWT from cookies
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, fullname: true, profilepic: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    // Handle JWT errors  
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log("Error in ProtectRoute", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;  
