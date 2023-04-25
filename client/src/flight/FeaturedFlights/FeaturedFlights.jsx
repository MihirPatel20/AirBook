import useFetch from "../../hooks/useFetch";
import "./FeaturedFlights.css";
import { Link } from "react-router-dom";

const FeaturedFlights = ({ city }) => {
  //   const { data, loading } = useFetch("/hotels?featured=true&limit=4");
  const { data, loading } = useFetch("http://localhost:8080/api/flights");
  const cityData = data.filter((item) => item.origin === city);

  const calculateDuration = (start, end) => {
    const startHours = parseInt(start.split(":")[0]);
    const startMinutes = parseInt(start.split(":")[1].split(" ")[0]);
    const startPeriod = start.split(" ")[1];
    const startTotalMinutes =
      ((startHours % 12) + (startPeriod === "PM" ? 12 : 0)) * 60 + startMinutes;

    const endHours = parseInt(end.split(":")[0]);
    const endMinutes = parseInt(end.split(":")[1].split(" ")[0]);
    const endPeriod = end.split(" ")[1];
    const endTotalMinutes =
      ((endHours % 12) + (endPeriod === "PM" ? 12 : 0)) * 60 + endMinutes;

    const durationInMinutes = Math.abs(endTotalMinutes - startTotalMinutes);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} hr ${minutes} min`;
  };

  return (
    <div className="flightContainer">
      {loading ? (
        "Loading"
      ) : (
        <>
          {cityData.map((item) => (
            <Link
              className="flightObject"
              target="_blank"
              key={item.flight_number}
              to={item.redirect_url}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={item?.company_image_url}
                alt=""
                className="flightLogo"
              />
              <div className="flightName">
                <span>{item.company_name}</span>
              </div>
              <div className="flightDuration">
                <span>
                  {item.departure_time} - {item.arrival_time}
                </span>
              </div>
              <div className="flightLocations">
                <span>
                  {calculateDuration(item.departure_time, item.arrival_time)}
                </span>
                <span>
                  {item.origin} - {item.destination}
                </span>
              </div>
              <div className="flightStops">
                <span>{item.stops} Stops</span>
                <span>CAD, AMD, MMB</span>
              </div>
              <div className="flightPrice">
                <span>${item.ticket_price}</span>
                <span>Round Trip</span>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedFlights;
