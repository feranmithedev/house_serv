import { useMemo } from "react";
import providers from "../data/providers";
import { useProviderApplications } from "./useProviderApplications";

const serviceCategoryIds = {
  Electrical: 1,
  Plumbing: 2,
  Painting: 3,
  "POP & Ceilings": 4,
  Carpentry: 5,
  Cleaning: 6,
};

export function useMarketplaceProviders() {
  const { applications } = useProviderApplications();

  const marketplaceProviders = useMemo(() => {
    const demoProviders = providers.map((provider) => ({
      ...provider,
      providerType: "demo",
    }));

    const approvedProviders = applications
      .filter((application) => application.status === "Approved")
      .flatMap((application) =>
        application.serviceCategories
          .filter((category) => serviceCategoryIds[category])
          .map((category) => ({
            id: `application-${application.id}-${serviceCategoryIds[category]}`,
            applicationId: application.id,
            name: application.businessName,
            serviceId: serviceCategoryIds[category],
            location: application.businessAddress,
            experience: application.experience,
            description: application.description,
            qualification: application.qualification,
            portfolioLink: application.portfolioLink,
            providerType: "registered",
            email: application.email,
          }))
      );

    return [...demoProviders, ...approvedProviders];
  }, [applications]);

  return marketplaceProviders;
}
