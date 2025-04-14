import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      {/* Home Button */}
      <Link href="/">
        <span className="inline-block bg-customGreen hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer">
          Go Back Home
        </span>
      </Link>
    </div>
  );
}
