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
        values: ["Elementary", "Middle", "High"],
        message: "School Level is either : Elementary, Middle, High",
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
    teachers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
      },
    ],
    students: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
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
