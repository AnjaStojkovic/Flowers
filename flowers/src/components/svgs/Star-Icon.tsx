const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 2L9.34 8.3 2 9.24l5.75 4.69L6.5 21 12 17.27 17.5 21l-.25-7.07L22 9.24 14.66 8.3z"
    />
  </svg>
);

export default StarIcon;
