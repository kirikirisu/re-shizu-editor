"use client";

import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Footer } from "./Footer";
import { Image } from "./ImageExtension";
import "./page.css";

const extensions = [StarterKit, Image];

const content = `<p>Hello World!</p><figure class="e-image" data-natural-width="700" data-natural-height="400" data-size="default" data-style="default"><img src="https://placehold.jp/700x400.png" width="700" height="400" alt="sushi" /></figure>`;

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <>
      <EditorContent editor={editor} />
      <Footer />
    </>
  );
};

export default Tiptap;
