import "./OrderTimeline.css";

const steps = [
  "Pending",
  "Confirmed",
  "Packed",
  "Out For Delivery",
  "Delivered",
];

const OrderTimeline = ({ status }) => {
  const currentStep = steps.indexOf(status);

  return (
    <div className="timeline">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`timeline-step ${
            index <= currentStep ? "active" : ""
          }`}
        >
          <div className="timeline-circle">
            {index <= currentStep ? "✓" : ""}
          </div>

          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;