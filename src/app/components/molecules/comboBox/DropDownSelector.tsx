import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type ItemProps<T> = {
  items: T[];
  displayKey: keyof T;
  onSelectionChange: (selectedItem: T) => void;
};

export default function DropDownSelector<T extends { id: number }>({
  items,
  displayKey,
  onSelectionChange,
}: ItemProps<T>) {
  const [selected, setSelected] = useState<T>(items[0]);
  const [query, setQuery] = useState<string>("");

  const filteredItems: T[] =
    query === ""
      ? items
      : items.filter((item) =>
          String(item[displayKey])
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleSelectionChange = (value: T) => {
    setSelected(value);
    onSelectionChange(value);
  };
  return (
    <Combobox value={selected} onChange={handleSelectionChange}>
      <div className="relative mt-1 w-1/8">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left shadow-md focus:outline-none    sm:text-sm">
          <Combobox.Input
            className="w-full bg-black border-none py-2 pl-3 text-2xl leading-5 text-blue-300  focus:outline-none"
            displayValue={(item: T) => String(item[displayKey])}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}>
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredItems.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-white">
                Nothing found.
              </div>
            ) : (
              filteredItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 bg-black ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }>
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate text-white ${
                          selected ? "font-medium" : "font-normal"
                        }`}>
                        {String(item[displayKey])}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
