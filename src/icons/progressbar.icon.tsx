function progressBar(widthPerc: number, gradient: boolean = false) {
  const radius = 30;
  const dashArray = (Math.PI * radius * widthPerc) / 100;
  return (
    <svg width="100" height="60">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDashoffset={-1 * Math.PI * radius}
        strokeDasharray={`${dashArray} 10000`}
        stroke={gradient ? "url(#score-gradient)" : "#e5e5e5"}
      ></circle>
      {gradient && (
        <defs>
          <linearGradient id="score-gradient">
            <stop offset="0%" stopColor="red" />
            <stop offset="25%" stopColor="orange" />
            <stop offset="100%" stopColor="green" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}

export default progressBar;
