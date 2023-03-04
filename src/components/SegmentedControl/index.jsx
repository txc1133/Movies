import "./SegmentedControl.css";

function SegmentedControl({ activeTab, onChange }) {
  return (
    <div className="segmented-control">
      <button
        className={`segmented-control-button ${activeTab === "list" ? "active" : ""}`}
        onClick={() => onChange("list")}
      >
        List View
      </button>
      <button
        className={`segmented-control-button ${activeTab === "grid" ? "active" : ""}`}
        onClick={() => onChange("grid")}
      >
        Grid View
      </button>
    </div>
  );
}

export default SegmentedControl;
