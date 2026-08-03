import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { bookService } from "../services/book.service";

export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const book = await bookService.createBook(
    req.user._id.toString(),
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

export const getBooks = asyncHandler(async (req: Request, res: Response) => {

  const result = await bookService.getBooks(
    req.user._id.toString(),
    req.query
  );

  res.json({
    success: true,
    data: result
  });

});

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const book = await bookService.getBookById(
    req.user._id.toString(),
    req.params.id
  );

  res.json({
    success: true,
    data: book,
  });
});

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const book = await bookService.updateBook(
    req.user._id.toString(),
    req.params.id,
    req.body
  );

  res.json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  await bookService.deleteBook(
    req.user._id.toString(),
    req.params.id
  );

  res.json({
    success: true,
    message: "Book deleted successfully",
  });
});