export const brandColors = {
  white: "#FFFFFF",
  black: "#000000",
  blue: "#3b82f6",
  orange: "#f97316",
  stroke: "#d1d1d1",

  canvas: "#111111",
  surface: "#1a1a1a",
  surfaceMuted: "#242424",
  border: "#333333",

  textOnDark: "#f5f5f5",
  textMutedOnDark: "#a3a3a3",
  textDimOnDark: "#737373",

  blueMuted: "#1e3a5f",
  orangeMuted: "#3d1f0f",
} as const;

export const mermaidThemeVariables = {
  darkMode: true,
  background: brandColors.canvas,
  primaryColor: brandColors.blue,
  primaryTextColor: brandColors.white,
  primaryBorderColor: brandColors.blue,
  secondaryColor: brandColors.surface,
  secondaryTextColor: brandColors.textOnDark,
  secondaryBorderColor: brandColors.border,
  tertiaryColor: brandColors.surfaceMuted,
  tertiaryTextColor: brandColors.textMutedOnDark,
  tertiaryBorderColor: brandColors.border,
  lineColor: brandColors.textDimOnDark,
  textColor: brandColors.textOnDark,
  mainBkg: brandColors.surface,
  nodeBorder: brandColors.border,
  clusterBkg: brandColors.surfaceMuted,
  titleColor: brandColors.textOnDark,
  edgeLabelBackground: brandColors.surface,
  actorBorder: brandColors.blue,
  actorBkg: brandColors.surface,
  actorTextColor: brandColors.textOnDark,
  actorLineColor: brandColors.textDimOnDark,
  signalColor: brandColors.textOnDark,
  labelBoxBkgColor: brandColors.surface,
  labelBoxBorderColor: brandColors.border,
  labelTextColor: brandColors.textOnDark,
  loopTextColor: brandColors.textOnDark,
  noteBorderColor: brandColors.orange,
  noteBkgColor: brandColors.orangeMuted,
  noteTextColor: brandColors.textOnDark,
  activationBorderColor: brandColors.orange,
  activationBkgColor: brandColors.surfaceMuted,
  sequenceNumberColor: brandColors.white,
};

export const diagramContainerClassName =
  "my-8 flex justify-center items-center rounded-lg border p-4 overflow-x-auto";

export const diagramContainerStyle = {
  backgroundColor: brandColors.canvas,
  borderColor: brandColors.border,
};
