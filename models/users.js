import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    userType: {
      type: String,
      enum: {
        values: ["admin", "teacher", "student"],
        message: "School Level is either : admin, teacher, student",
      },
    },
    schoolLevel: {
      type: String,
      enum: {
        values: ["elementary", "middle", "high"],
        message: "School Level is either : elementary, middle, high",
      },
    },
    // notifications: [
    //   {
    //     notification_id: { type: String, required: true },
    //     notification: { type: String, required: true },
    //   },
    // // ],
    events: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Events",
      },
    ],
    programs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Programs",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("Users", UserSchema);

export default User;
