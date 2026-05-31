import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "react-reveal/Fade";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { ThemeContext } from "../../contexts/ThemeContext";

import expImgWhite from "../../assets/svg/experience/expImgWhite.svg";
import expImgBlack from "../../assets/svg/experience/expImgBlack.svg";

import "./Experience.css";

function ExperienceCard({
  id,
  company,
  jobtitle,
  startYear,
  endYear,
  description,
  techStack,
  responsibilities,
}) {
  const { theme } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(false);

  const useStyles = makeStyles((t) => ({
    experienceCard: {
      backgroundColor: theme.primary30,
      "&:hover": {
        backgroundColor: theme.primary50,
      },
    },
    expandBtn: {
      color: theme.primary,
      fontSize: "1.5rem",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },
  }));

  const classes = useStyles();

  return (
    <Fade bottom>
      <div key={id} className={`experience-card ${classes.experienceCard}`}>
        {/* Header — luôn hiển thị */}
        <div
          className="expcard-header"
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer" }}
        >
          <div
            className="expcard-img"
            style={{ backgroundColor: theme.primary }}
          >
            <img
              src={theme.type === "light" ? expImgBlack : expImgWhite}
              alt=""
            />
          </div>
          <div className="experience-details">
            <h6 style={{ color: theme.primary }}>
              {startYear} - {endYear}
            </h6>
            <h4 style={{ color: theme.tertiary }}>{jobtitle}</h4>
            <h5 style={{ color: theme.tertiary80 }}>{company}</h5>
          </div>
          <div className={classes.expandBtn}>
            {expanded ? <MdExpandLess /> : <MdExpandMore />}
          </div>
        </div>

        {/* Body — chỉ hiển thị khi expanded */}
        <div
          className="expcard-body"
          style={{
            borderTop: expanded ? `1px solid ${theme.primary30}` : "none",
            maxHeight: expanded ? "1000px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.4s ease, padding 0.3s ease",
            padding: expanded ? "1rem 1.5rem 0.5rem 1.5rem" : "0 1.5rem",
            marginTop: expanded ? "0.8rem" : "0",
          }}
        >
          {/* nội dung giữ nguyên, không cần điều kiện {expanded &&} nữa */}
          {description && (
            <p style={{ color: theme.tertiary }}>{description}</p>
          )}
          {techStack && (
            <div className="expcard-techstack">
              <h6 style={{ color: theme.primary }}>Tech Stack</h6>
              <p style={{ color: theme.tertiary80 }}>{techStack}</p>
            </div>
          )}
          {responsibilities && responsibilities.length > 0 && (
            <div className="expcard-responsibilities">
              <h6 style={{ color: theme.primary }}>Responsibilities</h6>
              <ul>
                {responsibilities.map((item, index) => (
                  <li key={index} style={{ color: theme.tertiary80 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
}

export default ExperienceCard;
