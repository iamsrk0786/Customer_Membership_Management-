import Customer from "../models/Customer.js";

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("membershipData");
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "membershipData"
    );
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCustomer = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      status,
      membershipData,
    } = req.body;
    if (!firstName || !lastName || !email || !contactNumber ) {
      throw new Error("All fields are required");
    }
    const customer = new Customer({
      firstName,
      lastName,
      email,
      contactNumber,
      status,
      membershipData,
    });
    await customer.save();
    res
      .status(201)
      .json({ customer, message: "Customer created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({
      updated,
      message: "Customer updated successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
