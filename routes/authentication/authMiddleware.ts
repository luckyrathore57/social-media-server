import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import secretKey from "../../secret";

interface User {
  // Define the properties of the User object here
  // For example:
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User; // Declare the user property on the Request object
    }
  }
}

function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  const authDetails = req.headers.authorization; // Getting data from headers

  if (authDetails) {
    const token = authDetails.split(" ")[1]; // Getting token which is the second word after splitting with ' '

    //@ts-ignore
    jwt.verify(token, secretKey, (err: any, user: User) => {
      // Verify token with jwt verify function
      if (err) {
        res.sendStatus(403); // If can't verify, send 403 error
      } else {
        req.user = user; // Gives username and role to the next function for further tasks
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
}

export default authenticateJwt;
