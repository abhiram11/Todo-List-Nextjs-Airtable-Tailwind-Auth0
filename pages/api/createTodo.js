import { table, minifyRecords } from "./utils/Airtable";

export default async (req, res) => {
  const { description } = req.body;
  try {
    // create() takes array of objects that have a field property
    const createdRecords = await table.create([{ fields: { description } }]); //since key and value have same name, else description : description
    //returns an array ^
    const createdRecord = {
      id: createdRecord[0].id,
      fields: createRecord[0].fields,
    };
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(createdRecord);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
