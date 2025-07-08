export const ProjectsSectionSkeleton = () => {
  return (
    <div className="py-20">
      <div className="h-10 bg-muted rounded-md w-1/3 mx-auto mb-12 animate-pulse"></div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-muted/50 border border-border rounded-lg p-6 flex flex-col h-full animate-pulse"
          >
            <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="h-5 bg-muted rounded-full w-20"></div>
              <div className="h-5 bg-muted rounded-full w-24"></div>
              <div className="h-5 bg-muted rounded-full w-16"></div>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <div className="h-10 bg-muted rounded-md w-28"></div>
              <div className="h-10 bg-muted rounded-md w-28"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
