import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <div className="font-serif text-xl font-bold">ŁK</div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
