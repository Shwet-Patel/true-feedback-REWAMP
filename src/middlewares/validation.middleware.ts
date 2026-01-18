import { Request, Response, NextFunction } from "express";
import z from "zod";

type RequestPart = "body" | "query" | "params";

export const validate =
  (schema: z.ZodSchema<any>, part: RequestPart = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Select the correct part of the request to parse
      let dataToValidate: unknown;
      switch (part) {
        case "body":
          dataToValidate = req.body;
          break;
        case "query":
          dataToValidate = req.query;
          break;
        case "params":
          dataToValidate = req.params;
          break;
        default:
          // This case should not be reachable if using TypeScript
          throw new Error("Invalid validation part specified");
      }

      // 2. Parse and validate the selected data
      const parsedData = schema.parse(dataToValidate);

      // 3. Store the parsed/validated data back into the request object
      // This replaces the original data with the validated and transformed data
      switch (part) {
        case "body":
          req.body = parsedData;
          break;
        case "query":
          // req.query can be modified by setting properties directly
          // Assign each property from parsedData to req.query
          const parsedQuery = parsedData as Record<string, any>;
          Object.keys(parsedQuery).forEach((key) => {
            (req.query)[key] = parsedQuery[key];
          });
          break;
        case "params":
          req.params = parsedData as typeof req.params;
          break;
      }

      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formatedError = z.treeifyError(error);
        return res.validationError(formatedError, "Validation Error");
      }

      console.error("Zod validation failed:", error);
      return res.error("zod validation failed", 500, error);
    }
  };
