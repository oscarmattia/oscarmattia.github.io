type LogoMarkProps = {
  className?: string;
};

const LogoMark = ({ className = "h-6 w-6" }: LogoMarkProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="16" fill="#FFFFFF" stroke="hsl(0, 0%, 82%)" strokeWidth="0.75" />
    <circle cx="16" cy="16" r="12" fill="hsl(217, 91%, 60%)" />
    <circle cx="16" cy="16" r="8" fill="#000000" />
    <circle cx="16" cy="16" r="4" fill="hsl(25, 95%, 53%)" />
  </svg>
);

export default LogoMark;
