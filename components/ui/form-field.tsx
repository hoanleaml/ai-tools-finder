import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Alert, AlertDescription } from "./alert";

export interface FormFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, error, description, required, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const descriptionId = description ? `${inputId}-description` : undefined;

    // Build aria-describedby string
    const ariaDescribedBy = [
      errorId,
      descriptionId,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {description && (
          <p
            id={descriptionId}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        {error && (
          <Alert variant="destructive" id={errorId} role="alert">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };

