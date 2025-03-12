"use client";

import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Controller, Control } from "react-hook-form";

interface JoditInputProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  className?: string;
}

const JoditInput: React.FC<JoditInputProps> = ({ control, name, placeholder, className }) => {
  const editor = useRef<any | null>(null);

  const config = useMemo(() => ({
    readonly: false,
    toolbarAdaptive: false,
    placeholder: placeholder || "Start typing...",
    buttons: [
      "bold", "italic", "underline", "paragraph", "|",
      "h1", "h2", "h3", "h4", "h5", "h6", "|", "redo", "undo", "ul", "ol", "align", "link", "|",
       "strikethrough", "superscript", "subscript",
      "|", "image", 
    ],
    toolbarSticky: false,
    tooltip: {
      showDelay: 100,
      hideDelay: 100,
      position: "top",
    },
    events: {
      afterInit: (editor: any) => {
        // Ensure tooltips are properly positioned
        document.querySelectorAll(".jodit-ui-tooltip").forEach((tooltip: Element) => {
          (tooltip as HTMLElement).style.transform = "translateY(-5px )";
        });

        // Handle "More" button clicks
        editor.events.on("mousedown", (event: MouseEvent) => {
          const target = (event.target as HTMLElement)?.closest(".jodit-toolbar-button[data-button]");
          if (target) {
            const buttonName = target.getAttribute("data-button");
            if (buttonName) {
              editor.execCommand(buttonName);
            }
            event.preventDefault();
          }
        });
      },
    },
  }), [placeholder]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <JoditEditor
          ref={editor}
          value={field.value}
          config={config}
          tabIndex={1}
          className={`border border-gray-300 rounded-md p-2 ${className || ""}`}
          onBlur={(newContent) => field.onChange(newContent)}
        />
      )}
    />
  );
};

export default JoditInput;
