export const ProjectPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-5 bg-muted rounded-md w-1/4 mx-auto mb-3"></div>
        <div className="h-12 bg-muted rounded-md w-2/3 mx-auto"></div>
      </div>
      <div className="mb-12">
        <div className="w-full aspect-video bg-muted/80 rounded-lg"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-full aspect-video bg-muted/80 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-8 space-y-4">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-5/6"></div>
        </div>
        <div className="md:col-span-4">
          <div className="bg-muted/50 border border-border rounded-lg p-6">
            <div className="h-7 bg-muted rounded w-1/2 mb-6"></div>
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="h-5 bg-muted rounded-full w-20"></div>
              <div className="h-5 bg-muted rounded-full w-24"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-10 bg-muted rounded-md w-full"></div>
              <div className="h-10 bg-muted rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
