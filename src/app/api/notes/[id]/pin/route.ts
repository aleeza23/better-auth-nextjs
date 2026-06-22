import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { is_pinned } = await req.json();

  const { data, error } = await supabase
    .from("notes")
    .update({
      is_pinned,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", session.user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}