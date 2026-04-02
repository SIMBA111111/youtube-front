import "i18next";
import { TranslationTypes } from "@/shared/i18s/translations/TranslationTypes";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: TranslationTypes;
  }
}