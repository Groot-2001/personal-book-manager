import { ZodObject, ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const validate =
  (
    schema: ZodObject<any>,
    source: "body" | "query" | "params" = "body"
  ) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[source]);

      if (source === "body") {
        req.body = parsed;
      } else if (source === "query") {
        Object.assign(req.query, parsed);
      } else {
        Object.assign(
          req.params,
          parsed as Record<string, string>
        );
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new ApiError(400, error.issues[0].message));
      }

      next(error);
    }
  };