import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function getUser() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    console.log("PUT PARAMS:", params);

    const session = await getUser();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { title, content, folder_id } = body;

    const { data, error } = await supabase
      .from("notes")
      .update({
        title,
        content,
        folder_id: folder_id || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);

    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("DELETE ID:", id);

    const session = await getUser();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select();

    console.log("DELETE ERROR:", error);
    console.log("DELETE DATA:", data);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      deleted: data,
    });
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
