import bcrypt from "bcryptjs";
import Message from "../models/message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";





export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");

    if (users.length === 0) {
      return res.status(200).json({ message: "No contacts available" });
    }

    res.status(200).json(users);

  } catch (error) {
    console.log("Error in getAllContacts controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userTochatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userTochatId },
        { senderId: userTochatId, receiverId: myId }
      ]
    });

    res.status(200).json(messages);

  } catch (error) {
    console.log("Error in getMessagesByUserId controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image required" });
    }

    // Prevent messaging yourself
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "You cannot message yourself" });
    }

    // Check if receiver exists
    const receiverExists = await User.exists({ _id: receiverId });

    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Upload image if exists
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id.toString();

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId }
      ]
    });

    const chatPartnersId = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      )
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnersId }
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in getChatPartners controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};