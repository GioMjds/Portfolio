interface Certificates {
	name: string;
	path: string;
	icons?: string[];
}

export const certificates: Certificates[] = [
	{
		name: "JavaScript Algorithms and Data Structures",
		path: "@/../public/certifications/javascript-algo-and-data-structures.png",
		icons: ["/programming-icons-svg/javascript.svg"],
	},
	{
		name: "Meta Front-End Developer",
		path: "@/../public/certifications/meta-frontend.png",
		icons: [
			"/programming-icons-svg/html.svg",
			"/programming-icons-svg/css.svg",
			"/programming-icons-svg/javascript.svg",
			"/programming-icons-svg/react.svg",
		],
	},
	{
		name: "Front-End Development Libraries",
		path: "@/../public/certifications/front-end-development-libraries.png",
		icons: [
			"/programming-icons-svg/sass-original.svg",
			"/programming-icons-svg/react.svg",
		],
	},
	{
		name: "Meta Database Engineer",
		path: "@/../public/certifications/meta-database-engineer.png",
		icons: [
			"/programming-icons-svg/mysql.svg",
			"/programming-icons-svg/python.svg",
		],
	},
	{
		name: "Back-End Development and APIs",
		path: "@/../public/certifications/backend-development-and-apis.png",
		icons: [
			'/programming-icons-svg/express-original-wordmark.svg',
			'/programming-icons-svg/mongodb-original.svg',
			'/programming-icons-svg/npm.svg',
			'/programming-icons-svg/nodejs.svg',
		]
	},
	{
		name: "CCS Summit 2024: Basics of PowerBI",
		path: "@/../public/certifications/basics-of-powerbi.png",
	},
	{
		name: "CCS Summit 2024: Chatbot using Natural Language Processing with Regex",
		path: "@/../public/certifications/nlp-using-regex.png",
	},
	{
		name: "CCS Summit 2025: Transforming Industries Through Technology",
		path: "@/../public/certifications/industries-through-tech.png",
	},
	{
		name: "CCS Summit 2025: The Road to IT Consulting",
		path: "@/../public/certifications/road-to-it-consulting.png",
	},
	{
		name: "IT General Assembly 2025: Pushing to Progress",
		path: "@/../public/certifications/pushing-to-progress.png",
	},
	{
		name: "Cyber Security Webinar 2025: Mastering Cybersecurity Essentials",
		path: "@/../public/certifications/mastering-cybersecurity.png",
	},
	{
		name: "Cyber Security Webinar 2025: Introduction to Secure Coding Practices",
		path: "@/../public/certifications/secure-coding-practices.png",
	},
];
