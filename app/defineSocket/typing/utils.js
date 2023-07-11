let typing = {};
const typingTimeout = 1500;
const runTimer = (identyfier) => {
  clearTimeout(typing[identyfier].timer);

  typing[identyfier].timer = setTimeout(() => {
    typing[identyfier]['func']();
  }, typingTimeout);
};

export { runTimer, typing };