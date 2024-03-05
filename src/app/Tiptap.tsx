"use client";

import { Editor, BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Footer } from "./Footer";
import { Image } from "./ImageExtension";
import { ImageToolbar } from "./ImageToolbar";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import { BubbleLink } from "./BubbleLink";
import "./page.css";

const extensions = [
  StarterKit,
  Image,
  CharacterCount.configure({ limit: 18000 }),
  Link.configure({
    openOnClick: false,
  }),
];

const content = `<p>Hello World!</p><figure class="e-image" data-natural-width="700" data-natural-height="400" data-size="default" data-style="default"><img src="https://placehold.jp/700x400.png" width="700" height="400" alt="sushi" /></figure>`;

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) return false;

  const isSelectLink = editor.isActive("link");
  const isSelectImage = editor.isActive("image");

  return (
    <>
      <EditorContent editor={editor} />
      <Footer editor={editor} />
      <BubbleMenu editor={editor}>
        {isSelectImage ? (
          <ImageToolbar editor={editor} />
        ) : (
          <BubbleLink editor={editor} />
        )}
      </BubbleMenu>
      {isSelectLink && <div>modify link</div>}
    </>
  );
};

export default Tiptap;
