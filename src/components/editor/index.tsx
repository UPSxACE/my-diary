"use client";

import { RichTextEditor } from "@mantine/tiptap";
import { Editor as EditorTipTap } from "@tiptap/react";
import { KeyboardEvent } from "react";

interface EditorProps {
  editor: EditorTipTap | null;
}

export default function Editor({ editor }: EditorProps) {
  function handleTab(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      editor?.commands.insertContent("    ");
    }
  }

  const editorButtonClasses = {
    control:
      "h-auto w-auto p-1  text-xl border-0 !rounded-none   *:!h-5 *:!w-auto",
  };

  return (
    <RichTextEditor
      className="flex flex-1 flex-col overflow-hidden"
      onKeyDown={handleTab}
      editor={editor}
    >
      <RichTextEditor.Toolbar className="gap-x-10 rounded-none dark:bg-mantine-dark-6">
        <RichTextEditor.ControlsGroup className="rounded-none ">
          <RichTextEditor.Blockquote classNames={editorButtonClasses} />
          <RichTextEditor.CodeBlock classNames={editorButtonClasses} />
          <RichTextEditor.BulletList classNames={editorButtonClasses} />
          <RichTextEditor.OrderedList classNames={editorButtonClasses} />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 classNames={editorButtonClasses} />
          <RichTextEditor.H2 classNames={editorButtonClasses} />
          <RichTextEditor.H3 classNames={editorButtonClasses} />
          <RichTextEditor.H4 classNames={editorButtonClasses} />
          <RichTextEditor.H5 classNames={editorButtonClasses} />
          <RichTextEditor.H6 classNames={editorButtonClasses} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold classNames={editorButtonClasses} />
          <RichTextEditor.Code classNames={editorButtonClasses} />
          <RichTextEditor.Italic classNames={editorButtonClasses} />
          <RichTextEditor.Underline classNames={editorButtonClasses} />
          <RichTextEditor.Strikethrough classNames={editorButtonClasses} />
          <RichTextEditor.ClearFormatting classNames={editorButtonClasses} />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Hr classNames={editorButtonClasses} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <div className="relative  w-full flex-1">
        <RichTextEditor.Content
          classNames={
            { content: "dark:bg-mantine-dark-6 h-full *:min-h-full" } as any
          }
          className="absolute h-full w-full flex-1 overflow-auto bg-white *:min-h-full  dark:bg-mantine-dark-6"
        />
      </div>
    </RichTextEditor>
  );
}
