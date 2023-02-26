import { ErrorIcon } from "./components/Icons";

export function ErrorFallback({
  children = "There was a problem. Sorry.",
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="border-error h-20 rounded-5 text-error absolute inset-0 flex justify-center pt-4">
        <div className="text-error text-center">
          <div className="text-lg text-error gap-1 font-bold flex justify-center">
            <ErrorIcon /> Error
          </div>
          <div className="px-2 text-base">{children}</div>
        </div>
      </div>
    </div>
  );
}
