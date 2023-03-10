import { useState } from "react";
import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import "../style/App.css";

function Home() {
  const [isList, setIsList] = useState(true);

  const titleProps = useSpring({
    to: {
      opacity: 1,
    },
  });

  const toggleList = () => {
    setIsList(!isList);
  };

  return (
    <div className="home">
      <nav>
        <ul>
          <li className="login">
            <Link to="/login">Login</Link>
          </li>
          <li className="signup">
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
      <main>
        <animated.h2 className="title" style={titleProps} onClick={toggleList}>
          {isList ? "List" : "Let"} it out {isList ? ":" : ":)"}
        </animated.h2>
        <h3 className="slogan">click me ^</h3>
        {isList === false && (
          <Confetti
            colors={["#50C878"]}
            recycle={false}
            numberOfPieces={1500}
            gravity={0.4}
            initialVelocityX={10}
            initialVelocityY={30}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}
      </main>
    </div>
  );
}

export default Home;

// styling for slide in title + buttons => may incoporate later
//   const titleProps = useSpring({
//     from: { opacity: 0, transform: "translateY(-50px)" },
//     to: { opacity: 1, transform: "translateY(0px)" },
//     delay: 500,
//   });

//   const sloganProps = useSpring({
//     from: { opacity: 0, transform: "translateX(-50px)" },
//     to: { opacity: 1, transform: "translateX(0px)" },
//     delay: 1000,
//   });

//   const navProps = useSpring({
//     from: { opacity: 0, transform: "translateY(-50px)" },
//     to: { opacity: 1, transform: "translateY(0px)" },
//     delay: 1500,
//   });

//     <div className="home">
//       <animated.nav style={navProps}>
//         <ul>
//           <li className="login">
//             <Link to="/login">Login</Link>
//           </li>
//           <li className="signup">
//             <Link to="/signup">Signup</Link>
//           </li>
//         </ul>
//       </animated.nav>
//       <animated.main>
//         <animated.h2 className="title" style={titleProps}>
//           List it out.
//         </animated.h2>
//         <animated.h3 className="slogan" style={sloganProps}>
//           click me^
//         </animated.h3>
//       </animated.main>
//     </div>
