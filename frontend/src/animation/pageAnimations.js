export const pageEnterAnimation = {
  animation: "pageEnter 300ms ease-out",
  "@keyframes pageEnter": {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

export const formCardAnimation = {
  animation: "formCardEnter 360ms ease-out 80ms both",
  "@keyframes formCardEnter": {
    from: { opacity: 0, transform: "translateY(14px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

export const successSnackbarAnimation = {
  "& .MuiAlert-root": {
    animation: "successPop 260ms ease-out",
  },
  "@keyframes successPop": {
    from: { opacity: 0, transform: "scale(0.92)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
};
