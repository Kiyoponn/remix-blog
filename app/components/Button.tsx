import { Link } from "@remix-run/react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  type?: "button" | "submit" | "reset";
  name?: string;
  value?: string;
  disabled?: boolean;
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const buttonStyles = cva(
  [
    "flex items-center font-medium capitalize justify-center border border-transparent transition-all rounded-5 px-3 outline-none",
    "focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0",
  ],
  {
    variants: {
      size: {
        small: "h-8 text-base leading-md",
        medium: "h-10 text-base leading-md",
        large: "h-12 text-md leading-lg",
      },
      width: {
        fit: "w-fit",
        full: "w-full",
      },
      variant: {
        default: [
          "duration-150 ease-in-out ",
          "hover:bg-black hover:text-white hover:border-white",
        ],
        shadow: [
          "duration-150 ease-in-out translate-x-0",
          "hover:-translate-y-[2px]",
        ],
        ghost: "!bg-black hover:bg-accent",
      },
      color: {
        primary: "bg-white text-black",
        secondary: [
          "!bg-black text-accent-5 border-accent-3",
          "hover:text-white",
        ],
        error: "bg-error !text-white",
        warning: "bg-warning !text-white",
        alert: "bg-pink !text-white",
        violet: "bg-violet !text-white",
      },
    },

    compoundVariants: [
      // default
      {
        variant: "default",
        color: "error",
        class: "hover:border-error hover:!text-error",
      },
      {
        variant: "default",
        color: "alert",
        class: "hover:border-pink hover:!text-pink",
      },
      {
        variant: "default",
        color: "warning",
        class: "hover:border-warning hover:!text-warning",
      },
      {
        variant: "default",
        color: "violet",
        class: "hover:border-violet hover:!text-violet",
      },

      // ghost
      {
        variant: "ghost",
        color: "primary",
        class: [" !text-white", "hover:!bg-accent"],
      },
      {
        variant: "ghost",
        color: "secondary",
        class: ["!border-transparent ", "hover:text-accent-5 hover:!bg-accent"],
      },
      {
        variant: "ghost",
        color: "error",
        class: [
          "!text-error bg-gradient-to-r from-lighten to-lighten",
          "hover:!bg-error",
        ],
      },
      {
        variant: "ghost",
        color: "warning",
        class: [
          "!text-warning bg-gradient-to-r from-lighten to-lighten",
          "hover:!bg-warning",
        ],
      },
      {
        variant: "ghost",
        color: "alert",
        class: [
          "!text-pink bg-gradient-to-r from-lighten to-lighten",
          "hover:!bg-pink",
        ],
      },
      {
        variant: "ghost",
        color: "violet",
        class: [
          "!text-violet bg-gradient-to-r from-lighten to-lighten",
          "hover:!bg-violet",
        ],
      },
    ],

    defaultVariants: {
      size: "medium",
      width: "fit",
      variant: "default",
      color: "primary",
    },
  }
);

export const Button = ({
  children,
  href,
  size,
  width,
  variant,
  color,
  className,
  ...props
}: ButtonProps) => {
  return (
    <>
      {href ? (
        <Link to={href} className="w-fit">
          <button
            type="button"
            className={clsx(buttonStyles({ size, variant, color }), className)}
          >
            {children}
          </button>
        </Link>
      ) : (
        <button
          className={clsx(
            buttonStyles({ size, width, variant, color }),
            "disabled:bg-black disabled:text-accent-3 disabled:border-accent-2 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};
