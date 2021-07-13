/* eslint-disable import/no-anonymous-default-export */
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
// giving access to env variables via `process`
//getting reference to the airtable base

const table = base(process.env.AIRTABLE_TABLE_NAME);

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

// since airtable doesnt take unticked checkboxes as FALSE automatically!!
const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }
  // return new object, take all objects and put it into fields, but do it FOR EVERY RECORD => minifyRecords
  return {
    id: record.id,
    fields: record.fields,
  };
};

export { table, getMinifiedRecord, minifyRecords };
