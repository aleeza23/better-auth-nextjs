"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="p-10">
      <h1>Error</h1>
      <pre>{error.message}</pre>
      <pre>{error.digest}</pre>
    </div>
  );
}