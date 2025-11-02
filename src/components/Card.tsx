import React from 'react';

interface CardProps {
  className?: string;
  gradient?: {
    position: string;
    intensity?: number;
  };
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function Card({ 
  className = '', 
  gradient, 
  children,
  as: Component = 'div'
}: CardProps) {
  const baseOpacity = gradient?.intensity || 0.12;
  const hoverOpacity = baseOpacity + 0.08;
  
  return (
    <Component className={`group relative overflow-hidden ${className}`}>
      {gradient && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-[var(--opacity-base)] group-hover:opacity-[var(--opacity-hover)] transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px 200px at ${gradient.position}, var(--link) 0%, transparent 60%)`,
            '--opacity-base': baseOpacity,
            '--opacity-hover': hoverOpacity,
          } as React.CSSProperties}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
}
