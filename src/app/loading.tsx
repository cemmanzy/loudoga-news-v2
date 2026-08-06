export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">

      <div className="text-center">

        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-[#C8102E]" />

        <h2 className="mt-8 text-2xl font-bold text-gray-900">
          Loading...
        </h2>

        <p className="mt-2 text-gray-500">
          Please wait while we fetch the latest news.
        </p>

      </div>

    </main>
  );
}