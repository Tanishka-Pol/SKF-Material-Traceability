import React from 'react';
import { FaPlay, FaChevronDown } from 'react-icons/fa';
import './Header.css';
import skfLogo from "../../assets/skf logo.png";

const Header = () => {
    return (
        <header className="header-container-full">
            {/* Left Section: Branding */}
            <div className="branding-section">
                <div className="logo-container">
  <img src={skfLogo} alt="SKF Logo" className="skf-logo" />
</div>

                <div className="branding-text-group">
                    <h1 className="title-p-vsm">P-VSM</h1>
                    <span className="subtitle-mapping">Process Value Stream Mapping</span>
                </div>
            </div>

            {/* Right Section: One Horizontal Row of Controls */}
            <div className="controls-section-row">
                {/* Select MO Control */}
               <div className="control-item-group">
    <label className="control-label-text">Select MO</label>

    <select className="form-select dropdown-style-box">
        <option value="">Select MO</option>
        <option value="MO001">MO001</option>
        <option value="MO002">MO002</option>
        <option value="MO003">MO003</option>
    </select>
</div>

                {/* Select Type Control */}
               <div className="control-item-group">
    <label className="control-label-text">Select Type</label>

    <select className="form-select dropdown-style-box">
        <option value="">Select Type</option>
        <option>Ring WT</option>
        <option>MO Data</option>
    </select>
</div>
                {/* Load Flow Button */}
              <button
    className="load-flow-action-btn"
    onClick={() => window.dispatchEvent(new CustomEvent("skf:load-flow"))}
>
    <FaPlay size={10} />
    <span>Load Flow</span>
</button>
            </div>
        </header>
    );
};

export default Header;
