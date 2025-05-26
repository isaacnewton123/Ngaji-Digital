/// <reference types="react-scripts" />

declare module 'react-markdown' {
  import React from 'react';
  
  interface ReactMarkdownProps {
    children: string;
    remarkPlugins?: any[];
    components?: {
      [nodeType: string]: React.ComponentType<{
        node?: any;
        children?: React.ReactNode;
        [key: string]: any;
      }>;
    };
  }
  
  const ReactMarkdown: React.FC<ReactMarkdownProps>;
  export default ReactMarkdown;
}

declare module 'remark-gfm' {
  const remarkGfm: any;
  export default remarkGfm;
}
