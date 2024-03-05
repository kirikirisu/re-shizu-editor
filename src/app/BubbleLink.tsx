import { Editor } from "@tiptap/react";
import { useState, ChangeEvent } from "react";
import { LinkIcon } from "./icons/LinkIcon";

export function BubbleLink({ editor }: { editor: Editor }) {
  const [visibleUrlInput, setVisibleUrlInput] = useState(false);
  const [url, setUrl] = useState("");

  const applyUrl = () => {
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();

    setVisibleUrlInput(false);
  };

  const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <>
      {visibleUrlInput ? (
        <form onSubmit={applyUrl} className="input-text">
          <div>
            <input
              placeholder="https://"
              value={url}
              onChange={handleChangeUrl}
            />
            <button type="submit">適用</button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          className="link-icon-button"
          onClick={() => {
            setVisibleUrlInput(true);
          }}
        >
          <LinkIcon width="1.12rem" height="1.12rem" />
        </button>
      )}
    </>
  );
}
