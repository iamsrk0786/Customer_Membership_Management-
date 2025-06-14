import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema({
  name: String,
});

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
