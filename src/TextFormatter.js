import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaFileDownload, FaCopy } from "react-icons/fa";

export default function TextFormatter() {
  const [text, setText] = useState("");
  const [readTime, setReadTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [copyText, setCopyText] = useState("");
  const [textwarn, setTextWarn] = useState("");

  const handleText = (e) => {
    const word = e.target.value;
    setText(word);
    setCopyText(word);

    //character count
    const words = text.trim().split(/\s+/).length;
    setWordCount(words);

    //time count
    const wpm = 225;
    const time = Math.ceil(words / wpm);
    setReadTime(time);
  };

  // to uppercase
  const changeToUpeer = () => {
    setText(text.toUpperCase());
  };

  // to lowercase
  const changeToLower = () => {
    setText(text.toLowerCase());
  };

  //words capital
  const capitalizeWords = () => {
    const Capitalize = text.split(" ");

    for (var i = 0; i < Capitalize.length; i++) {
      Capitalize[i] =
        Capitalize[i].charAt(0).toUpperCase() + Capitalize[i].slice(1);
    }

    const newText = Capitalize.join(" ");
    setText(newText);
  };

  //download file
  const downloadFile = () => {
    if (text != "") {
      const link = document.createElement("a");
      const blob = new Blob([text], { type: "text/plain" });
      link.href = URL.createObjectURL(blob);
      link.download = "textformatter.txt";
      //   document.body.appendChild(link);
      link.click();
    } else {
      setTextWarn("No text to download");
      setTimeout(() => {
        let get = textwarn;
        get.style.visibility = "hidden";
      }, 3000);
    }
  };

  //copy text
  const copy = () => {
    navigator.clipboard.writeText(copyText);
    alert("copied!");
  };

  return (
    <div className="App m-3">
      <p className="text-center display-5 fst-italic">Text Formatter</p>
      {/* <textarea value={text} onChange={handleText} /> */}
      <div className="form-group">
        <textarea
          value={text}
          onChange={handleText}
          className="form-control bg-light"
          rows="5"
          cols="10"
        />
      </div>
      <div className="d-flex justify-content-around mt-3">
        <p className="border-bottom border-warning">
          Character Count : {text.length}
        </p>
        <p className="border-bottom border-warning">
          Read Time : {readTime}min
        </p>
        <p className="border-bottom border-warning">Word count : {wordCount}</p>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="primary" className="me-3" onClick={changeToUpeer}>
          Upper case
        </Button>
        <Button variant="primary" className="me-3" onClick={changeToLower}>
          lowewr case
        </Button>
        <Button variant="primary" className="me-3" onClick={capitalizeWords}>
          Capitalize Words
        </Button>
        <Button variant="primary" className="me-3" onClick={copy}>
          Copy text <FaCopy />
        </Button>
        <Button variant="primary" className="me-3" onClick={downloadFile}>
          Download file <FaFileDownload />
        </Button>
      </div>
      <p className="d-flex justify-content-center mt-5 text-red">{textwarn}</p>
    </div>
  );
}
