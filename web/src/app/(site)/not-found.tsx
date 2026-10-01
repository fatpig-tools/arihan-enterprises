import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center bg-ink">
      <div className="blueprint absolute inset-0 text-mist" aria-hidden="true" />
      <div className="wrap relative">
        <p className="tag text-accent-soft">Error 404</p>
        <h1 className="display h-page mt-5">Nothing on this site</h1>
        <p className="lede mt-6 max-w-md text-mist/70">The page you were looking for has moved or never existed.</p>
        <div className="mt-9">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
