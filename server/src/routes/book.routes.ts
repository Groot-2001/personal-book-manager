import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createBookSchema, bookQuerySchema, updateBookSchema } from "../validators/book.validator";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controller/book.controller";
import { mongoIdSchema } from "../validators/common.validator";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createBookSchema),
  createBook
);

router.get(
    "/",
    authenticate,
    validate(bookQuerySchema, "query"),
    getBooks
);

router.get(
  "/:id",
  authenticate,
  validate(mongoIdSchema, "params"),
  getBookById
);

router.patch(
  "/:id",
  authenticate,
  validate(mongoIdSchema, "params"),
  validate(updateBookSchema),
  updateBook
);

router.delete(
  "/:id",
  authenticate,
  validate(mongoIdSchema, "params"),
  deleteBook
);

export default router;