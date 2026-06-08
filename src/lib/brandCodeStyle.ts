import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { brandColors } from "./brandTheme";

export function getBrandCodeStyle() {
  return {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: brandColors.canvas,
      color: brandColors.textOnDark,
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: brandColors.canvas,
      color: brandColors.textOnDark,
    },
    comment: { color: brandColors.textDimOnDark, fontStyle: "italic" },
    prolog: { color: brandColors.textDimOnDark },
    doctype: { color: brandColors.textDimOnDark },
    cdata: { color: brandColors.textDimOnDark },
    punctuation: { color: brandColors.textMutedOnDark },
    property: { color: brandColors.blue },
    tag: { color: brandColors.blue },
    boolean: { color: brandColors.orange },
    number: { color: brandColors.orange },
    constant: { color: brandColors.orange },
    symbol: { color: brandColors.orange },
    deleted: { color: brandColors.orange },
    selector: { color: brandColors.orange },
    "attr-name": { color: brandColors.orange },
    string: { color: "#93c5fd" },
    char: { color: "#93c5fd" },
    builtin: { color: brandColors.blue },
    inserted: { color: "#86efac" },
    operator: { color: brandColors.textMutedOnDark },
    entity: { color: brandColors.blue },
    url: { color: brandColors.blue },
    variable: { color: brandColors.textOnDark },
    atrule: { color: brandColors.blue },
    "attr-value": { color: "#93c5fd" },
    function: { color: brandColors.blue },
    "class-name": { color: brandColors.orange },
    keyword: { color: brandColors.orange },
    regex: { color: "#fdba74" },
    important: { color: brandColors.orange },
  };
}
