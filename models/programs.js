import mongoose from "mongoose";

const ProgramSchema = mongoose.Schema(
  {
    name: String,
    abbreviation: {
      type: String,
      maxlength: [
        5,
        "A abbreviation name must have less or equal 5 characters",
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
    manager: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    schoolYear: Number,
    // events: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Events",
    //   },
    // ],
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

//DOCUMENT MIDDLEWARE
ProgramSchema.pre("save", function (next) {
  this.processTime = Date.now();
  next();
});

const Program = mongoose.model("Program", ProgramSchema);

export default Program;
