/*
// API endpoints for updating and deleting a devlog

import { NextRequest, NextResponse } from "next/server";
import {
  parseRequestBody,
  patchDevlogSchema,
  schemaIdInput,
} from "@/app/api/validationSchemas";
import { prisma } from "@/lib/prisma";
// Ensure patchDevlogSchema is imported or available in this file

type Params = Promise<{ id: string }>;

export async function PATCH(
  request: NextRequest,
  inputData: { params: Params }
) {
  // Extract and validate the devlog id (from the URL path)
  const params = await inputData.params;
  const devlogId = params.id;
  const idValidation = schemaIdInput.safeParse({ id: devlogId });
  if (!idValidation.success) {
    return NextResponse.json(idValidation.error.errors, { status: 400 });
  }

  // Parse and validate the request body against the devlog schema
  const body = await parseRequestBody(request);
  if (!body) {
    return NextResponse.json(
      { error: "Request body is empty or contains invalid JSON." },
      { status: 400 }
    );
  }

  const devlogValidation = patchDevlogSchema.safeParse(body);
  if (!devlogValidation.success) {
    return NextResponse.json(devlogValidation.error.errors, { status: 400 });
  }

  const password = body.password;
  const secretPassword = process.env.ADMIN_PWD;
  if (password !== secretPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 403 });
  }

  // Update the devlog with the provided fields
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
  } catch {
    return NextResponse.json(
      { error: "Error updating devlog." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  inputData: { params: Params }
) {
  // Extract and validate the devlog id
  const params = await inputData.params;
  const devlogId = params.id;
  const idValidation = schemaIdInput.safeParse({ id: devlogId });
  if (!idValidation.success) {
    return NextResponse.json(idValidation.error.errors, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const password = searchParams.get("pwd");
  const secretPassword = process.env.ADMIN_PWD;
  if (password !== secretPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 403 });
  }

  // Directly delete the devlog entry. (Remove any dependency checks if they don't apply.)
  try {
    await prisma.devlog.delete({
      where: { id: devlogId },
    });
    return NextResponse.json({}, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error deleting devlog." },
      { status: 500 }
    );
  }
}
*/

// keep file valid
export const placeholder = true;
