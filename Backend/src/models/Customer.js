import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
  contactNumber: { type: String, required: true },
  status: { type: String, enum: ["Gold", "Diamond"], default: "Gold" },
  membershipData: { type: mongoose.Schema.Types.ObjectId, ref: "Membership" },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
