const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true, required: true },
        city: String,


        creatingFor: {
            type: String,
            enum: ["self", "friend_or_relative", "sister", "brother"
                , "son", "daughter"]
        },
        password: String,
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
            required: true

        }

    },
    { timestamps: true }
);

const User = mongoose.model("user", schema, "user");
exports.User = User;
// module.exports = mongoose => {
//     const user= mongoose.model("user",
//     )
//     return user;
// }