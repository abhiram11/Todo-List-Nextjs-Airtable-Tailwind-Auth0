import { table, getMinifiedRecord } from "./utils/Airtable";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { id, fields } = req.body;
  try {
    const updatedRecords = await table.update(id, { ...fields });
    res.statusCode = 200;
    res.json(getMinifiedRecord(updatedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
