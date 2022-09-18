import mongoose from "mongoose";

const ProgramSchema = mongoose.Schema(
  {
    name: String,
    abbreviation: {
      type: String,
      maxlength: [
        5,
        "An abbreviation name must have less or equal 5 characters",
      ],
    },
    programType: String,
    schoolLevelRecommendation: {
      type: String,
      enum: {
        values: ["elementary", "middle", "high"],
        message: "School Level is either : elementary, middle, high",
      },
    },
    duration: Number,
    start: Date,
    end: Date,
    director: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    manager: [
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
    schoolYear: Number,
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

ProgramSchema.virtual("events", {
  ref: "Events",
  localField: "_id",
  foreignField: "program",
});

const Program = mongoose.model("Programs", ProgramSchema);

export default Program;
