import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";
import { FILE_TYPES, MAX_FILE_BYTES, fieldErrors, quoteSchema } from "@/lib/quote";

export async function POST(request: Request) {
  const form = await request.formData();

  // Honeypot: real visitors never fill this field.
  if (form.get("website")) return NextResponse.json({ ok: true });

  const parsed = quoteSchema.safeParse({
    name: form.get("name") ?? "",
    company: form.get("company") ?? "",
    phone: form.get("phone") ?? "",
    email: form.get("email") ?? "",
    service: form.get("service") ?? "",
    equipment: form.getAll("equipment"),
    location: form.get("location") ?? "",
    startDate: form.get("startDate") ?? "",
    duration: form.get("duration") ?? "",
    scope: form.get("scope") ?? "",
  });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const file = form.get("file");
  const upload = file instanceof File && file.size > 0 ? file : null;
  if (upload) {
    const ext = upload.name.slice(upload.name.lastIndexOf(".")).toLowerCase();
    if (upload.size > MAX_FILE_BYTES || !FILE_TYPES.includes(ext)) {
      return NextResponse.json(
        { ok: false, errors: { file: "Attach a PDF, spreadsheet, drawing or image under 10 MB" } },
        { status: 400 },
      );
    }
  }

  if (!writeClient) {
    // No CMS write token yet, so there is nowhere to store the enquiry.
    return NextResponse.json(
      { ok: false, message: "The enquiry form is not connected yet. Please call or WhatsApp us instead." },
      { status: 503 },
    );
  }

  try {
    const asset = upload
      ? await writeClient.assets.upload("file", Buffer.from(await upload.arrayBuffer()), { filename: upload.name })
      : null;
    await writeClient.create({
      _type: "quoteRequest",
      ...parsed.data,
      status: "new",
      submittedAt: new Date().toISOString(),
      ...(asset ? { attachment: { _type: "file", asset: { _type: "reference", _ref: asset._id } } } : {}),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote request could not be saved", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't send your request. Please try again, or call us." },
      { status: 500 },
    );
  }
}
