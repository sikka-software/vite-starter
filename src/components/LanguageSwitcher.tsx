import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={i18n.language === "ar" ? "start" : "end"}>
        <DropdownMenuRadioGroup
          value={i18n.language === "en-US" ? "en" : i18n.language}
          onValueChange={i18n.changeLanguage}
        >
          <DropdownMenuRadioItem value="ar">{t("ar")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">{t("en")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
