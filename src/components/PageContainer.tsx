import React, { useEffect } from "react";

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  children,
}) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", description);
      } else {
        const metaTag = document.createElement("meta");
        metaTag.name = "description";
        metaTag.content = description;
        document.head.appendChild(metaTag);
      }
    }
  }, [title, description]);

  return <div className="container">{children}</div>;
};

export default PageContainer;
