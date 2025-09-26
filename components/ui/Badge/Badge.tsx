import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        primary: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
        secondary: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200',
        success: 'bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        error: 'bg-red-100 text-red-800 hover:bg-red-200',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
