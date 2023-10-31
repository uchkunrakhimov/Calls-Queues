import { Request, Response, NextFunction } from "express";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(401).json({ message: "email or password not defiend" });
  }

  next();
};

export { authenticateUser };
