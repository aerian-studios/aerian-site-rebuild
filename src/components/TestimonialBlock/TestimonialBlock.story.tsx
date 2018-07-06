
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { TestimonialBlock } from "./index";


storiesOf("TestimonialBlock", module).add(
    "Without Image", 
    withInfo({ inline: true })(() => (
    <TestimonialBlock  
        className="myClass" 
            mainImage="" 
        quoteIcon="quoteIcon.." 
        testimonialText="Aerian delivered the design to brief and beyond. They are a great bunch to work with - really collaborative, 
            and intent on getting the right design for the brand and for the user. They tackle problems head on with creativity and focus. 
            I loved working on this project with them and am chuffed to bits with the result." 
        reviewerAvatar="reviewerAvatart" 
        reviewerName="Louise Goodspeed" 
        jobTitle=" Lead UX"
    />
    ))).add(
        "With Image",
        withInfo({ inline: true })(() => (
            <TestimonialBlock
                className="myClass"
                mainImage="https://www.aerian.com/images/483/scaledcroppedtop/490x590/resources/483/paolo-funny.png"
                quoteIcon="quoteIcon.."
                testimonialText="Aerian delivered the design to brief and beyond. They are a great bunch to work with - really collaborative, 
                    and intent on getting the right design for the brand and for the user. They tackle problems head on with creativity and focus. 
                    I loved working on this project with them and am chuffed to bits with the result." 
                reviewerAvatar="reviewerAvatart" 
                reviewerName="Louise Goodspeed" 
                jobTitle=" Lead UX"
            />
        )))
