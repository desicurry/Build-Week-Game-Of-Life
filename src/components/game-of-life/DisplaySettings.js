import React from "react";
import { connect } from "react-redux";
import { resizeGrid, changeCellSize, updateColor } from "../../actions";

function DisplaySettings(props) {
  const {
    color,
    cellSize,
    side,
    resizeGrid,
    changeCellSize,
    updateColor,
  } = props;
  const maxGrid = 100;
  const minGrid = 10;
  const [localSide, setLocalSide] = React.useState(side);
  const [showError, setShowError] = React.useState(false);
  const extractAndUpdateColor = ({ target: { value } }) => updateColor(value);
  const extractAndUpdateCellSize = ({ target: { value } }) => {
    if (value < 1) value = 1;
    if (value > 20) value = 20;
    changeCellSize(value);
  };
  const extractAndUpdateGridSide = ({ target: { value } }) => {
    setLocalSide(value);
    if (value >= minGrid && value <= maxGrid) {
      setShowError(false);
      resizeGrid(value);
    } else {
      setShowError(true);
    }
  };
  return (
    <div className='DisplaySettings'>
      <label>
        {"Color: "}
        <input type='color' value={color} onChange={extractAndUpdateColor} />
      </label>
      <label>
        {"Grid Dimensions: "}
        <input
          type='number'
          size='3'
          value={localSide}
          onChange={extractAndUpdateGridSide}
        />
        x{side}
      </label>
      {showError && (
        <div style={{ color: "red" }}>
          Must be between {minGrid} and {maxGrid} cells
        </div>
      )}
      <label>
        {"Cell Size: "}
        <input
          type='number'
          step='0.1'
          size='4'
          value={cellSize}
          onChange={extractAndUpdateCellSize}
        />
        px
      </label>
    </div>
  );
}
const mapPropsToState = (
  { display: { color, cellSize }, grid: { side } },
  props
) => ({ ...props, color, cellSize, side });
export default connect(mapPropsToState, {
  resizeGrid,
  changeCellSize,
  updateColor,
})(DisplaySettings);
