import chapterModel from "../models/chapterModel.js";
import { Router } from "express";

const chapter = Router();

chapter.get("/batch/:batchSlug/:subjectSlug", async (req, res) => {
  try {
    const _slug = req.params.subjectSlug;
    const GetChapter = await chapterModel.find({ subject: _slug }).select(["-__v", "-subject"]);
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=3600");
    res.send({ success: true, Data: GetChapter });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

chapter.post("/batch/:batchSlug/:subjectSlug", async (req, res) => {
  try {
    const _slug = req.params.subjectSlug;
    const { name } = req.body;

    const createChapter = await chapterModel.create({
      name: name,
      subject: _slug,
    });
    res.status(201).send({
      success: true,
      message: `Chapter Created: ${createChapter.name}`,
      slug: createChapter.slug,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

chapter.delete("/batch/:batchSlug/:subjectSlug/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const delChapter = await chapterModel.findByIdAndDelete(_id);
    res.send({ success: true, message: `Chapter Deleted: ${delChapter.name}` });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

export default chapter;
