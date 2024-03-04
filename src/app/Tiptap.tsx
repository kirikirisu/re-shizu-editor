"use client";

import { Editor, BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Footer } from "./Footer";
import { Image } from "./ImageExtension";
import { ImageToolbar } from "./ImageToolbar";
import "./page.css";
import { ImageFrameIcon } from "./icons/ImageFrameIcon";

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
      <Footer editor={editor} />
      <BubbleMenu editor={editor as Editor}>
        {editor?.isActive("image") ? (
          <ImageToolbar editor={editor} />
        ) : (
          <div>for link</div>
        )}
      </BubbleMenu>
      :
    </>
  );
};

export default Tiptap;
