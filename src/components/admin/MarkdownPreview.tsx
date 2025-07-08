// src/components/MarkdownPreview.tsx

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none min-h-[300px] rounded-md border border-input bg-muted/20 p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content || "Brak treści do wyświetlenia w podglądzie."}
      </ReactMarkdown>
    </div>
  );
};
