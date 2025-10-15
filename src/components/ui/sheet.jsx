// Lightweight Sheet component built on Radix Dialog to match shadcn/ui API
// Usage: import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";


export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({ className = "", side = "right", children, ...props }) {
  const sideClasses = {
    top: "inset-x-0 top-0 h-auto border-b",
    bottom: "inset-x-0 bottom-0 h-auto border-t",
    left: "inset-y-0 left-0 h-full w-80 border-r",
    right: "inset-y-0 right-0 h-full w-80 border-l",
  }[side];

  // Keyframe classes we’ll drive with data-state (open/closed)
  const motionBySide = {
    left:
      "data-[state=open]:animate-[sheet-slide-in-left_280ms_cubic-bezier(0.22,1,0.36,1)] " +
      "data-[state=closed]:animate-[sheet-slide-out-left_240ms_ease-in]",
    right:
      "data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right",
    top:
      "data-[state=open]:animate-slide-in-from-top data-[state=closed]:animate-slide-out-to-top",
    bottom:
      "data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom",
  }[side];

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 
      data-[state=open]:animate-[sheet-fade-in_200ms_ease-out]
      data-[state=closed]:animate-[sheet-fade-out_180ms_ease-in]" />
      <Dialog.Content
        className={`fixed z-50 bg-background shadow-xl outline-none ${sideClasses} ${motionBySide} animate-slide-in-from-left ${className}`}
        {...props}
      >
        {/* A11y: give the dialog an accessible name + description */}
        <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
        <Dialog.Description className="sr-only">
          Open the menu to navigate to sections of the site.
        </Dialog.Description>

        <Dialog.Close asChild>
          <button
            type="button"
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function SheetHeader({ className = "", children, ...props }) {
  return (
    <div className={`grid gap-1.5 p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SheetTitle({ className = "", children, ...props }) {
  return (
    <Dialog.Title className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </Dialog.Title>
  );
}

export function SheetDescription({ className = "", children, ...props }) {
  return (
    <Dialog.Description className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </Dialog.Description>
  );
}
