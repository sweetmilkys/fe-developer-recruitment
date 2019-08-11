import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    
    @import "responsive";

    html {
    height: 100%;
    }

    body {
    height: 101%;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333333;
    background-color: #f8f8fa;
    font-family: -apple-system, Helvetica, Arial, "hiragino kaku gothic pro",
        meiryo, "Microsoft YaHei", "ms pgothic", "Apple SD Gothic Neo",
        "Nanum Gothic", "Malgun Gothic", sans-serif;
    }

    body.stop-scrolling {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    }

    .container {
    padding: 0;
    max-width: 1060px;
    }

    input,
    input:focus {
    outline: none !important;
    box-shadow: none !important;
    }

    input[type="text"],
    textarea {
    box-shadow: none !important;
    -moz-appearance: none;
    -webkit-appearance: none;
    resize: none;
    }

    .no-radius {
    border-radius: 0;
    }

    .no-padding {
    padding: 0;
    }

    button,
    .btn-group,
    .open,
    .dropdown-toggle,
    .btn {
    box-shadow: none !important;
    }

    .cb {
    clear: both;
    display: block;
    }

    .hidden {
    display: none;
    }

    a {
    cursor: pointer;
    }

    .btn-mint {
    background: #14c179;
    color: #ffffff;
    border: 0;

    &:hover,
    &:active,
    &:focus {
        background: #0fac87;
        color: #ffffff;
    }
    }

    .ui-gray_point {
    margin-bottom: 4px;
    margin-left: 3px;
    margin-right: 4px;
    }

    .modal-content {
    box-shadow: none !important;
    }

    *:focus,
    input:focus,
    button:focus,
    a:focus {
    outline: none !important;
    }

    .btn-white {
    color: inherit;
    background: white;
    border: 1px solid #d2d3d4;
    }
    .btn-white:hover,
    .btn-white:focus,
    .btn-white:active,
    .btn-white.active,
    .open .dropdown-toggle.btn-white {
    color: inherit;
    border: 1px solid #d2d2d2;
    }

    .border-radius {
    border-radius: 4px;
    }

    [class^="job-icons-"],
    [class*="job-icons-"] {
    display: inline-block;
    }

    @include respond-to(xs) {
    body {
        overflow-x: hidden;
    }
    }

    .no-translate {
    font-weight: bold;
    color: #ee4bb5 !important;
    }

    .feedback-button-hide {
    display: none !important;
    }

    .feedback-button-hide-small {
    @include respond-to(xs) {
        display: none !important;
    }
    @include respond-to(sm) {
        display: none !important;
    }
    }

    .row {
    margin: 0;
    }

    .checkbox {
    margin: 0;

    input[type="checkbox"] {
        top: 2px;
        width: 14px;
        height: 14px;
        margin: 0;
        margin-right: 5px;
        position: relative;
        border: 0;
        background-image: url("https://s3.ap-northeast-2.amazonaws.com/wanted-public/checkbox.svg");
        background-size: cover;
        -moz-appearance: none;
        -webkit-appearance: none;

        &:checked {
        background-image: url("https://s3.ap-northeast-2.amazonaws.com/wanted-public/checkbox_.svg");
        }
    }

    label {
        padding: 0;
    }
    }

    .rotate180 {
    transform: rotate(180deg);
    }

    .rotate90 {
    transform: rotate(90deg);
    }

    #sims-button {
    position: fixed;
    bottom: 60px;
    right: 40px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: red;
    color: white;
    font-size: 20px;
    text-align: center;
    padding: 26px 0px;
    z-index: 100;
    cursor: pointer;
    }

    #app-contents {
    padding-top: 50px;

        &.noNav {
            padding-top: 0;
        }
    }

    a,
    abbr,
    acronym,
    address,
    applet,
    article,
    aside,
    audio,
    b,
    big,
    blockquote,
    body,
    canvas,
    caption,
    center,
    cite,
    code,
    dd,
    del,
    details,
    dfn,
    div,
    dl,
    dt,
    em,
    embed,
    fieldset,
    figcaption,
    figure,
    footer,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    header,
    hgroup,
    html,
    i,
    iframe,
    img,
    ins,
    kbd,
    label,
    legend,
    li,
    mark,
    menu,
    nav,
    object,
    ol,
    output,
    p,
    pre,
    q,
    ruby,
    s,
    samp,
    section,
    small,
    span,
    strike,
    strong,
    sub,
    summary,
    sup,
    table,
    tbody,
    td,
    tfoot,
    th,
    thead,
    time,
    tr,
    tt,
    u,
    ul,
    var,
    video {
        margin: 0;
        padding: 0;
        border: 0
    }

    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block
    }

    ol,
    ul {
        list-style: none
    }

    blockquote,
    q {
        quotes: none
    }

    blockquote:after,
    blockquote:before,
    q:after,
    q:before {
        content: "";
        content: none
    }

    table {
        border-collapse: collapse;
        border-spacing: 0
    }

    a {
        text-decoration: inherit;
        cursor: pointer
    }

    a,
    a:active,
    a:hover,
    a:visited {
        color: inherit
    }

    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none
    }
`;

export default globalStyles;
