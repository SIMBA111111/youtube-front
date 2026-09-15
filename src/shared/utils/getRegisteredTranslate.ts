import { t } from "i18next";
import { TTraslates } from "../types/translates";

export const getRegisteredTranslate = (
  text: TTraslates,
  capitalizeFirst: boolean = false
): string => {
  if (!text) return '';

  const translated = t(text);

  return capitalizeFirst
    ? translated.charAt(0).toUpperCase() + translated.slice(1)
    : translated;
};