import clsx from "clsx";
import { ErrorIcon } from "./Icons";

// interface TextAreaProps extends react textarea element
interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string | null;
  className?: string;
}

export default function TextArea({
  label,
  error,
  className,
  ...props
}: TextAreaProps) {
  return (
    <label className="block text-accent-5">
      {label}
      <textarea
        className={clsx(
          "w-full rounded-5 border border-accent-2 bg-black px-3 text-white outline-none",
          "placeholder:text-accent-2",
          "transition-colors duration-150 ease-in-out",
          "focus:border-accent-5 focus:ring focus:ring-accent-3 focus:ring-opacity-50 focus:ring-offset-0",
          className
        )}
        {...props}
      ></textarea>
      {error && (
        <span className="flex items-center gap-1 py-2 text-error">
          <ErrorIcon />
          <span className="font-light">{error}.</span>
        </span>
      )}
    </label>
  );
}
