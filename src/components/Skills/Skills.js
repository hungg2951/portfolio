import React, { useContext, useRef, useEffect } from "react";
import "./Skills.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { skillsData, skillsData2 } from "../../data/skillsData";
import { skillsImage } from "../../utils/skillsImage";

function Skills() {
  const { theme } = useContext(ThemeContext);
  const wrapperRef1 = useRef(null);
  const wrapperRef2 = useRef(null);
  const isDragging1 = useRef(false);
  const isDragging2 = useRef(false);
  const isHovered1 = useRef(false);
  const isHovered2 = useRef(false);
  const startX1 = useRef(0);
  const startX2 = useRef(0);
  const scrollLeft1 = useRef(0);
  const scrollLeft2 = useRef(0);

  // Hàng 1 — chạy sang trái
  useEffect(() => {
    const el = wrapperRef1.current;
    let pos = 0;
    const step = () => {
      if (!isDragging1.current && !isHovered1.current) {
        pos += 0.8;
        if (pos >= el.scrollWidth / 2) pos = 0;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Hàng 2 — chạy sang phải
  useEffect(() => {
    const el = wrapperRef2.current;
    let pos = el.scrollWidth / 2;
    const step = () => {
      if (!isDragging2.current && !isHovered2.current) {
        pos -= 0.8;
        if (pos <= 0) pos = el.scrollWidth / 2;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const createHandlers = (
    isDragging,
    isHovered,
    startX,
    scrollLeftRef,
    wrapperRef,
  ) => ({
    onMouseDown: (e) => {
      isDragging.current = true;
      startX.current = e.pageX;
      scrollLeftRef.current = wrapperRef.current.scrollLeft;
      wrapperRef.current.style.cursor = "grabbing";
    },
    onMouseUp: () => {
      isDragging.current = false;
      wrapperRef.current.style.cursor = "grab";
    },
    onMouseLeave: () => {
      isDragging.current = false;
      isHovered.current = false;
      wrapperRef.current.style.cursor = "grab";
    },
    onMouseEnter: () => {
      isHovered.current = true;
    },
    onMouseMove: (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const walk = (e.pageX - startX.current) * 1;
      wrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
    },
    onTouchStart: (e) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX;
      scrollLeftRef.current = wrapperRef.current.scrollLeft;
    },
    onTouchEnd: () => {
      isDragging.current = false;
    },
    onTouchMove: (e) => {
      if (!isDragging.current) return;
      const walk = (e.touches[0].pageX - startX.current) * 1;
      wrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
    },
  });

  const skillBoxStyle = {
    backgroundColor: theme.secondary,
    boxShadow: `0px 0px 30px ${theme.primary30}`,
  };

  const doubled1 = [...skillsData, ...skillsData];
  const doubled2 = [...skillsData2, ...skillsData2];

  return (
    <div className="skills" style={{ backgroundColor: theme.secondary }}>
      <div className="skillsHeader">
        <h2 style={{ color: theme.primary }}>Skills</h2>
      </div>
      <div className="skillsContainer">
        {/* Hàng 1 */}
        <div className="skill--row--label" style={{ color: theme.primary }}>
          Core Skills
        </div>

        <div
          className="skill--scroll--wrapper"
          ref={wrapperRef1}
          {...createHandlers(
            isDragging1,
            isHovered1,
            startX1,
            scrollLeft1,
            wrapperRef1,
          )}
        >
          <div className="skill--scroll">
            {doubled1.map((skill, id) => (
              <div className="skill--box" key={id} style={skillBoxStyle}>
                <img src={skillsImage(skill)} alt={skill} draggable="false" />
                <h3 style={{ color: theme.tertiary }}>{skill}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Hàng 2 */}
        <div className="skill--row--label" style={{ color: theme.primary }}>
          Tools & Others
        </div>
        <div
          className="skill--scroll--wrapper"
          ref={wrapperRef2}
          {...createHandlers(
            isDragging2,
            isHovered2,
            startX2,
            scrollLeft2,
            wrapperRef2,
          )}
          style={{ marginTop: "1rem" }}
        >
          <div className="skill--scroll">
            {doubled2.map((skill, id) => (
              <div className="skill--box" key={id} style={skillBoxStyle}>
                <img src={skillsImage(skill)} alt={skill} draggable="false" />
                <h3 style={{ color: theme.tertiary }}>{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
