const ClientModel = require("../DB.models/clients");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Validates the client data
async function validateClientData(clientData) {
  const { name, email, password, confirmPassword } = clientData;

  // Check if any required fields are missing
  if (!name || !email || !password || !confirmPassword) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  // Check if the password and confirmPassword match
  if (password !== confirmPassword) {
    const error = new Error("Password does not match");
    error.statusCode = 422;
    error.data = { password: "not match" };
    throw error;
  }
}

// Handles client creation
async function createClient(req, res) {
  try {
    const clientData = req.body;

    // Validate the client data
    await validateClientData(clientData);

    // Hash the password
    const hash = await bcrypt.hash(clientData.password, 12);

    // Create a new client instance
    const client = new ClientModel({
      name: clientData.name,
      email: clientData.email,
      password: hash,
    });

    const payload = {
      client: client,
    };

    // Generate JWT token with client payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    // Save the client to the database
    const result = await ClientModel.create(client);

    // Send the successful response with token
    res.status(201).json({ message: "User added successfully", token });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);

    // Determine the appropriate status code, error message, and data
    const statusCode = error.statusCode || 500;
    const message = error.message || "An error occurred";
    const data = error.data || {};

    // Send the error response
    res.status(statusCode).json({ message, data });
  }
}

// Handles client login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Check if email and password are provided
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    // Find the client by email
    const client = await ClientModel.findOne({ email });
    console.log(client);
    
    // Check if the client exists
    if (!client) {
      throw new Error("User does not exist");
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    const payload = {
      email,
      password
    };

    // Generate JWT token with payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Send the successful response with token
    res.status(200).send({ token });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send({ error: "An error occurred while processing your request" });
  }
}

// Export the functions
module.exports = { createClient, loginUser };
