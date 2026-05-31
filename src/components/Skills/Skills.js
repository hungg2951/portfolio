import React, { useContext, useRef, useEffect } from "react";
import "./Skills.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { skillsData } from "../../data/skillsData";
import { skillsImage } from "../../utils/skillsImage";

function Skills() {
  const { theme } = useContext(ThemeContext);
  const wrapperRef = useRef(null); // ← wrapper scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const isHovered = useRef(false);

  // Auto scroll
  useEffect(() => {
    const el = wrapperRef.current;
    let pos = 0;

    const step = () => {
      if (!isDragging.current && !isHovered.current) {
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

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeftRef.current = wrapperRef.current.scrollLeft;
    wrapperRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    wrapperRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 0.8;
    wrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    scrollLeftRef.current = wrapperRef.current.scrollLeft;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const walk = (e.touches[0].pageX - startX.current) * 2;
    wrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const skillBoxStyle = {
    backgroundColor: theme.secondary,
    boxShadow: `0px 0px 30px ${theme.primary30}`,
  };

  const doubledSkills = [...skillsData, ...skillsData];

  return (
    <div className="skills" style={{ backgroundColor: theme.secondary }}>
      <div className="skillsHeader">
        <h2 style={{ color: theme.primary }}>Skills</h2>
      </div>
      <div className="skillsContainer">
        {/* wrapper — cái này scroll */}
        <div
          className="skill--scroll--wrapper"
          ref={wrapperRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onMouseEnter={() => {
            isHovered.current = true;
          }}
          onMouseLeave={() => {
            isHovered.current = false;
            isDragging.current = false;
            wrapperRef.current.style.cursor = "grab";
          }}
        >
          {/* inner — cái này rộng hơn wrapper */}
          <div className="skill--scroll">
            {doubledSkills.map((skill, id) => (
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
