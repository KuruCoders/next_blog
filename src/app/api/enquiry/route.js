import db from "../../../utils/db";
import EnquiryModel from "../../../models/Enquiry";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    const enquiry = { name, email, message };

    await db();

    const result = await EnquiryModel.create(enquiry);
    if (result) return Response.json({ message: "success" });
    else return Response.json({ message: "errro" });
  } catch (error) {
    return Response.json({ message: error._message });
  }
}
