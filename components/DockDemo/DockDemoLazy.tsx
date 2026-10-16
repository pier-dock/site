"use client";

import dynamic from "next/dynamic";

// Chunk separado: o HTML da demo vem no prerender, mas o JS dela não disputa banda com o resto da página.
export const DockDemoLazy = dynamic(() => import("./DockDemo"));
