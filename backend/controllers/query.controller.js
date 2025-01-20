import { askQueryService } from "../services/query.service.js";

const askQuery = async (req, res, next) => {
  try {
    const { query } = req.body;
    res.json({ answer: await askQueryService(query) });
  } catch (err) {
    next(err);
  }
};

export { askQuery };
