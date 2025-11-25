import React from "react";

const BirthdayBalloons = () => {
  const colors = [
    "#FDB913", // CSK Yellow
    "#004BA0", // MI Blue
    "#EA1A25", // RCB Red
    "#FF66CC", // RR Pink
    "#3A225D", // KKR Purple
    "#2BB673", // LSG Green
    "#254AA5", // DC Blue
    "#E41B17", // PBKS Red
  ];

  const balloons = new Array(24).fill(0)?.map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 6;
    const size = 40 + Math.random() * 30;
    const color = colors[i % colors.length];

    return (
      <div
        key={i}
        className="balloon"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          width: `${size}px`,
          height: `${size * 1.3}px`,
          background: color,
        }}
      >
        <div className="string"></div>
      </div>
    );
  });

  return (
    <>
      <style>{`
        .balloon {
          position: absolute;
          bottom: -125px;
          border-radius: 50% 50% 45% 45%;
          animation: floatUp 6s linear infinite;
          opacity: 0.85;
        }

        .balloon::after {
          content: "";
          width: 8px;
          height: 14px;
          background: inherit;
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 3px;
        }

        .string {
          width: 2px;
          height: 60px;
          background: #444;
          position: absolute;
          bottom: -70px;
          left: 50%;
          transform: translateX(-50%);
        }

        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-900px) rotate(6deg); opacity: 0; }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {balloons}
      </div>
    </>
  );
};

export default BirthdayBalloons;
