import "./SegmentedControl.css";

function SegmentedControl({ activeTab, onChange }) {
  const tabs = [
    { label: "List View", value: "list" },
    { label: "Grid View", value: "grid" },
  ];

  return (
    <div className="segmented-control">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`segmented-control-button ${activeTab === tab.value ? "active" : ""}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;
