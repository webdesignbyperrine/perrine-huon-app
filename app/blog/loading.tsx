export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-paper-light grain-overlay pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-4 w-40 bg-primary/10 rounded mx-auto mb-4" />
          <div className="h-16 w-48 bg-primary/10 rounded mx-auto mb-6" />
          <div className="h-6 w-[500px] max-w-full bg-primary/10 rounded mx-auto" />
          <div className="w-24 h-0.5 bg-primary/10 mx-auto mt-8" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-paper border-2 border-primary/10 rounded-sketch-lg overflow-hidden animate-pulse"
            >
              <div className="h-56 bg-primary/10" />
              <div className="p-6">
                <div className="h-4 w-24 bg-primary/10 rounded mb-3" />
                <div className="h-6 w-full bg-primary/10 rounded mb-3" />
                <div className="h-4 w-full bg-primary/10 rounded mb-2" />
                <div className="h-4 w-3/4 bg-primary/10 rounded" />
                <div className="h-4 w-28 bg-primary/10 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
