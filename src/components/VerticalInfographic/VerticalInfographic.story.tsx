import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { VerticalInfographic } from ".";
import { infographic } from "../../types/fixtures";
import { infographics } from "../../types/fixtures";

storiesOf("VerticalInfographic", module)
    .add(
        "Horizontal",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[0]} />
        ))
    )
    .add(
        "Horizontal 2",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[1]} />
        ))
    )
    .add(
        "Horizontal 3",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[2]} />
        ))
    )
    .add(
        "Split",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[3]} />
        ))
    )
    .add(
        "Bar",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[4]} />
        ))
    )
    .add(
        "Bar 2",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[5]} />
        ))
    )
    .add(
        "Bar 3",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[6]} />
        ))
    )
    .add(
        "Vertical",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[7]} />
        ))
    )
    .add(
        "Vertical 1",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[8]} />
        ))
    )
    .add(
        "Horizontal 4",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[9]} />
        ))
    )
    .add(
        "Horizontal 5",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[10]} />
        ))
    )
    .add(
        "Other 1",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[11]} />
        ))
    )
    .add(
        "Other 2",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[12]} />
        ))
    )
    .add(
        "Other 3",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[13]} />
        ))
    )
    .add(
        "Other 4",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[14]} />
        ))
    )
    .add(
        "Other 5",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[15]} />
        ))
    )
    .add(
        "Other 6",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[16]} />
        ))
    )
    .add(
        "Other 7",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[17]} />
        ))
    )
    .add(
        "Other 8",
        withInfo({ inline: true })(() => (
            <VerticalInfographic infographic={infographics[18]} />
        ))
    );
