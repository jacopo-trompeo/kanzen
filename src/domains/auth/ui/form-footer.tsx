import { Link, type LinkOptions } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface FormFooterProps {
  linkTo: LinkOptions["to"];
  text: string;
  linkText: string;
  children: ReactNode;
}

export function FormFooter(props: FormFooterProps) {
  const { linkTo, text, linkText, children } = props;

  return (
    <div className="text-muted-foreground mt-5 flex flex-col gap-5 text-sm">
      <div>
        {text}{" "}
        <Link
          to={linkTo}
          className="text-primary underline-offset-4 hover:underline"
        >
          {linkText}
        </Link>
      </div>
      {children}
    </div>
  );
}
