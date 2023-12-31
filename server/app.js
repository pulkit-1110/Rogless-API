const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
require("module-alias/register");
require("dotenv").config();

const { AccountRouter, ResourceRouter } = require("../routers/index");
const {
  CommunicationServiceManager,
  ResourceServiceManager,
} = require("../services/index");
const {
  AccountRepository,
  ResourceRepository,
} = require("../repositories/index");

class App {
  static app;

  static async startServer() {
    this.app = express();
    this.app.use(express.urlencoded({ limit: "100mb", extended: true }));
    this.app.use(express.json({ limit: "100mb" }));

    await CommunicationServiceManager.mountService();
    await ResourceServiceManager.mountService();
    await AccountRepository.initializeRepository();
    await ResourceRepository.initializeRepository();

    this.app.use("/", AccountRouter.getRoutes());
    this.app.use("/resources", ResourceRouter.getRoutes());

    const port = process.env.PORT || 3030;
    const mongoUri = process.env.MONGODB_URI;

    await mongoose.connect(mongoUri);
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error"));

    this.app.listen(port, () => {
      console.log(`Application started successfully on port ${port}`);
    });
  }
}

App.startServer();
