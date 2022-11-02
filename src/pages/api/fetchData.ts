import { table } from "@/utils/helpers/airtable";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const records = await table
      .select({
        view: "Pending",
      })
      .all();

    const all = records.map((record) => {
      return {
        id: record.id,
        fields: record.fields,
      };
    });

    return res.status(200).json({
      data: all,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export default handler;
