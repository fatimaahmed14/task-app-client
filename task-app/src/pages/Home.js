import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import "../style/App.css";

//   return (
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
//           let it all out... *DIGITALLY*
//         </animated.h3>
//       </animated.main>
//     </div>
//   );
// }

function Home() {
  const [isList, setIsList] = useState(true);

  const titleProps = useSpring({
    to: {
      opacity: 1,
      transform: `translateY(${isList ? "0px" : "-50px"})`,
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
          {isList ? "List" : "Let"} it out.
        </animated.h2>
        <h3 className="slogan">let it all out... *DIGITALLY*</h3>
      </main>
    </div>
  );
}

export default Home;

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
