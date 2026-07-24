export interface ExperienceItem {
    dateRange: string;
    title: string;
    company: string;
    location: string;
    bullets: string[];
    skills: string[];
}

export const experienceData: ExperienceItem[] = [
    {
        dateRange: "April 2022 - Present",
        title: "Software Engineer II",
        company: "United Parcel Service (UPS)",
        location: "Parsippany, NJ",
        bullets: [
            "Engineered 5+ core reusable UI components using Angular and Typescript, implementing lazy loading and OnPush change detection to establish a high-performance frontend architecture serving 1.6M+ daily global users.",
            "Develop dynamic Ship From/Ship To address reactive form sections leveraging RxJS streams for asynchronous state management, custom validation logic, and complex regex rules to ensure strict international regulatory compliance.",
            "Overhauled the Quick Quote widget and responsive service tiles, increasing user checkout conversion by 15% by implementing backend-driven service badges and optimized, conversion-focused UI button color states.",
            "Design and implement an end-to-end notification system for pickup shipments, delivering automated, real-time tracking and exception alerts through secure backend service integrations.",
            "Spearheaded the modernization of the UPS API integrations, migrating legacy SOAP services to OAuth 2.0-secured REST APIs using C# and ASP.NET, to reduce API latency while safeguarding core transactional logic.",
            "Leverage GitHub Copilot AI capabilities to accelerate feature delivery by 35% engineering robust prompt workflows for a rapid Jasmine and Karma unit test generation, debugging, and code refactoring.",
            "Foster a collaborative Agile environment by leading comprehensive peer code reviews, aligning with product owners on requirements and onboarding new engineers to accelerate team velocity.",
            "Minimized application downtime by building and monitoring real-time Grafana dashboards to proactively isolate anomalies and resolve root-cause troubleshooting for production issues."
        ],
        skills: ["Angular", "TypeScript", "RxJS", "C#", "ASP.NET Core", "OAuth 2.0", "Grafana", "GitHub Copilot"]
    },
    {
        dateRange: "August 2020 - March 2022",
        title: "Software Engineer I",
        company: "United Parcel Service (UPS)",
        location: "Timonium, MD",
        bullets: [
            "Maintained Angular and ASP.NET Core applications by implementing targeted feature enhancements, resolving production defects, and refactoring full-stack code to optimize legacy system maintainability.",
            "Streamlined defect resolution cycles by debugging full-stack code paths, reproducing complex edge cases, and validating REST API payloads and OAuth workflows using Postman.",
            "Onboarded 7 engineers on the Shipping team by leading knowledge transfer sessions for the newly implemented AEM content translations framework, driving 100% team adoption.",
            "Optimized production application stability by proactively investigating anomalies, reducing recurring codebase issues by 20% through automated validations and robust unit testing."
        ],
        skills: ["Angular", "ASP.NET Core", "REST APIs", "Postman#", "Agile Scrum", "HTML5", "CSS3"]
    },
    {
        dateRange: "June 2019 - July 2020",
        title: "Software Engineer",
        company: "National Grid",
        location: "Waltham, MA",
        bullets: [
            "Automated outage reporting workflows using Python and pandas, acclerating reporting speed by 40$ to deliver daily power restoration updates for management, and streamline storm duty crew coordination.",
            "Deployed interactive geospatial web tools via ArcGIS Online, providing 600+ field staff across the Electric Business with real-time asset visualizations that reduced coordination delays by 25%.",
        ],
        skills: ["Angular", "TypeScript", "RxJS", "C#", "ASP.NET Core", "OAuth 2.0", "Grafana", "GitHub Copilot"]
    },
    {
        dateRange: "July 2016 - May 2019",
        title: "Software Engineer",
        company: "City of New York - Financial Information Services Agency",
        location: "New York, NY",
        bullets: [
            "Developed business intelligence reports within CA Scheduler using Oracle SQL and custom JavaScript, tracking 100+ JCL job execution statuses daily to provide real-time operational visibility to financial stakeholders.",
            "Engineered custom ad-hoc SQL queries based on stakeholder requirements, saving 5+ hours of manual data extraction per week while delivering rapid insights for financial application monitoring.",
        ],
        skills: ["Angular", "TypeScript", "RxJS", "C#", "ASP.NET Core", "OAuth 2.0", "Grafana", "GitHub Copilot"]
    },
]