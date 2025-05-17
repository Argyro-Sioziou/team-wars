import { useState } from "react";
import { CastleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { City } from "../interfaces";

const randomImg =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fknightstemplar.co%2Fwp-content%2Fuploads%2F2023%2F09%2Fgalileus_medieval_cities_in_Europe_81fd3d7f-7f98-4196-8d76-22bbb3cccbc1-1024x512.jpg&f=1&nofb=1&ipt=e5f049242b58ecc2d0265cdef1598653ce384fe48ddfc9b703c3c4adbbac2f25";

export const CityCard: React.FC<{ city: City }> = ({ city }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`transition-all duration-300  ${isExpanded && "-translate-y-2 scale-105"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Card className="overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            alt={city.name}
            src={randomImg}
            className="h-56 object-center object-cover"
          />
        </div>

        <CardHeader className="pb-2 pt-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-amber-400 capitalize">
              {city.name}
            </CardTitle>
            <CastleIcon size={20} className="text-amber-400" />
          </div>
        </CardHeader>

        <CardFooter className="pt-0 pb-3">
          <Button className="w-full text-xs py-1 bg-amber-700 hover:bg-amber-700 text-white">
            <Link to="/cities/$id" params={{ id: city.id }}>
              View Details
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
