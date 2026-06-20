import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getUser() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getUser();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, content } = body;

    const { data, error } = await supabase
      .from("notes")
      .update({
        title,
        content,
        updated_at: new Date(),
      })
      .eq("id", params.id)
      .eq("user_id", session.user.id) // 🔒 security
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  context: any
) {
  try {
    const { params } = await context;

    const session = await getUser();

    console.log("DELETE PARAMS:", params);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", params.id)
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