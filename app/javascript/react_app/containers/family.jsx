import React, { Component } from "react";
import { connect } from "react-redux";

class Family extends Component {
  getRGB(numerator, denominator) {
    const deci = numerator / denominator; // percentage as decimal
    const startColor = [235, 55, 40]; // color at 0% - rgb -> red
    const endColor = [55, 235, 40]; // color at 100% - rgb -> green
    const colorArray = [];

    for (let i = 0; i < 3; i++) {
      // if they are the same number push immediately
      if (startColor[i] === endColor[i]) {
        colorArray.push(startColor[i]);
      } else {
        // calculate difference
        const diff = endColor[i] - startColor[i];

        // add difference * percent onto lowest number
        colorArray.push(startColor[i] + Math.floor(diff * deci));
      }
    }

    return `rgb(${colorArray.join(",")})`;
  }

  render() {
    const { scientific_name, english_name, swedish_name, total_seen, total_birds } = this.props;
  
    const progressStyle = {
      backgroundColor: this.getRGB(total_seen, total_birds),
    };

    return (
      <a href={`/families/${scientific_name}`}>
        <li className="list-group-item" id={scientific_name}>
          <div className="progress-indicator" style={progressStyle} />
          <p className="family-list-item-numbers pl-1">
            ({total_seen}/{total_birds})
          </p>
          <p>
            {english_name} / {swedish_name}
          </p>
        </li>
      </a>
    );
  }
}

export default Family;
