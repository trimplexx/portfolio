"use client";

export const AnimatedBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative">
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="backdrop-blur"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
