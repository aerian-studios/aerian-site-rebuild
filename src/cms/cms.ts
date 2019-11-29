import CMS from "netlify-cms-app";
import * as React from "react";
import "../lib/theme";

// import preview templates for the CMS here
// import AboutPagePreview from "./preview-templates/AboutPagePreview";
import ProjectPagePreview from "./preview-templates/ProjectPagePreview";

// // Styles for the CMS

// // Register preview templates
// CMS.registerPreviewTemplate("what-we-do", AboutPagePreview);
CMS.registerPreviewTemplate("projects", ProjectPagePreview);
