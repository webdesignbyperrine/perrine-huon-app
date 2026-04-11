export default function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-paper-light grain-overlay pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-4 w-32 bg-primary/10 rounded mx-auto mb-4" />
          <div className="h-16 w-64 bg-primary/10 rounded mx-auto mb-6" />
          <div className="h-6 w-96 max-w-full bg-primary/10 rounded mx-auto" />
          <div className="w-24 h-0.5 bg-primary/10 mx-auto mt-8" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-paper border-2 border-primary/10 rounded-sketch-lg overflow-hidden animate-pulse"
            >
              <div className="p-6 pt-8 pb-4 bg-primary/5">
                <div className="w-full h-48 bg-primary/10 rounded-lg" />
              </div>
              <div className="p-6">
                <div className="h-6 w-3/4 bg-primary/10 rounded mb-2" />
                <div className="h-4 w-full bg-primary/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
