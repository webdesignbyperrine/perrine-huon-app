export default function FAQLoading() {
  return (
    <div className="min-h-screen bg-paper-light grain-overlay pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-4 w-48 bg-primary/10 rounded mx-auto mb-4" />
          <div className="h-16 w-64 bg-primary/10 rounded mx-auto mb-6" />
          <div className="h-6 w-96 max-w-full bg-primary/10 rounded mx-auto" />
        </div>

        {/* FAQ Items Skeleton */}
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-paper border-2 border-primary/10 rounded-sketch-lg p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="h-6 w-3/4 bg-primary/10 rounded" />
                <div className="h-6 w-6 bg-primary/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
