import { table, minifyRecords } from "./utils/Airtable";

export default async (req, res) => {
  const { description } = req.body;
  try {
    // create() takes array of objects that have a field property
    const records = await table.create([{ fields: { description } }]);
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
