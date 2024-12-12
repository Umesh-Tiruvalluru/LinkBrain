import express from "express";
import { userMiddleware } from "../middleware";
import { ContentModel, LinkModel } from "../models/db";
import { randomBytes } from "crypto";

const shareRouter = express.Router();

shareRouter.post("/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  const hash = randomBytes(10).toString("hex");

  if (share) {
    try {
      const exisitingLink = await LinkModel.findOne({ userId: req.userId });

      if (exisitingLink) {
        res.json({
          hash: exisitingLink.hash,
        });
        return;
      }

      await LinkModel.create({
        hash: hash,
        userId: req.userId,
      });

      res.json({ hash: hash });
    } catch (e) {
      res.json({ message: "Invalid Server Error" });
    }
  } else {
    try {
      await LinkModel.deleteOne({ userId: req.userId });
      res.json({ message: "Stopped sharing" });
    } catch (e) {
      res.json({ message: "Invalid Server Error" });
    }
  }
});

shareRouter.get("/share", async (req, res) => {
  const userId = req.userId;
  try {
    const response = await LinkModel.find({ userId });

    if (response.length === 0) {
      res.status(404).json({ message: "Link doesn't exist" });
      return;
    }

    res.status(200).json({ res: response[0].hash });
  } catch (e) {
    console.error(e);
  }
});

shareRouter.get("/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({ hash });

  if (!link) {
    res.json({ message: "sorry incorrect inputs" });
    return;
  }
  const content = await ContentModel.find({ userId: link.userId }).populate(
    "userId tags",
    "email tag"
  );

  res.json({ content });
});

export default shareRouter;
