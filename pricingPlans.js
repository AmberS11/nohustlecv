const pricingPlans = [
  {
    title: "Free",
    price: "₹0",
    duration: "Forever free",
    features: [
      "View basic resume and 1 bonus template",
      "Explore Cover Letter AI with sample prompt",
      "Basic ATS tips (read-only)",
      "Preview resumes (no download or save)",
      "No access to premium templates"
    ],
    recommended: false,
    planKey: "free"
  },
  {
    title: "Monthly",
    price: "₹299",
    duration: "Per month",
    features: [
      "Access all resume & cover letter templates",
      "AI-powered Cover Letter Generator",
      "Download in PDF format",
      "ATS optimization tools",
      "Email support"
    ],
    recommended: false,
    planKey: "monthly"
  },
  {
    title: "Quarterly",
    price: "₹499",
    duration: "Every 3 months",
    features: [
      "Everything in Monthly plan",
      "Save ₹398 compared to Monthly",
      "Priority support",
      "Template bookmarking"
    ],
    recommended: false,
    planKey: "quarterly"
  },
  {
    title: "Yearly",
    price: "₹799",
    duration: "Per year",
    features: [
      "Everything in Quarterly plan",
      "Save ₹2589 compared to Monthly",
      "Early access to new features",
      "Resume & Cover Letter studio access"
    ],
    recommended: true,
    planKey: "yearly"
  },
  {
    title: "Student (Verified)",
    price: "₹499",
    duration: "Per year",
    features: [
      "Same benefits as Yearly plan",
      "Student ID verification required",
      "Not available to fresh graduates"
    ],
    recommended: false,
    planKey: "student"
  }
];

export default pricingPlans;
