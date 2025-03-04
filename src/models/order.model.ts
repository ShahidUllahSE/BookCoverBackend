import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  package: mongoose.Types.ObjectId;
  addOns: mongoose.Types.ObjectId[];
  totalPrice: number;
  status: "Pending" | "Completed" | "Cancelled" | "Submitted";
  paymentStatus: "Unpaid" | "Paid";
  bookTitle: string;
  bookSubtitle?: string;
  authorName?: string;
  genre: string;
  seriesContinuation?: string;
  summary?: string;
  coverStyle?: string;
  coverMood?: string;
  colorPalette?: string;
  examples?: string;
  file?: string; // file upload
  firstOrder?: boolean;
  shareOnPortfolio?: boolean;
  paymentMethod: string;
  userContacts?: string[]; // New field for sharing contacts freely
}

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  package: { type: Schema.Types.ObjectId, ref: "Package", required: true },
  addOns: [{ type: Schema.Types.ObjectId, ref: "AddOn" }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Cancelled", "Submitted"], default: "Pending" },
  paymentStatus: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
  bookTitle: { type: String, required: true },
  bookSubtitle: { type: String },
  authorName: { type: String },
  genre: { type: String, required: true },
  seriesContinuation: { type: String },
  summary: { type: String },
  coverStyle: { type: String },
  coverMood: { type: String },
  colorPalette: { type: String },
  examples: { type: String },
  file: { type: String },
  firstOrder: { type: Boolean },
  shareOnPortfolio: { type: Boolean },
  paymentMethod: { type: String },
  userContacts: { type: [String], default: [] }, // New field for contacts
}, { timestamps: true });

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
