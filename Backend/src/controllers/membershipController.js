import Membership from "../models/Membership.js";

export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMembership = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new Error("Name is required");
    }
    const membership = new Membership({ name });
    await membership.save();
    res
      .status(201)
      .json({ membership, message: "Membership created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateMembership = async (req, res) => {
  try {
    const updated = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Membership not found" });
    }
    res.json({
      updated,
      message: "Membership updated successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMembership = async (req, res) => {
  try {
    const deleted = await Membership.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Membership not found" });
    }
    res.json({ message: "Membership deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
