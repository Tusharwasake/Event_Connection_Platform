// import mongoose from 'mongoose';
// import { userModel } from "../models/userModel.js";
// import { FriendRequest } from "../models/friendRequestModel.js";

// const sendFriendRequest = async (req, res) => {
//   const { senderId, receiverId } = req.body;

//   try {
//     const senderObjectId = mongoose.Types.ObjectId(senderId);
//     const receiverObjectId = mongoose.Types.ObjectId(receiverId);

//     const existingRequest = await FriendRequest.findOne({
//       sender: senderObjectId,
//       receiver: receiverObjectId,
//     });
//     if (existingRequest) {
//       return res.status(400).json({ message: "Friend request already sent" });
//     }

//     const newRequest = new FriendRequest({
//       sender: senderObjectId,
//       receiver: receiverObjectId,
//     });
//     await newRequest.save();

//     // Emit friend request notification
//     io.emit("receiveFriendRequest", newRequest);

//     res.status(200).json({ message: "Friend request sent" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const acceptFriendRequest = async (req, res) => {
//   const { requestId } = req.params;

//   try {
//     const request = await FriendRequest.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Friend request not found" });
//     }

//     request.status = "accepted";
//     await request.save();

//     const sender = await userModel.findById(request.sender);
//     const receiver = await userModel.findById(request.receiver);

//     sender.friends.push(receiver._id);
//     receiver.friends.push(sender._id);

//     await sender.save();
//     await receiver.save();

//     // Emit friend request accepted notification
//     io.emit("friendRequestAccepted", {
//       senderId: sender._id,
//       receiverId: receiver._id,
//     });

//     res.status(200).json({ message: "Friend request accepted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const declineFriendRequest = async (req, res) => {
//   const { requestId } = req.params;

//   try {
//     const request = await FriendRequest.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Friend request not found" });
//     }

//     request.status = "declined";
//     await request.save();

//     res.status(200).json({ message: "Friend request declined" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { sendFriendRequest, acceptFriendRequest, declineFriendRequest };
