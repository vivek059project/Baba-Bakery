import mongoose from "mongoose";

// Individual product inside an order
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

// Main order schema
const orderSchema = new mongoose.Schema(
  {
    // Unique order number shown to the customer
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Customer information
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15,
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
      },
    },

    // Pickup or delivery
    orderType: {
      type: String,
      enum: ["pickup", "delivery"],
      required: true,
      default: "pickup",
    },

    // Delivery information
    deliveryAddress: {
      addressLine: {
        type: String,
        trim: true,
        default: "",
      },

      landmark: {
        type: String,
        trim: true,
        default: "",
      },

      city: {
        type: String,
        trim: true,
        default: "Jaipur",
      },

      pincode: {
        type: String,
        trim: true,
        default: "",
      },
    },

    // Customer's preferred time
    preferredTime: {
      type: String,
      trim: true,
      default: "",
    },

    // Additional customer instructions
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    // Products ordered
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return Array.isArray(items) && items.length > 0;
        },
        message: "An order must contain at least one product.",
      },
    },

    // Price calculation
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryCharge: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Payment information
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      required: true,
      default: "pending",
    },

    // Razorpay information
    razorpayOrderId: {
      type: String,
      trim: true,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      trim: true,
      default: "",
    },

    razorpaySignature: {
      type: String,
      trim: true,
      default: "",
    },

    // Bakery order progress
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "completed",
        "cancelled",
      ],
      required: true,
      default: "pending",
    },

    // Cancellation information
    cancellationReason: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Generate an order number automatically
// Mongoose 9 does NOT use the old next() callback here.
orderSchema.pre("validate", function () {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-8);
    const randomNumber = Math.floor(100 + Math.random() * 900);

    this.orderNumber = `BB-${timestamp}-${randomNumber}`;
  }
});

// Create model
const Order = mongoose.model("Order", orderSchema);

export default Order;