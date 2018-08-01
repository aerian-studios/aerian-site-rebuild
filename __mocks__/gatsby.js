"use strict";
import React from "react";
const gatsby = jest.genMockFromModule("gatsby");
gatsby.graphql = jest.fn();
gatsby.Link = ({ to, ...props }) => <a href={to} {...props} />;

module.exports = gatsby;
