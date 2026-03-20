import type { ReactNode } from 'react';

export const Card = ({ children, className = '', onClick }: { children: ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary-100 transition-all group' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
