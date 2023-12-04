const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_CONNECTION_STRING);

mongoose.connection.on("connected", () => {
  console.log("Connected DB !");
});

mongoose.connection.on("error", (error) => {
  console.log("DB connection Error =============>", error);
});
