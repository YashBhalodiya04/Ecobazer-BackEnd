const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userimage:{
      type: String,
      required: false,
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    billingAddress: {
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      pincode: {
        type: String,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.virtual("finalcartvalue").get(function () {
  return this.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const User = mongoose.model("User", userSchema);
module.exports = User;
