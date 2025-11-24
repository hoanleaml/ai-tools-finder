import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface PricingBreakdownProps {
  pricingModel: string | null;
}

export function PricingBreakdown({ pricingModel }: PricingBreakdownProps) {
  if (!pricingModel) {
    return null;
  }

  const pricingInfo: Record<
    string,
    {
      label: string;
      description: string;
      features: string[];
      limitations?: string[];
    }
  > = {
    free: {
      label: "Free",
      description: "Completely free to use with no cost",
      features: ["No payment required", "Full access to features", "No credit card needed"],
    },
    freemium: {
      label: "Freemium",
      description: "Free tier available with optional paid upgrades",
      features: [
        "Free tier available",
        "Basic features included",
        "Paid plans for advanced features",
      ],
      limitations: ["Some features may be limited", "Upgrade for full access"],
    },
    paid: {
      label: "Paid",
      description: "Subscription-based pricing model",
      features: ["Full feature access", "Regular updates", "Support included"],
      limitations: ["Requires subscription", "Monthly or annual payment"],
    },
    "one-time": {
      label: "One-time Purchase",
      description: "Single payment for lifetime access",
      features: ["One-time payment", "Lifetime access", "No recurring fees"],
    },
  };

  const info = pricingInfo[pricingModel];
  if (!info) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant="secondary" className="mb-2">
            {info.label}
          </Badge>
          <p className="text-sm text-gray-600">{info.description}</p>
        </div>

        {info.features.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold">Features:</h4>
            <ul className="space-y-1">
              {info.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {info.limitations && info.limitations.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold">Limitations:</h4>
            <ul className="space-y-1">
              {info.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
