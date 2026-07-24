export interface ProjectItem {
    imageLink: string;
    title: string;
    description: string;
    skills: string[];
}

export const projectData: ProjectItem[] = [
    {
        imageLink: "Project imageLink",
        title: "Project Title holder",
        description: "Project Description holder",
        skills: ["skill1", "skill2", "skill3"]
    }
]