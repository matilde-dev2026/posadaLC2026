import { useState, useEffect } from "react";
import { initAuth, googleSignIn, getAccessToken, logout } from "../lib/auth";
import {
  Calendar as CalendarIcon,
  LogIn,
  LogOut,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { User } from "firebase/auth";

export function CalendarAvailability({ checkIn, checkOut }: { checkIn: string; checkOut: string }) {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setUser(user);
        setToken(token);
        setNeedsAuth(false);
      },
      () => {
        setNeedsAuth(true);
        setUser(null);
        setToken(null);
      },
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError("");
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Error al iniciar sesión con Google.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setEvents([]);
    setIsAvailable(null);
  };

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      setError("Por favor, selecciona fechas de check-in y check-out primero.");
      return;
    }

    if (!token) {
      setError("No hay token de acceso.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const timeMin = new Date(checkIn).toISOString();
      const timeMax = new Date(checkOut).toISOString();

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error fetching calendar events");
      }

      const data = await response.json();
      setEvents(data.items || []);

      // Basic check: if there are events, it might be busy. We let the user see the events.
      if (data.items && data.items.length > 0) {
        setIsAvailable(false);
      } else {
        setIsAvailable(true);
      }
    } catch (err: any) {
      console.error(err);
      setError("Error al consultar el calendario. Por favor intenta nuevamente.");
      if (err.status === 401) {
        setNeedsAuth(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (needsAuth) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "color-mix(in oklab, var(--primary) 10%, var(--card))",
          borderRadius: "8px",
          border: "1px dashed var(--primary)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          margin: "20px 0",
        }}
      >
        <CalendarIcon size={32} color="var(--primary)" />
        <p style={{ textAlign: "center", margin: 0, fontSize: "0.95rem" }}>
          ¿Eres el administrador? Conecta Google Calendar para verificar si tienes reservas en estas
          fechas.
        </p>
        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            backgroundColor: "#fff",
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontWeight: 600,
            cursor: isLoggingIn ? "not-allowed" : "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {isLoggingIn ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width={20}
              height={20}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          )}
          Sign in with Google
        </button>
        {error && <p style={{ color: "red", fontSize: "0.85rem", margin: 0 }}>{error}</p>}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "var(--card)",
        borderRadius: "8px",
        border: "1px solid var(--border)",
        margin: "20px 0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <CalendarIcon size={20} color="var(--primary)" />
          <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>Google Calendar</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8rem" }}>
          <span style={{ opacity: 0.7 }}>Conectado como {user?.email}</span>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted-foreground)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <LogOut size={14} /> Salir
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <button
          onClick={checkAvailability}
          disabled={loading || !checkIn || !checkOut}
          style={{
            padding: "10px",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: loading || !checkIn || !checkOut ? "not-allowed" : "pointer",
            opacity: loading || !checkIn || !checkOut ? 0.7 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <CalendarIcon size={18} />}
          Verificar Disponibilidad
        </button>

        {error && <p style={{ color: "#d93025", fontSize: "0.85rem", margin: 0 }}>{error}</p>}

        {isAvailable !== null && (
          <div
            style={{
              padding: "15px",
              borderRadius: "6px",
              backgroundColor: isAvailable ? "rgba(52, 168, 83, 0.1)" : "rgba(234, 67, 53, 0.1)",
              border: `1px solid ${isAvailable ? "#34a853" : "#ea4335"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: isAvailable ? "#188038" : "#d93025",
                fontWeight: 700,
                marginBottom: events.length > 0 ? "10px" : 0,
              }}
            >
              {isAvailable ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {isAvailable
                ? "Parece que no hay eventos en estas fechas."
                : "Tienes eventos programados en estas fechas:"}
            </div>

            {events.length > 0 && (
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  fontSize: "0.9rem",
                  color: "var(--foreground)",
                }}
              >
                {events.map((event) => (
                  <li key={event.id} style={{ marginBottom: "6px" }}>
                    <strong>{event.summary}</strong>
                    <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                      {event.start.date
                        ? format(parseISO(event.start.date), "dd MMM", { locale: es })
                        : format(parseISO(event.start.dateTime), "dd MMM HH:mm", { locale: es })}
                      {" - "}
                      {event.end.date
                        ? format(parseISO(event.end.date), "dd MMM", { locale: es })
                        : format(parseISO(event.end.dateTime), "dd MMM HH:mm", { locale: es })}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
