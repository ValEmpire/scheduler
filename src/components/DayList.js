import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // map the days from props
  const mapDayListItem = () => {
    return props.days.map((day) => (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value} // will need to compare the name and value to know whcih is selected
        setDay={() => props.onChange(day.name)}
      />
    ));
  };

  return <ul>{mapDayListItem()}</ul>;
}
