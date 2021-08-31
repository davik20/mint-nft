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
