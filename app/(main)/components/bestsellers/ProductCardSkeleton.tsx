export default function ProductCardSkeleton() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center animate-pulse">
      <div className="w-full aspect-[3/4] bg-gray-300 rounded" />
      <div className="text-center mt-4 w-full space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
      <div className="flex gap-2 mt-4">
        <div className="w-9 h-9 rounded-full bg-gray-300" />
        <div className="w-9 h-9 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}
