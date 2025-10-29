import mongoose from "mongoose";
const mongoDBConnect = () => {
  try {
    mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB - Connected");
  } catch (error) {
    console.log("Error - MongoDB Connection " + error);
  }
};
export default mongoDBConnect;
