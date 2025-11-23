import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json([
    { id: 1, name: "Daniel Gerhard Brown" },
    { id: 2, name: "William Shakespeare" },
  ]);
});


export default router;
