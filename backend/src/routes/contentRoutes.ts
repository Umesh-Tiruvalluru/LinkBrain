import express from "express";
import { userMiddleware } from "../middleware";
import { ContentModel, TagsModel } from "../models/db";

const contentRouter = express.Router();

contentRouter.post("/content", userMiddleware, async (req, res) => {
  const { title, type, link, tags, description } = req.body;
  const timestamp: number = Date.now();

  const tagIds = await Promise.all(
    tags.map(async (tag: string) => {
      let t = await TagsModel.findOne({ tag });
      console.log(t);
      if (!t) {
        t = await TagsModel.create({ tag });
        console.log(t);
      }
      return t._id;
    })
  );
        
  await ContentModel.create({
    title,
    link,
    type,
    timestamp,
    description,
    userId: req.userId,
    tags: tagIds,
  });

  res.json({ message: "content added" });
});

// End point for getting all the content
contentRouter.get("/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({ userId }).populate(
    "tags userId",
    "tag email"
  );

  res.json({ content });
});

// End Point for delete the content
contentRouter.delete(
  "/content/:contentId",
  userMiddleware,
  async (req, res) => {
    const contentId = req.params.contentId;

    try {
      await ContentModel.deleteOne({ _id: contentId, userId: req.userId });
      res.json({ message: "Delete Successfully" });
    } catch (e) {
      res.status(403).json({ error: e });
    }
  }
);

export default contentRouter;
