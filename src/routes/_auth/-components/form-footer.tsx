import { Link, type LinkOptions } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface FormFooterProps {
  to: LinkOptions["to"];
  text: string;
  linkText: string;
  children: ReactNode;
}

export function FormFooter(props: FormFooterProps) {
  const { to, text, linkText, children } = props;

  return (
    <div className="mt-5 flex flex-col gap-5 text-muted-foreground text-sm">
      <div>
        {text}{" "}
        <Link
          to={to}
          className="text-primary underline-offset-4 hover:underline"
        >
          {linkText}
        </Link>
      </div>
      {children}
    </div>
  );
}
