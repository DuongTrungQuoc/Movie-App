const CircularProgressBar = ({
  percent = 0,
  size = 3,
  strokeWidth = 0.25,
  strokeColor = "green",
}) => {
  const radius = size / 2 - strokeWidth;
  return (
    <>
      <div>
        <svg width={`${size}vw`} height={`${size}vw`}>
          <circle
            r={`${radius}vw`}
            //fill="red"
            cx={`${size / 2}vw`}
            cy={`${size / 2}vw`}
            stroke="white"
            strokeWidth={`${strokeWidth}vw`}
          />
          <circle
            // chu vi: 2*PI*R => 2*3.14*20 = 125.6
            r={`${radius}vw`}
            cx={`${size / 2}vw`}
            cy={`${size / 2}vw`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={`${strokeWidth}vw`}
            strokeDasharray={`${2 * Math.PI * radius}vw`}
            strokeDashoffset={`${2 * Math.PI * radius - 2 * Math.PI * radius * (percent / 100)}vw`}
            transform="rotate(-90)"
            style={{ transformOrigin: "center" }}
            strokeLinecap="round"
          />
          <text
            x={`${size / 2}vw`}
            y={`${size / 2}vw`}
            fill="white"
            fontSize="1.2vw"
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {percent}
          </text>
        </svg>
      </div>
    </>
  );
};
export default CircularProgressBar;
