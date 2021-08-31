import { createElement } from "react";

export const shortenAddress = (address) => {
  return `${address.split("").slice(0, 10).join("")}....${address
    .split("")
    .slice(address.length - 6, address.length - 1)
    .join("")}`;
};

export const loadingJokes = () => {
  return [
    "Hey, go grab a coffee or something😙",
    "Nice, We are Creating History😌",
    "Are you still here?😄",
    "Where's the layer 2 solution already 🥲",
    "This would have been really costly on the mainnet😂",
    "Beginning Quantum Event👀",
    "I need more gas fee!!",
    "Fine I'm joking",
    "I'm not joking",
    "Gosh this is taking time, I need to sleep",
  ];
};

export const copyToClipboard = (text) => {
  if (navigator.clipboard) {
    // default: modern asynchronous API
    console.log(text);
    return navigator.clipboard.writeText(text);
  } else if (window.clipboardData && window.clipboardData.setData) {
    // for IE11
    window.clipboardData.setData("Text", text);
    return Promise.resolve();
  }
  //  else {
  //   // workaround: create dummy input

  //   const input = createElement("input")("input", { type: "text" });
  //   input.value = text;
  //   document.body.append(input);
  //   input.focus();
  //   input.select();
  //   document.execCommand("copy");
  //   input.remove();
  //   return Promise.resolve();
  // }
};
