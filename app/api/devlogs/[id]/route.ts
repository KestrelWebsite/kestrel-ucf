import { NextRequest, NextResponse } from "next/server";
import {
  parseRequestBody,
  patchDevlogSchema,
  schemaIdInput,
} from "@/app/api/validationSchemas";
import { prisma } from "@/lib/prisma";

// ✅ PATCH: update an existing devlog
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const devlogId = params.id;

  // validate the devlog id
  const idValidation = schemaIdInput.safeParse({ id: devlogId });
  if (!idValidation.success) {
    return NextResponse.json(idValidation.error.errors, { status: 400 });
  }

  // parse the request body
  const body = await parseRequestBody(request);
  if (!body) {
    return NextResponse.json(
      { error: "Request body is empty or contains invalid JSON." },
      { status: 400 }
    );
  }

  // validate devlog data
  const devlogValidation = patchDevlogSchema.safeParse(body);
  if (!devlogValidation.success) {
    return NextResponse.json(devlogValidation.error.errors, { status: 400 });
  }

  // verify password
  const password = body.password;
  const secretPassword = process.env.ADMIN_PWD;
  if (password !== secretPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 403 });
  }

  // update the devlog
  try {
    const updatedDevlog = await prisma.devlog.update({
      where: { id: devlogId },
      data: {
        title: body.title,
        description: body.description,
        videoUrl: body.videoUrl,
        photoUrl: body.photoUrl,
      },
    });
    return NextResponse.json(updatedDevlog);
  } catch (error) {
    console.error("Error updating devlog:", error);
    return NextResponse.json(
      { error: "Error updating devlog." },
      { status: 500 }
    );
  }
}

// ✅ DELETE: remove an existing devlog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const devlogId = params.id;

  // validate the devlog id
  const idValidation = schemaIdInput.safeParse({ id: devlogId });
  if (!idValidation.success) {
    return NextResponse.json(idValidation.error.errors, { status: 400 });
  }

  // get password from query params
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("pwd");
  const secretPassword = process.env.ADMIN_PWD;

  if (password !== secretPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 403 });
  }

  try {
    await prisma.devlog.delete({
      where: { id: devlogId },
    });
    return NextResponse.json({ message: "Devlog deleted successfully." });
  } catch (error) {
    console.error("Error deleting devlog:", error);
    return NextResponse.json(
      { error: "Error deleting devlog." },
      { status: 500 }
    );
  }
}
