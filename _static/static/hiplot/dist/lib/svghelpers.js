/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as d3 from "d3";
import style from "../hiplot.scss";
function leftPos(anchor, w) {
    return {
        end: -w,
        start: 0,
        middle: -w / 2
    }[anchor];
}
export function foDynamicSizeFitContent(fo) {
    var TOOLTIP_WIDTH_PX = 80;
    var w = Math.floor(fo.children[0].children[0].clientWidth + 2); // borders 2 px
    var h = Math.floor(fo.children[0].children[0].clientHeight + 2);
    var anchor = fo.getAttribute("text-anchor");
    var tooltip = fo.children[0].children[1];
    var anchor_x = leftPos(anchor, w);
    fo.setAttribute("x", "" + anchor_x);
    // Set tooltip
    if (tooltip) {
        var tooltip_anchor_x = leftPos(anchor, TOOLTIP_WIDTH_PX) - anchor_x;
        var tooltip_width = Math.min(TOOLTIP_WIDTH_PX, TOOLTIP_WIDTH_PX - tooltip_anchor_x);
        tooltip.style.marginLeft = tooltip_anchor_x + "px";
        tooltip.style.width = tooltip_width + "px";
    }
    fo.style.width = w + "px";
    fo.style.height = h + "px";
    fo.style.overflow = "visible";
}
export function foCreateAxisLabel(pd, cm, tooltip) {
    if (tooltip === void 0) { tooltip = "Right click for options"; }
    var fo = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
    var span = d3.select(fo).append("xhtml:div")
        .classed(style.tooltipContainer, true)
        .classed(style.label, true);
    span.append("xhtml:span").attr("class", pd.label_css)
        .classed("d-inline-block", true)
        .html(pd.name)
        .on("contextmenu", function () {
        if (cm) {
            cm.current.show(d3.event.pageX, d3.event.pageY, pd.name);
            d3.event.preventDefault();
            d3.event.stopPropagation();
        }
    });
    if (tooltip) {
        span.append("span")
            .classed(style.tooltiptext, true)
            .classed(style.tooltipBot, true)
            .classed("d-inline-block", true)
            .text(tooltip);
    }
    return fo;
}