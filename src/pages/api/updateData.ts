import { table } from "@/utils/helpers/airtable";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { fields } = req.body;

    const updatedRecord = await table.update(fields);

    return res.status(200).json({
      data: updatedRecord,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error",
    });
  }
};

export default handler;
