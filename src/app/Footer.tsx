"use client";

import { Editor } from "@tiptap/react";
import { ChangeEvent, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { PictureIcon } from "./icons/PictureIcon";
import "react-circular-progressbar/dist/styles.css";

const loadImage = (file: File) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
  });
};

export function Footer({ editor }: { editor: Editor }) {
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

  const charCount = editor.storage.characterCount.characters() as number;
  const charPercentage = (charCount / 14000) * 100;

  return (
    <div className="footer">
      <div>
        <button
          type="button"
          onClick={handleOnClcik}
          className="picture-icon-button"
        >
          <PictureIcon color="#a7abb1" width="1.25rem" height="1.25rem" />
        </button>
        <input
          className="insert-image-input"
          type="file"
          ref={inputRef}
          accept="image/png,image/jpeg,image/gif,image/webp,image/heic"
          onChange={handleOnChange}
        />
      </div>
      <button
        type="button"
        style={{
          width: 35,
          height: 35,
          display: "block",
          backgroundColor: "white",
          borderWidth: 0,
          margin: 0,
          padding: 0,
          cursor: "pointer",
        }}
      >
        <CircularProgressbar
          value={charPercentage}
          text={charCount.toString()}
          styles={buildStyles({
            pathColor: "#696f73",
            trailColor: "#d8dadf",
            textColor: "rgb(141, 146, 152)",
            textSize: "24",
          })}
        />
      </button>
    </div>
  );
}
