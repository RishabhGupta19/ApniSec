


import { Schema, model, Types, HydratedDocument } from "mongoose";

export interface IIssue {
  userId: Types.ObjectId;
  type: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IssueDocument = HydratedDocument<IIssue>;

const IssueSchema = new Schema<IIssue>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    priority: String,
    status: String,
  },
  { timestamps: true }
);

export const IssueModel = model<IIssue>("Issue", IssueSchema);
