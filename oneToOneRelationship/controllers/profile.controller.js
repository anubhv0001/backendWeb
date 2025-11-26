const Profile = require("../models/Profile.model");
const User = require("../models/User.model");

exports.addProfile = async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const profileExists = await Profile.findOne({ user });
    if (profileExists) {
      return res.status(400).json({ message: "Profile already exists for this user" });
    }

    const newProfile = new Profile({
      bio,
      socialMediaLinks,
      user
    });

    await newProfile.save();

    res.status(201).json({ message: "Profile created successfully", newProfile });
  } catch (error) {
    res.status(400).json({ message: "Error creating profile", error });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");

    res.status(200).json({ profiles });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
};
