import { useState, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

import { subjects as legend } from "@/app/config/config";

const VizLegend = () => {
  const [selectedPlan, setSelectedPlan] = useState(legend[0]);

  return (
    <div className="legend">
      <div className="bg-sky-950 p-4 rounded-sm h-1/2">
        <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
          <RadioGroup.Label>Legend:</RadioGroup.Label>
          {legend.map((plan) => (
            <RadioGroup.Option key={plan.id} value={plan} as={Fragment}>
              {({ checked }) => (
                <div
                  className={`flex items-center gap-2 ${
                    checked ? "text-white" : "text-gray-300"
                  }`}>
                  <div
                    className={`h-3 w-3 rounded-full border ${
                      checked ? "bg-blue-500" : ""
                    }`}
                  />
                  {plan.name}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default VizLegend;
