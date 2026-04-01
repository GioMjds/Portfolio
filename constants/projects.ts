import type { Route } from "next";

export type ProjectStatus = 'finished' | 'pending' | 'in-development' | 'archived';

export interface TechStack {
    name: string;
    icon: string;
}

export interface Projects {
    projectId: number;
    projectName: string;
    description: string;
    stacks: TechStack[];
    image: string;
    githubLink?: Route;
    status: ProjectStatus;
    liveLink?: Route;
    features?: string[];
}

export const projects: Projects[] = [
    {
        projectId: 1,
        projectName: "Azurea Hotel Management System",
        description: "A comprehensive hotel management system built with React and Django. Features booking verification, area reservation management, transaction cancellation, guest reviews per room/area, detailed reporting dashboard, and full CRUD operations for amenities, rooms, areas, and admin users.",
        stacks: [
            { name: "React", icon: "/programming-icons-svg/react.svg" },
            { name: "Django", icon: "/programming-icons-svg/django.svg" },
            { name: "Django REST Framework", icon: "/programming-icons-svg/djangorest-original.svg" },
            { name: "MySQL", icon: "/programming-icons-svg/mysql.svg" },
            { name: "TypeScript", icon: "/programming-icons-svg/typescript.svg" },
            { name: "Tailwind CSS", icon: "/programming-icons-svg/tailwindcss-original.svg" }
        ],
        image: "/projects/azureahotel.png",
        githubLink: "https://github.com/GioMjds/AzureaHotel",
        status: "finished",
        features: [
            "Real-time booking management",
            "CRUD Rooms & Areas",
            "Guest reviews and ratings",
            "Comprehensive reporting dashboard",
            "User authentication and roles",
            "Responsive design for all devices",
            "CRUD Room Amenities",
            "Admin-side user management",
            "Manage Guest Bookings",
            "Review and Ratings System"
        ]
    },
    {
        projectId: 2,
        projectName: "Chatify",
        description: "A simple real-time chat application powered by React and Firebase. Enables seamless user registration, instant messaging, online status indicators, and persistent chat history with beautiful, intuitive UI design.",
        stacks: [
            { name: "React", icon: "/programming-icons-svg/react.svg" },
            { name: "Firebase", icon: "/programming-icons-svg/firebase.svg" },
            { name: "JavaScript", icon: "/programming-icons-svg/javascript.svg" },
            { name: "CSS", icon: "/programming-icons-svg/css.svg" },
            { name: "HTML", icon: "/programming-icons-svg/html.svg" }
        ],
        image: "/projects/chatify.png",
        githubLink: "https://github.com/GioMjds/Chatify",
        status: "finished",
        features: [
            "Real-time messaging",
            "User authentication",
            "Online status tracking",
            "Message persistence",
            "Responsive chat interface"
        ]
    },
    {
        projectId: 3,
        projectName: "WiseWaste",
        description: "An innovative waste management system that empowers communities to report and track waste issues in their local areas. Built with Next.js and PostgreSQL for scalable waste monitoring and environmental improvement.",
        stacks: [
            { name: "Next.js", icon: "/programming-icons-svg/nextjs-original.svg" },
            { name: "PostgreSQL", icon: "/programming-icons-svg/postgresql.svg" },
            { name: "TypeScript", icon: "/programming-icons-svg/typescript.svg" },
            { name: "Tailwind CSS", icon: "/programming-icons-svg/tailwindcss-original.svg" },
            { name: "React", icon: "/programming-icons-svg/react.svg" }
        ],
        image: "/projects/wisewaste.png",
        githubLink: "https://github.com/GioMjds/WiseWaste",
        status: "finished",
        features: [
            "Geolocation-based reporting",
            "Issue tracking system",
            "Community dashboard",
            "Admin management panel",
            "Mobile-first design"
        ]
    },
    {
        projectId: 4,
        projectName: "Printify",
        description: "A streamlined print-on-demand portal that simplifies document printing services. Users can easily upload documents, customize printing options, and manage orders through an elegant and user-friendly interface.",
        stacks: [
            { name: "Next.js", icon: "/programming-icons-svg/nextjs-original.svg" },
            { name: "PostgreSQL", icon: "/programming-icons-svg/postgresql.svg" },
            { name: "TypeScript", icon: "/programming-icons-svg/typescript.svg" },
            { name: "React", icon: "/programming-icons-svg/react.svg" },
            { name: "Tailwind CSS", icon: "/programming-icons-svg/tailwindcss-original.svg" }
        ],
        image: "/projects/printify.png",
        githubLink: "https://github.com/GioMjds/Printify",
        status: "finished",
        features: [
            "Upload and manage documents",
            "File upload system",
            "Order management",
            "Payment processing",
            "Print customization",
            "Order tracking"
        ]
    },
    {
        projectId: 5,
        projectName: "Savoury",
        description: "A recipe-sharing platform that connects food enthusiasts worldwide. Users can discover, share, and save recipes, create shopping lists, and follow their favorite chefs in a vibrant culinary community.",
        stacks: [
            { name: "Next.js", icon: "/programming-icons-svg/nextjs-original.svg" },
            { name: "TypeScript", icon: "/programming-icons-svg/typescript.svg" },
            { name: "React", icon: "/programming-icons-svg/react.svg" },
            { name: "Tailwind CSS", icon: "/programming-icons-svg/tailwindcss-original.svg" },
            { name: "PostgreSQL", icon: "/programming-icons-svg/postgresql.svg" }
        ],
        image: "/projects/savoury.png",
        githubLink: "https://github.com/GioMjds/Savoury",
        status: "finished",
        features: [
            "Recipe discovery",
            "User profiles",
            "Save and share recipes",
            "Post new recipes",
            "Edit profile"
        ]
    },
    {
        projectId: 6,
        projectName: "Commitly",
        description: "Developers lose track of daily accomplishments, GitHub activity is isolated, and establishing consistent coding habits feels like an uphill battle. Commitly solves this by combining manual assessment with automated GitHub commit tracking—allowing you to see every step of your journey, celebrate streaks, and stay accountable without friction",
        stacks: [
            { name: "React Native", icon: "/programming-icons-svg/react.svg" },
            { name: "Firebase", icon: "/programming-icons-svg/firebase.svg" },
            { name: "Zustand", icon: "/programming-icons-svg/zustand-original.svg" },
            { name: "GitHub API", icon: "/programming-icons-svg/github-original.svg" },
        ],
        image: "/projects/commitly.jpg",
        githubLink: "https://github.com/GioMjds/Commitly",
        status: "finished",
        "features": [
            "User Authentication using Firebase Authentication",
            "Adding Manual Entry of Commits",
            "Calendar, Streak, and Stats",
            "Motivational Coaching",
            "User Settings for Preferences",
            "'Call It a Day' Feature"
        ]
    }
]