import React from "react";
import "./Inventory.css";
import { inventoryData } from "./inventoryData";

function Location({ location }) {
  return (
    <div key={location.name} className="location">
      <div className="location-name">{location.name}</div>
      {location.inventory.map(({ _id, name, quantity, type }) => (
        <div key={_id} className="inventory-item">
          <div>
            {name}({quantity})
          </div>
          <div>{type}</div>
        </div>
      ))}
    </div>
  );
}

function RenderArea({ area }) {
  return (
    <div className="area">
      <div className="area-name">{area.name}</div>
      <div className="locations">
        {area.locations.map((location) => (
          <Location key={location.name} location={location} />
        ))}
      </div>
    </div>
  );
}

function Inventory() {
    const areas = inventoryData.reduce((accumulator, item) => {
      const { area, location } = item;
      const areaObj = accumulator[area] || { name: area, locations: [] };
      const locationObj = areaObj.locations.find((loc) => loc.name === location);
      if (!locationObj) {
        areaObj.locations.push({ name: location, inventory: [item] });
      } else {
        locationObj.inventory.push(item);
      }
      return { ...accumulator, [area]: areaObj };
    }, {});
  
    const sortedAreas = Object.values(areas).sort((a, b) => a.name.localeCompare(b.name));
  
    sortedAreas.forEach((area) => {
      area.locations.sort((a, b) => a.name.localeCompare(b.name));
    });
  
    return (
      <div className="inventory">
        {sortedAreas.map((area) => (
          <RenderArea key={area.name} area={area} />
        ))}
      </div>
    );
  }
  

export default Inventory;
