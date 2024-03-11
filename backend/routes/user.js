const express = require("express");
const router = express.Router();
const multer = require("multer");
// const {createReadStream, readStream}= require('multer')
const fs = require("fs");

const isLogin = require("../middlewares/isLogin");
const { User } = require("../models/user");
const { Slot } = require("../models/slot");
const upload = multer({ dest: "images/" });
const {google} = require('googleapis')
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets"
})
const SPREADSHEET_ID= "1pbIZUElUjnHgtwoPUiR36BW25MlrW72goRFtzkLarIw"

router.get("/getUser", isLogin, async (req, res) => {
  try {
    const email = req.query.email;

    if (email == "null") {
      const user = req.user;
      return res.status(200).json({ user: user });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("User with this email does not exist");
    }

    return res.status(200).json({ user: user });
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
});

router.put("/changeSlot", isLogin, async (req, res) => {
  try {
    let qSlot = req.query.slot;
    if (qSlot == "null") {
      qSlot = null;
    }

    const user = await User.findOne({ email: req.user.email });

    if (user.opened==false) {
      return res.status(501).send("Slot change window is not open");
    }

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1",
    });
    const rows = response.data.values;
    const rowIndex = rows.findIndex((row) => row[1] == user.enrollment);

    let preSlot = await Slot.findOne({ name: user.slot });

    if (preSlot != null && preSlot != "null" && qSlot == null) {
      user.slot = null;
      user.opened=false
      await user.save();
      preSlot.filledSeats = Number(preSlot.filledSeats) - 1;
      await preSlot.save();
      rows[rowIndex] = [user.name, user.enrollment, 0];
      const updateResponse = await googleSheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: `Sheet1!A${rowIndex + 1}:Z${rowIndex + 1}`, // +1 to convert 0-indexed to 1-indexed
        valueInputOption: "RAW",
        requestBody: {
          values: [rows[rowIndex]],
        },
      });
      return res.status(200).json({ user: user });
    }

    if (!qSlot && (preSlot == null || preSlot == "null")) {
      user.slot = null;
      user.opened=false
      await user.save();
      rows[rowIndex] = [user.name, user.enrollment, 0];
      const updateResponse = await googleSheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: `Sheet1!A${rowIndex + 1}:Z${rowIndex + 1}`, // +1 to convert 0-indexed to 1-indexed
        valueInputOption: "RAW",
        requestBody: {
          values: [rows[rowIndex]],
        },
      });
      return res.status(200).json({ user: user });
    }
    const slotNew = await Slot.findOne({ name: qSlot });
    if (!slotNew) {
      return res.status(404).send(`This slot doesn't exists`);
    }
    if (slotNew.totalSeats - slotNew.filledSeats < 1) {
      return res.status(404).send(`No seats available in this slot`);
    }

    user.slot = qSlot;
    user.opened=false
    await user.save();
    slotNew.filledSeats = slotNew.filledSeats + 1;
    await slotNew.save();
    if (preSlot != null && preSlot != "null") {
      preSlot.filledSeats = preSlot.filledSeats - 1;
      await preSlot.save();
    }
    rows[rowIndex] = [user.name, user.enrollment, qSlot];
    const updateResponse = await googleSheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `Sheet1!A${rowIndex + 1}:Z${rowIndex + 1}`, // +1 to convert 0-indexed to 1-indexed
      valueInputOption: "RAW",
      requestBody: {
        values: [rows[rowIndex]],
      },
    });

    return res.status(200).json({ user: user });
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
});

router.put("/uploadImage", isLogin, upload.single("file"), async (req, res) => {
  try {
    const imageName = req.file.filename;
    const user = await User.findOne({ email: req.user.email });
    user.image = imageName;
    await user.save();

    return res.status(200).send({ message: "Image uploaded successfully!" });
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
});

router.get("/image", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email || email === "null") {
      const imageName = req.user.image;
      const readStream = createReadStream(`images/${imageName}`);
      readStream.pipe(res);
      return;
    }
    const user = await User.findOne({ email: email });
    if (user == null) {
      return res.status(404).json("User with this email does not exist");
    }
    const imageName = user.image;
    if (!imageName) {
      return res.status(404).json("No Image for this user");
    }
    const readStream = fs.createReadStream(`images/${imageName}`);
    readStream.pipe(res);
    return;
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
});

router.get("/allSlots", isLogin, async (req, res) => {
  try {
    const slots = await Slot.find();

    const newSlots = slots.map(async (slot) => {
      const users = await User.find({ slot: slot.name });
      // slot.users= users

      const newSlot = {
        name: slot.name,
        end_time: slot.end_time,
        start_time: slot.start_time,
        totalSeats: slot.totalSeats,
        filledSeats: slot.filledSeats,
        users: users,
      };

      return newSlot;
    });

    const resp = await Promise.all(newSlots);
    return res.status(200).json({ slots: resp });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
