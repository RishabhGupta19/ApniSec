// import { Schema, model } from "mongoose";
// const IssueSchema = new Schema(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: "User" },
//     type: String,
//     title: String,
//     description: String,
//     priority: String,
//     status: String
//   },
//   { timestamps: true }
// );
// export const IssueModel = model("Issue", IssueSchema);
import { Schema, model } from "mongoose";
const IssueSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    priority: String,
    status: String,
}, { timestamps: true });
export const IssueModel = model("Issue", IssueSchema);
