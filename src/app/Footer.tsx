"use client";

import { Editor } from "@tiptap/react";
import { ChangeEvent, useRef } from "react";

const loadImage = (file: File) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
  });
};

export function Footer({ editor }: { editor: Editor | null }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const formData = new FormData();
    formData.set("file", event.target.files[0]);

    const { naturalHeight, naturalWidth } = await loadImage(
      event.target.files[0]
    );

    try {
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: formData,
      });
      const { fileName } = await response.json();
      const src = `/upload/${fileName}`;

      editor
        ?.chain()
        .focus()
        .setImage({
          "data-natural-height": naturalHeight,
          "data-natural-width": naturalWidth,
          "data-size": "default",
          "data-style": "default",
          src,
          alt: "",
          height: naturalHeight,
          width: naturalWidth,
        })
        .run();
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const handleOnClcik = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <button type="button" onClick={handleOnClcik}>
        <span>Insert Image</span>
      </button>
      <input
        className="insert-image-input"
        type="file"
        ref={inputRef}
        accept="image/png,image/jpeg,image/gif,image/webp,image/heic"
        onChange={handleOnChange}
      />
    </div>
  );
}
