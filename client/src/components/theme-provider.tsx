"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Use useLayoutEffect to set mounted immediately after hydration
  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until mounted to avoid hydration mismatch and script tag warnings
  if (!mounted) {
    // Return children with a wrapper that has the default theme class
    // This prevents FOUC without needing the next-themes script
    return (
      <div className="light" data-theme="light" suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
