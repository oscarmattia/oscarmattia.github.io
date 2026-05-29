import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="inline-flex rounded-full border border-border p-0.5 text-xs font-medium"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={!isDark}
        className="rounded-full bg-white px-3 py-1 text-black transition-opacity hover:opacity-90"
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={isDark}
        className="rounded-full bg-black px-3 py-1 text-white transition-opacity hover:opacity-90"
      >
        Dark
      </button>
    </div>
  );
};

export default ThemeToggle;
