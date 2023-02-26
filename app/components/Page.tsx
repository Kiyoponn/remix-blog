import clsx from "clsx";

interface PageProps
  extends React.PropsWithChildren<{
    title?: string;
    pageinfo?: string;
    className?: string;
  }> {}

export default function Page({
  children,
  title,
  pageinfo,
  className,
}: PageProps) {
  return (
    <section className={clsx("mx-auto max-w-3xl", className)}>
      {title ? (
        <h1 className="mt-12 mb-2 text-3xl font-extrabold">{title}</h1>
      ) : null}
      {pageinfo ? <p className="text-md text-accent-6">{pageinfo}</p> : null}
      {children}
    </section>
  );
}
