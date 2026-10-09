import express from "express";
import Order from "../models/order.js";

const router = express.Router();

/*
  POST /api/orders

  Creates a new customer order.
*/
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      orderType,
      deliveryAddress,
      preferredTime,
      notes,
      items,
      paymentMethod,
    } = req.body;

    // -----------------------------------------
    // Basic validation
    // -----------------------------------------

    if (!customer?.name || !customer?.phone) {
      return res.status(400).json({
        success: false,
        message: "Customer name and phone number are required.",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product is required.",
      });
    }

    if (!orderType || !["pickup", "delivery"].includes(orderType)) {
      return res.status(400).json({
        success: false,
        message: "Please select pickup or delivery.",
      });
    }

    // Delivery orders need an address
    if (
      orderType === "delivery" &&
      !deliveryAddress?.addressLine
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required for delivery orders.",
      });
    }

    // -----------------------------------------
    // Clean and validate order items
    // -----------------------------------------

    const cleanedItems = items.map((item) => {
      const quantity = Number(item.quantity);
      const price = Number(item.price);

      if (!item.productId || !item.name) {
        throw new Error(
          "Each order item must have a product ID and name."
        );
      }

      if (!Number.isFinite(price) || price < 0) {
        throw new Error(
          `Invalid price for product: ${item.name}`
        );
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(
          `Invalid quantity for product: ${item.name}`
        );
      }

      return {
        productId: String(item.productId),
        name: String(item.name).trim(),
        price,
        quantity,
        image: item.image ? String(item.image) : "",
      };
    });

    // -----------------------------------------
    // Calculate subtotal on the server
    // -----------------------------------------

    const subtotal = cleanedItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // -----------------------------------------
    // Delivery charge
    //
    // For now:
    // Pickup  = ₹0
    // Delivery = ₹0
    //
    // We will NOT hardcode a delivery fee until
    // Baba Bakery confirms its actual policy.
    // -----------------------------------------

    const deliveryCharge = 0;

    const totalAmount = subtotal + deliveryCharge;

    // -----------------------------------------
    // Create order
    // -----------------------------------------

    const order = new Order({
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || "",
      },

      orderType,

      deliveryAddress: {
        addressLine: deliveryAddress?.addressLine || "",
        landmark: deliveryAddress?.landmark || "",
        city: deliveryAddress?.city || "Jaipur",
        pincode: deliveryAddress?.pincode || "",
      },

      preferredTime: preferredTime || "",

      notes: notes || "",

      items: cleanedItems,

      subtotal,

      deliveryCharge,

      totalAmount,

      paymentMethod:
        paymentMethod === "online" ? "online" : "cod",

      paymentStatus: "pending",

      orderStatus: "pending",
    });

    // -----------------------------------------
    // Save to MongoDB
    // -----------------------------------------

    const savedOrder = await order.save();

    // -----------------------------------------
    // Send response
    // -----------------------------------------

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",

      order: {
        id: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        customer: savedOrder.customer,
        orderType: savedOrder.orderType,
        items: savedOrder.items,
        subtotal: savedOrder.subtotal,
        deliveryCharge: savedOrder.deliveryCharge,
        totalAmount: savedOrder.totalAmount,
        paymentMethod: savedOrder.paymentMethod,
        paymentStatus: savedOrder.paymentStatus,
        orderStatus: savedOrder.orderStatus,
        createdAt: savedOrder.createdAt,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while placing the order.",
    });
  }
});

/*
  GET /api/orders

  Used by the bakery admin dashboard
  to retrieve all orders.
*/
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while getting the orders.",
    });
  }
});

/*
  PATCH /api/orders/:orderNumber/status

  Used by the bakery admin dashboard
  to change an order's status.
*/
router.patch("/:orderNumber/status", async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { orderStatus } = req.body;

    // -----------------------------------------
    // Allowed order statuses
    // -----------------------------------------

    const allowedStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "ready",
      "out_for_delivery",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    // -----------------------------------------
    // Find and update order
    // -----------------------------------------

    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber },
      {
        $set: {
          orderStatus,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).lean();

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // -----------------------------------------
    // Send updated order
    // -----------------------------------------

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating the order status.",
    });
  }
});

/*
  GET /api/orders/:orderNumber

  Used to retrieve one order using its order number.
*/
router.get("/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({ orderNumber }).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while getting the order.",
    });
  }
});

export default router;