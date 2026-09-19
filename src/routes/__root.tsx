import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
} from "@tanstack/react-router";
import { useEffect } from "react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Posada Luz Caraballo | Hospedaje Turístico en Mérida",
    description:
      "Tu hospedaje turístico en Mérida. Tradición, descanso y la mejor atención familiar frente a la Plaza Milla.",
  },
  "/habitaciones": {
    title: "Habitaciones y Tarifas | Posada Luz Caraballo",
    description:
      "Conoce nuestras cómodas habitaciones matrimoniales, dobles, triples y familiares con baño privado y agua caliente en Mérida.",
  },
  "/disponibilidad": {
    title: "Consultar Disponibilidad y Reservas | Posada Luz Caraballo",
    description:
      "Verifica disponibilidad en tiempo real y gestiona tu reserva directa por WhatsApp con atención inmediata.",
  },
};

function CanonicalManager() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rawPath = location.pathname || "/";
    const cleanPath = rawPath === "/" ? "/" : rawPath.replace(/\/+$/, "").toLowerCase();
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${cleanPath}`;

    // 1. Maintain <link rel="canonical">
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 2. Maintain <meta property="og:url">
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);

    // 3. Keep Titles and Meta Descriptions synchronized
    const seo = ROUTE_SEO[cleanPath] || ROUTE_SEO["/"];
    document.title = seo.title;

    const descMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descMeta) descMeta.setAttribute("content", seo.description);

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", seo.title);

    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", seo.description);

    const twTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", seo.title);

    const twDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", seo.description);
  }, [location.pathname]);

  return null;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CanonicalManager />
      <Outlet />
    </QueryClientProvider>
  );
}
