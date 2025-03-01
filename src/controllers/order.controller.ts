// import { Request, Response } from "express";
// import { Order, IOrder } from "../models/order.model";
// import { Package } from "../models/package.model";
// import { AddOn, IAddOn } from "../models/addOn.model";
// import { createOrder, getAllOrdersService } from "../services/order.service"; // Import the service function
// import { ErrorResponse,createErrorResponse } from "../utils/errorResponse"; // Optional: Custom error handling
// import { getOrdersByUserIdService } from "../services/order.service"; // Import the service function

// /**
//  * Handles the creation of a new order.
//  * @param req - The request object.
//  * @param res - The response object.
//  */
// export const handleCreateOrder = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       userId,
//       packageId,
//       addOnIds,
//       bookTitle,
//       bookSubtitle,
//       authorName,
//       genre,
//       seriesContinuation,
//       summary,
//       coverStyle,
//       coverMood,
//       colorPalette,
//       examples,
//       file,
//       firstOrder,
//       shareOnPortfolio,
//       paymentMethod,
//       status,
//     } = req.body;

//     // Call the service to create an order
//     const newOrder = await createOrder(
//       userId,
//       packageId,
//       addOnIds,
//       {
//         bookTitle,
//         bookSubtitle,
//         authorName,
//         genre,
//         seriesContinuation,
//         summary,
//         coverStyle,
//         coverMood,
//         colorPalette,
//         examples,
//         file,
//         firstOrder,
//         shareOnPortfolio,
//         paymentMethod,
//         status: "Submitted", // Order status is Pending by default
//         paymentStatus: "Unpaid", // Assuming default payment status is Unpaid
//       }
//     );

//     // Respond with the created order
//     res.status(201).json({
//       message: "Order placed successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     // Handle error using the error response factory
//     const customError = error as ErrorResponse;

//     if (customError && customError.statusCode) {
//       res.status(customError.statusCode).json({ message: customError.message, stack: customError.stack });
//     } else {
//       // Handle unknown errors
//       const unknownError = createErrorResponse("Error creating order", 500);
//       res.status(unknownError.statusCode).json({ message: unknownError.message, stack: unknownError.stack });
//     }
//   }
// };


// UPDATED ONE 

import { Request, Response } from "express";
import { Order, IOrder } from "../models/order.model";
import { Package } from "../models/package.model";
import { AddOn, IAddOn } from "../models/addOn.model";
import { createOrder, getAllOrdersService } from "../services/order.service"; // Import the service function
import { ErrorResponse, createErrorResponse } from "../utils/errorResponse"; // Optional: Custom error handling
import { getOrdersByUserIdService } from "../services/order.service"; // Import the service function

/**
 * Handles the creation of a new order.
 * @param req - The request object.
 * @param res - The response object.
 */
export const handleCreateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userId, // Extract userId from the request body
      packageId,
      addOnIds,
      bookTitle,
      bookSubtitle,
      authorName,
      genre,
      seriesContinuation,
      summary,
      coverStyle,
      coverMood,
      colorPalette,
      examples,
      file,
      firstOrder,
      shareOnPortfolio,
      paymentMethod,
      status,
    } = req.body;

    // Log the received userId for debugging
    console.log("Received userId:", userId);

    // Call the service to create an order
    const newOrder = await createOrder(
      userId,  // Make sure the correct userId is passed
      packageId,
      addOnIds,
      {
        bookTitle,
        bookSubtitle,
        authorName,
        genre,
        seriesContinuation,
        summary,
        coverStyle,
        coverMood,
        colorPalette,
        examples,
        file,
        firstOrder,
        shareOnPortfolio,
        paymentMethod,
        status: "Submitted", // Order status is Pending by default
        paymentStatus: "Unpaid", // Assuming default payment status is Unpaid
      }
    );

    // Respond with the created order
    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    // Handle error using the error response factory
    const customError = error as ErrorResponse;

    if (customError && customError.statusCode) {
      res.status(customError.statusCode).json({ message: customError.message, stack: customError.stack });
    } else {
      // Handle unknown errors
      const unknownError = createErrorResponse("Error creating order", 500);
      res.status(unknownError.statusCode).json({ message: unknownError.message, stack: unknownError.stack });
    }
  }
};

/**
 * Handles fetching orders by userId.
 * @param req - The request object.
 * @param res - The response object.
 */
export const handleGetOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;  // Get userId from URL params

    // Call the service to fetch orders for the given userId
    const orders = await getOrdersByUserIdService(userId);

    // Respond with the fetched orders
    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    // Handle error
    const customError = error as ErrorResponse;
    if (customError && customError.statusCode) {
      res.status(customError.statusCode).json({ message: customError.message, stack: customError.stack });
    } else {
      const unknownError = createErrorResponse("Error fetching orders", 500);
      res.status(unknownError.statusCode).json({ message: unknownError.message, stack: unknownError.stack });
    }
  }
};

/**
 * Handles fetching all orders.
 * @param req - The request object.
 * @param res - The response object.
 */
export const handleGetAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    // Call the service to fetch all orders
    const orders = await getAllOrdersService();

    // Respond with the fetched orders
    res.status(200).json({
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    // Handle error
    const customError = error as ErrorResponse;
    if (customError && customError.statusCode) {
      res.status(customError.statusCode).json({ message: customError.message, stack: customError.stack });
    } else {
      const unknownError = createErrorResponse("Error fetching orders", 500);
      res.status(unknownError.statusCode).json({ message: unknownError.message, stack: unknownError.stack });
    }
  }
};