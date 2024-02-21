import React from "react";
import { Redirect } from "@docusaurus/router";
// const { unwrapMdxCodeBlocks } = require('./markdownUtils');

export default function Home() {
  return <Redirect to="docs" />;
}
