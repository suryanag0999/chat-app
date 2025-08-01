import { Webhook } from "svix";
import User from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const handleClerkWebhook = async (req, res) => {
  console.log("User Creation");
  try {
    const CLERK_WEBHOOK_SECRET_KEY = process.env.CLERK_WEBHOOK_SECRET_KEY;

    if (!CLERK_WEBHOOK_SECRET_KEY) {
      console.error(
        "❌ Error: CLERK_WEBHOOK_SECRET_KEY is missing in .env file"
      );
      return res.status(500).json({ success: false, message: "Server Error" });
    }
    const svixHeaders = req.headers;
    const payloadString = req.body;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);

    console.log(evt);

    //Destructure the event data, extracting the id field and putting all other fields into an attributes object

    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    console.log(eventType);

    console.log(`Recived webhook: ID ${id}, Event Type: ${eventType}`);
    console.log("Payload Data/Attributes: ", attributes);

    if (eventType === "user.created") {
      try {
        console.log("user created triggred");
        //Sending the data to mongodb
        const userExists = await User.findOne({ clerkUserId: id });
        console.log("Result is", userExists);

        if (!userExists) {
          const newUser = new User({
            clerkUserId: id,
            email: attributes.email_addresses[0].email_address,
            userName: attributes.username,
            firstName: attributes.first_name || "",
            lastName: attributes.last_name || "",
            profileImage: attributes.image_url || "",
          });

          await newUser.save();
          console.log("userSaved to MongoDb", newUser);
        } else {
          console.log("User already exists in MongoDB");
        }
        res.status(200).json({ success: true, message: "User Created" });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Failed to create user",
        });
      }
    } else if (eventType === "user.updated") {
      try {
        // Find the user with the id
        const updateUser = await User.updateOne(
          { clerkUserId: id },
          {
            $set: {
              email: attributes.email_addresses[0].email_address,
              firstName: attributes.first_name,
              lastName: attributes.last_name,
              username: attributes.username,
              profileImage: attributes.profile_image_url,
            },
          }
        );
        //Validate
        if (updateUser.modifiedCount > 0) {
          console.log(`User with clerkUserId${id} updated successfully`);
        } else {
          console.log(`No user with clerkUserId${id}`);
        }
        res
          .status(200)
          .json({ success: true, message: "user updated succesfully" });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "User is not updated" });
      }
    } else if (eventType === "user.deleted") {
      try {
        const deletedUser = await User.deleteOne({ clerkUserId: id });
        if (deletedUser.deletedCount > 0) {
          console.log(`User with clerkUserId ${id} deleted successfully`);
          res
            .status(200)
            .json({ success: true, message: "User deleted Successfully" });
        } else {
          console.log(`No User with clerkUserId ${id}`);
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Something went wrong, while deleting",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//getUsers for sidebar
const getUsersForSidebar = async (req, res) => {
  try {
    const { userId } = req.auth();
    const currentUser = userId;
    const filteredUsers = await User.find({
      clerkUserId: { $ne: currentUser },
    });

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUserForSidebar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { handleClerkWebhook, getUsersForSidebar };
