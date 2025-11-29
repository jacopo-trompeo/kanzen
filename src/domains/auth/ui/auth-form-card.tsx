import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/domains/shared/components/ui/card";

interface AuthFormCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthFormCard({
  title,
  description,
  children,
}: AuthFormCardProps) {
  return (
    <Card className="w-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
