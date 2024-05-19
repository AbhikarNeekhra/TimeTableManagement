import React from "react";
import Image from "next/image";
import downArrowIcon from "../../../../public/arrow-down-icon-png-6696.png";

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: props.options[0],
      dropdownWidth: "",
    };
  }

  componentDidMount() {
    this.updateDropdownWidth();
    window.addEventListener("resize", this.updateDropdownWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDropdownWidth);
  }

  updateDropdownWidth() {
    const { options } = this.props;
    const maxWidth = Math.max(
      ...options.map((option) => option.length * 8) // Adjust the factor to suit your font size and style
    );
    const dropdownWidth = `${maxWidth}px`;
    this.setState({ dropdownWidth });
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handleOptionClick = (option) => {
    this.setState({ selectedOption: option, isOpen: false });
  };

  render() {
    const { options } = this.props;
    const { isOpen, selectedOption, dropdownWidth } = this.state;
    const windowWidth =
      typeof window !== "undefined" ? window.innerWidth : undefined;

    return (
      <div className="relative inline-block">
        <div
          onClick={this.toggleDropdown}
          className={`flex items-center justify-between px-4 py-2 bg-gray-200 cursor-pointer ${
            isOpen ? "rounded-t-lg" : "rounded-lg"
          } ${
            windowWidth && windowWidth <= 768
              ? "w-full"
              : `w-auto max-w-${dropdownWidth}`
          }`}
        >
          <span>{selectedOption}</span>
          <Image src={downArrowIcon} alt="Down Arrow" width={16} height={16} />
        </div>
        {isOpen && (
          <div
            className={`absolute z-10 mt-1 bg-white shadow-lg rounded-b-lg ${
              windowWidth && windowWidth <= 768
                ? "w-full"
                : `w-auto max-w-${dropdownWidth}`
            }`}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => this.handleOptionClick(option)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CustomSelect;
