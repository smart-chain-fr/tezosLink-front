import WorldMap from "@/components/Layouts/WorldMap";
import { GetServerSideProps } from "next";
import countryCodes from "@Assets/country-codes.json";
import Metric from "@/api/Metric";

type Marker = {
  name: string;
  latLng: number[];
};

type IProps = {
  markers: Marker[];
};
export default function Route(props: IProps) {
  return <WorldMap {...props} />;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const data = await Metric.getInstance().getWorldmapInfo();

  const markers: Marker[] = [];
  for (const item of data.data) {
    const countryCode = countryCodes.ref_country_codes.find(
      (country) => country.alpha2 === item.country
    );
    if (!countryCode) continue;
    markers.push({
      latLng: [countryCode.latitude, countryCode.longitude],
      name: `${countryCode.country} : ${item.count}`,
    });
  }
  return {
    props: {
      markers,
    },
  };
};
