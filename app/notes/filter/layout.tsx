import { ReactNode } from 'react';

interface FilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div>
      <div>
        {sidebar}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}