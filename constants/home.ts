import { faFacebook, faLinkedin, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

export const homepageSkillSet: string[] = [
    "Web/Mobile Developer",
    "UI/UX Designer",
    "Database Engineer",
]

export const socialMediaLinks = [
    { icon: faFacebook, href: process.env.NEXT_PUBLIC_FACEBOOK_LINK },
    { icon: faLinkedin, href: process.env.NEXT_PUBLIC_LINKEDIN_LINK },
    { icon: faInstagram, href: process.env.NEXT_PUBLIC_INSTAGRAM_LINK },
    { icon: faGithub, href: process.env.NEXT_PUBLIC_GITHUB_LINK },
];