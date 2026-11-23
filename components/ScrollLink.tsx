"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/**
 * A next/link that treats a click on a link to the current page as a "soft
 * reload": scrolls back to the top and refreshes server data instead of
 * navigating (no white flash). Links to other pages behave normally.
 */
export function ScrollLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const router = useRouter();
  const samePage = typeof href === "string" && pathname === href;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !samePage) return;
    // Leave modified clicks (new tab/window) to the browser.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    router.refresh();
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
