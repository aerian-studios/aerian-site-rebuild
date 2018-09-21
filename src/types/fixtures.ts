import {
    About,
    Client,
    ImageField,
    ImageSharp,
    Infographic,
    MeetTheTeam,
    PageSection,
    Performance,
    Project,
    ProjectBox,
    SuccessStory,
    Testimonial,
    WhatWeDo
} from "./data";

import * as aboutData from "../pages/about.json";
import * as clientData from "../pages/clients/cnn.json";
import * as meetTheTeamData from "../pages/meet-the-team.json";
import * as projectData from "../pages/projects/bbc-iwonder-perfect-diet-for-you.json";
import * as whatWeDoData from "../pages/what-we-do.json";

import { absolutifyURLs } from "../lib/helpers";
export const client = absolutifyURLs<Client>(clientData);

export const project = { ...absolutifyURLs<Project>(projectData), client };
export const projectBox: ProjectBox = {
    name: project.name,
    slug: project.slug,
    titleLineOne: project.titleLineOne,
    thumbnail: project.heroImage,
    heroImage: project.heroImage,
    client
};
export const whatWeDo = absolutifyURLs<Required<WhatWeDo>>(whatWeDoData);
export const about = absolutifyURLs<About>(aboutData);
export const meetTheTeam = absolutifyURLs<MeetTheTeam>(meetTheTeamData);
export const projectStage = project.challenge;
export const hurdles = projectStage.hurdles;
export const hurdle = hurdles[0];
export const performances: Performance[] = project.performance as Performance[];
export const performance = performances[0];
export const testimonial: Testimonial = project.testimonial as Testimonial;
export const testimonialSection: PageSection = whatWeDo.sections[0];
export const successStorySection: PageSection = whatWeDo.sections[1];
export const successStory: SuccessStory = successStorySection.successStory as SuccessStory;
export const pageSection = {
    ...successStorySection,
    testimonial: testimonialSection.testimonial
} as Required<PageSection>;
export const activity = pageSection.activities[0];
export const stat = successStory.stats![0];
export const staff = meetTheTeam.staff;
export const person = staff[0];
export const infographics = about.infographic as Infographic[];
export const infographic = infographics[0];

export const image: string = person.imageFunny as string;
export const imageSharpFluid: ImageSharp = {
    childImageSharp: {
        fluid: {
            aspectRatio: 3 / 4,
            sizes: "(max-width: 290px) 100vw, 290px",
            base64:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAACXBIWXMAAAsSAAALEgHS3X78AAAEe0lEQVQ4y42Te1BUVRzH70z/9V9ZToXy2GXfD3Z57C4sDyHtreWMIqmEgUVCak4qwiiRiausiIhk6JLiAzXGEE1FBVMaEBtsrJnQwsEaNTMbmxRrFJZP516EWXykZ+Y3d/fc7/mc7+9xJQJWf3+/8vT7/dy9BvdkzaDufkt6EKznxnXKS0uo+rSCP69eVfb6+vqGaf8XGCjs6enhtZdeRJIkHn9MwmGzcv589yNBhzns7e1VfnuKP2GcTY8nO51Vs96iaNp4ctImcvn3K0NZPBJQXn9fv8EHGWkcKfuIrrpqftmzlXO1VVTNnUG1SD/Q5QOBMszvHxB9297G4sxUjlV5+bqylK76Lzi2bjUNxflsWeOhr1858HCH/ju3fnP8KMU502mqWMmmRR/Sss7L/pKl1OTPY/daDzf/+ffhNRxwONDd002H2LDofVrWe2kuW8FRz8ecKPPQXuGhtVwAL10cAN5ntIYBBwW/7d9Hw7ICftjpo2tLJY1FBTQVL6FzUyXt4oKe7u6HAwMFt8SBI6XLOSAcndpcSUt5CQ3zFnCgpJDmSi83/7r2aCkHujwrGrPLs4RD65bTurGcVpHyHs9CTjTsHLr8QV/M8MG+A7z2xxWqlxbgK5zHcd9qmtcuY33eLH463aG87+29PQS7+ykF3jRws+j47Vs0VJRQNieLls1llOZm8NnC9zjbcXKYG3ke5Qgc9CHg4At5nTzZQXVRPnVF8+ms89HiK6XN52V1QR4rSsro7Dxzz3APQiX5RWAtjhxuIjnlZTInTaamYDY/1lXx84FaOr+spjAnmxFPP4fZFMHENyZTXLySxoOHuXDh4r01bGtrJzPzXWKi43A43FgskazJn0tn/Qa6m3fzff1WslJT0WgNGAwmgoPDGD0qjHC1AacjnqKiZcK1H2n79h1kZ+cSGelArzPhcsUTF5vAE089S17GJM41bKTr8C6+27uT1PGvowrXodHIoUevN2G1RmI22xUjly5dRgoOVhEaqhab1jsRgcVqEw5C8eXN5PzeDZxp3MHBmhqy3pxKiNBqwrWo1Vq0wq3ZbBPQKGEiidraXUgGgxk5jEazkoocJgFOco/h88X5/LpvG6f2bmP/1t3MnpZOmFqDTmdU3JlMVgVoMgmoJUqUKh5pVFCIIpChOhFarR6bLYqEhOdxu8eSnTaDqhVeWr86Rm5WNuEiXaPJImpsE7oY7CJkt0aDlVhXItKIJ0diMloYHaLmnSmT8M6fI+oRS0J8ihIOIYpzp7AwdwFZU6djEFr5Qrs9huiYWHE2QpTAIHrgxBHjRhopxkCl1vNCUhKN61fx9pQ0YoT1ROEw3p3MmKRxxMYmKk6S3fHY7NFKA+WQG6JSaZS0o6JcRAsj0jMjgwgarSLt1VdYPDODUDEGcoFdrgSRdgqJiWPR6S2kTUwlfcIELBGRwkmccOhQQGGh4ei0RsVhpN2JFBoSTliYFrslgmSnUznsFHPociYoMLkuKpWWKJGiS4BstmglXbmzBoOFoKBgAdUQIf7L8R+bum8HTMuX7wAAAABJRU5ErkJggg==",
            src: image,
            srcSet: image
        }
    }
};

export const imageSharpFixed: ImageSharp = {
    childImageSharp: {
        fixed: {
            width: 290,
            height: 290,
            base64:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAACXBIWXMAAAsSAAALEgHS3X78AAAEe0lEQVQ4y42Te1BUVRzH70z/9V9ZToXy2GXfD3Z57C4sDyHtreWMIqmEgUVCak4qwiiRiausiIhk6JLiAzXGEE1FBVMaEBtsrJnQwsEaNTMbmxRrFJZP516EWXykZ+Y3d/fc7/mc7+9xJQJWf3+/8vT7/dy9BvdkzaDufkt6EKznxnXKS0uo+rSCP69eVfb6+vqGaf8XGCjs6enhtZdeRJIkHn9MwmGzcv589yNBhzns7e1VfnuKP2GcTY8nO51Vs96iaNp4ctImcvn3K0NZPBJQXn9fv8EHGWkcKfuIrrpqftmzlXO1VVTNnUG1SD/Q5QOBMszvHxB9297G4sxUjlV5+bqylK76Lzi2bjUNxflsWeOhr1858HCH/ju3fnP8KMU502mqWMmmRR/Sss7L/pKl1OTPY/daDzf/+ffhNRxwONDd002H2LDofVrWe2kuW8FRz8ecKPPQXuGhtVwAL10cAN5ntIYBBwW/7d9Hw7ICftjpo2tLJY1FBTQVL6FzUyXt4oKe7u6HAwMFt8SBI6XLOSAcndpcSUt5CQ3zFnCgpJDmSi83/7r2aCkHujwrGrPLs4RD65bTurGcVpHyHs9CTjTsHLr8QV/M8MG+A7z2xxWqlxbgK5zHcd9qmtcuY33eLH463aG87+29PQS7+ykF3jRws+j47Vs0VJRQNieLls1llOZm8NnC9zjbcXKYG3ke5Qgc9CHg4At5nTzZQXVRPnVF8+ms89HiK6XN52V1QR4rSsro7Dxzz3APQiX5RWAtjhxuIjnlZTInTaamYDY/1lXx84FaOr+spjAnmxFPP4fZFMHENyZTXLySxoOHuXDh4r01bGtrJzPzXWKi43A43FgskazJn0tn/Qa6m3fzff1WslJT0WgNGAwmgoPDGD0qjHC1AacjnqKiZcK1H2n79h1kZ+cSGelArzPhcsUTF5vAE089S17GJM41bKTr8C6+27uT1PGvowrXodHIoUevN2G1RmI22xUjly5dRgoOVhEaqhab1jsRgcVqEw5C8eXN5PzeDZxp3MHBmhqy3pxKiNBqwrWo1Vq0wq3ZbBPQKGEiidraXUgGgxk5jEazkoocJgFOco/h88X5/LpvG6f2bmP/1t3MnpZOmFqDTmdU3JlMVgVoMgmoJUqUKh5pVFCIIpChOhFarR6bLYqEhOdxu8eSnTaDqhVeWr86Rm5WNuEiXaPJImpsE7oY7CJkt0aDlVhXItKIJ0diMloYHaLmnSmT8M6fI+oRS0J8ihIOIYpzp7AwdwFZU6djEFr5Qrs9huiYWHE2QpTAIHrgxBHjRhopxkCl1vNCUhKN61fx9pQ0YoT1ROEw3p3MmKRxxMYmKk6S3fHY7NFKA+WQG6JSaZS0o6JcRAsj0jMjgwgarSLt1VdYPDODUDEGcoFdrgSRdgqJiWPR6S2kTUwlfcIELBGRwkmccOhQQGGh4ei0RsVhpN2JFBoSTliYFrslgmSnUznsFHPociYoMLkuKpWWKJGiS4BstmglXbmzBoOFoKBgAdUQIf7L8R+bum8HTMuX7wAAAABJRU5ErkJggg==",
            src: image,
            srcSet: image
        }
    }
};
export const imageSharp = imageSharpFluid;
export const imageField: ImageField = imageSharp;
