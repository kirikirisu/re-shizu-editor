import { Editor, isNodeSelection } from "@tiptap/react";
import { ImageAttributes } from "./ImageExtension";
import { ExpandIcon } from "./icons/ExpandIcon";
import { ShrinkIcon } from "./icons/ShrinkIcon";
import ImageFrameIcon from "./icons/ImageFrameIcon";

const activeColor = "rgb(14 165 233)";
const defaultColor = "#798184";

export function ImageToolbar({ editor }: { editor: Editor }) {
  const { selection } = editor.state;

  if (!isNodeSelection(selection) || selection.node.type.name !== "image")
    return false;

  const imageAttrs = selection.node.attrs as ImageAttributes;

  const isActiveAlt = imageAttrs.alt !== "";
  const isDefaultSize = imageAttrs["data-size"] === "default";
  const isDefaultStyle = imageAttrs["data-style"] === "default";

  const handleChangeSize = () => {
    editor.commands.updateAttributes("image", {
      "data-size": isDefaultSize ? "small" : "default",
    });
  };

  const handleChangeStyle = () => {
    editor.commands.updateAttributes("image", {
      "data-style": isDefaultStyle ? "photo-frame" : "default",
    });
  };

  return (
    <div className="button-toolbar">
      <button
        type="button"
        style={{ color: isActiveAlt ? activeColor : defaultColor }}
      >
        ALT
      </button>
      <button type="button" onClick={handleChangeSize}>
        {isDefaultSize ? (
          <ShrinkIcon color={defaultColor} height="1.8em" width="1.8em" />
        ) : (
          <ExpandIcon color={defaultColor} height="1.8em" width="1.8em" />
        )}
      </button>
      <button type="button" onClick={handleChangeStyle}>
        {isDefaultStyle ? (
          <ImageFrameIcon color={defaultColor} height="1.8em" width="1.8em" />
        ) : (
          <ImageFrameIcon color={activeColor} height="1.8em" width="1.8em" />
        )}
      </button>
    </div>
  );
}
