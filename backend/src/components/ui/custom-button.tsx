import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function CustomButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-purple text-white focus:ring-brand-purple',
    secondary: 'btn-green text-white focus:ring-brand-green',
    outline: 'border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white hover:transform hover:translateY(-2px) hover:shadow-lg focus:ring-brand-purple transition-all duration-300',
    ghost: 'text-gray-700 hover:text-black hover:bg-gray-100 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}