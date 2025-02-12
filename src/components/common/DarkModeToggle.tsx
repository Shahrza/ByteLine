import { useDarkMode } from "@/hooks/useDarkMode";

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div
      className={`border rounded-3xl w-[70px] cursor-pointer ${
        isDark ? "bg-gray-700 border-gray-400" : "bg-gray-200 border-gray-600"
      }`}
      onClick={toggleDarkMode}
    >
      <div
        className={`px-2 py-1 rounded-3xl bg-white w-fit ${
          isDark ? "hidden" : "block"
        }`}
      >
        🌙
      </div>
      <div
        className={`px-2 py-1 rounded-3xl bg-neutral-900 w-fit  ml-auto ${
          !isDark ? "hidden" : "block"
        }`}
      >
        ☀️
      </div>
    </div>
  );
}
