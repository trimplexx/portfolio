export const ProjectsTableSkeleton = () => (
  <div className="animate-pulse bg-muted/30 border border-border shadow-md rounded-lg">
    <div className="flex justify-between items-center border-b border-border p-4 font-semibold text-muted-foreground">
      <div className="h-4 bg-muted rounded w-1/3"></div>
      <div className="h-4 bg-muted rounded w-1/6"></div>
    </div>
    <div className="divide-y divide-border">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex justify-between items-center p-4">
          <div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/4"></div>
          </div>
          <div className="h-8 bg-muted rounded w-full"></div>
        </div>
      ))}
    </div>
  </div>
);
