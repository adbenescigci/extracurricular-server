import mongoose from "mongoose";

const EventSchema = mongoose.Schema(
  {
    name: String,
    date: Date,
    venue: String,
    duration: Number,
    type: String,
    program: {
      type: mongoose.Schema.ObjectId,
      ref: "Programs",
    },
    students: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
      },
    ],
    isApproved: {
      type: Boolean,
      default: true,
    },
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

const Event = mongoose.model("Events", EventSchema);

export default Event;
