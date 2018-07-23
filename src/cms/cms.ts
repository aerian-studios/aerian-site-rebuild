import CMS from "netlify-cms";
import "netlify-cms/dist/cms.css";
import * as React from "react";
import "../lib/theme";

// import preview templates for the CMS here
// import AboutPagePreview from "./preview-templates/AboutPagePreview";
import ProjectPagePreview from "./preview-templates/ProjectPagePreview";

// // Styles for the CMS
CMS.registerPreviewStyle("/styles.css");

// // Register preview templates
// CMS.registerPreviewTemplate("what-we-do", AboutPagePreview);
CMS.registerPreviewTemplate("projects", ProjectPagePreview);
