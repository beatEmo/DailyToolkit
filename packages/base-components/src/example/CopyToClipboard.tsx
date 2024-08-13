import CopyToClipboard from "../CopyToClipboard";

export default function Example() {
  return (
    <CopyToClipboard
      text="Hello, world!"
      onCopy={(a, b) => console.log("Copied!", a, b)}
    >
      <button onClick={() => console.log("Button clicked!")}>
        Copy to clipboard
      </button>
    </CopyToClipboard>
  );
}
