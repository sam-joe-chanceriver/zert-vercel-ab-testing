import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import {
  aboutPageVariant,
  ctaVariant,
  heroVariant,
  homePageVariant,
} from "../../../../flags";

const flagDefinitions = {
  homePageVariant,
  aboutPageVariant,
  heroVariant,
  ctaVariant,
};

export const GET = createFlagsDiscoveryEndpoint(() =>
  getProviderData(flagDefinitions)
);
