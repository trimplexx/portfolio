import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error("Hasło administratora nie jest skonfigurowane w .env");
    }

    if (password === adminPassword) {
      (await cookies()).set("admin-password", adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ message: "Zalogowano pomyślnie" });
    } else {
      return NextResponse.json(
        { message: "Nieprawidłowe hasło" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Błąd logowania:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera" },
      { status: 500 }
    );
  }
}
