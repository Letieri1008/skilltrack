export const sidebarPaperAnimation = {
  animation: "sidebarSlideIn 240ms ease-out",
  "@keyframes sidebarSlideIn": {
    from: {
      opacity: 0,
      transform: "translateX(-16px)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
};

export const sidebarItemAnimation = {
  borderRadius: 2,
  transition: "background-color 160ms ease, color 160ms ease, transform 160ms ease",
  "&:hover": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    transform: "translateX(4px)",
  },
};
