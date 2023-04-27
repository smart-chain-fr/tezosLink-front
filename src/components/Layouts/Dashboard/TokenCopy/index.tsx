import { Button } from "@Components/Elements/Button";
import password from "@Assets/icons/password.svg";
import copy from "@Assets/icons/copy.svg";
import InputField from "@Components/Elements/InputField";
import { RefObject, useRef, useState } from "react";
import classes from "./classes.module.scss";

type IProps = {
  token: string;
};

export default function ProjectName(props: IProps): JSX.Element {
  const [copySuccess, setCopySuccess] = useState("Copy to clipboard");
  const textAreaRef: RefObject<HTMLInputElement> = useRef(null);

  const copyToClipboard = async () => {
    textAreaRef.current!.select();
    setCopySuccess("Copied!");
    await navigator.clipboard.writeText(props.token);
  };

  return (
    <div className={classes["root"]}>
      <InputField
        type="text"
        inputStatus="neutral"
        inputRef={textAreaRef}
        icon={password}
        value={props.token}
        name="token"
        onChange={() => {}}
        onBlur={() => {}}
      />
      <Button onClick={copyToClipboard} text={copySuccess} icon={copy} />
    </div>
  );
}
