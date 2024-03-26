import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";
import { EditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);
export const editorExtensions = [
  StarterKit.configure({ codeBlock: false }),
  CodeBlockLowlight.configure({ lowlight }),
  Underline,
];

export default function useEditorInstance(props: Partial<EditorOptions>) {
  const editor = useEditor({
    ...props,
    extensions: editorExtensions,
  });

  return editor;
}
