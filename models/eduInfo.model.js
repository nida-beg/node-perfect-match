const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        degree: String,
        course_name: String,
        university: String,
        yearOfPassing: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },


    { timestamps: true }
);

const EduInfo = mongoose.model("EduInfo", schema, "EduInfo");
exports.EduInfo = EduInfo;