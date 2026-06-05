const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign,
} = require("docx");

// ---- Tutti i copy ATTUALI della landing, in ordine, raggruppati per sezione ----
const sections = [
  {
    name: "Header / Navigation",
    rows: [
      ["NAV_1", "Protocol"],
      ["NAV_2", "Why Atlas"],
      ["NAV_3", "Builders"],
      ["NAV_4", "Use cases"],
      ["NAV_CTA", "Get in touch"],
    ],
  },
  {
    name: "Hero",
    rows: [
      ["HERO_BADGE", "Now onboarding launch partners"],
      ["HERO_H1", "Launch your lending, credit, or yield product onchain"],
      ["HERO_SUB", "Folks Atlas enables institutions and builders to deploy fully-configurable lending environments for any type of asset without the need of rebuilding the stack. Speak with our team to explore a tailored integration."],
      ["HERO_CTA", "Get in touch"],
    ],
  },
  {
    name: "Proven (stats)",
    rows: [
      ["PROVEN_EYEBROW", "Proven, not experimental"],
      ["PROVEN_H2", "Built on battle-tested foundations"],
      ["PROVEN_PARA", "Atlas is the next generation of Folks Finance, opened up for everyone to build on."],
      ["PROVEN_STAT1_NUM", "5+"],
      ["PROVEN_STAT1_LABEL", "years of uninterrupted mainnet operation"],
      ["PROVEN_STAT2_NUM", "$[X]B+   ← placeholder da compilare"],
      ["PROVEN_STAT2_LABEL", "in lifetime loan volume"],
      ["PROVEN_STAT3_NUM", "240K+"],
      ["PROVEN_STAT3_LABEL", "total unique users"],
      ["PROVEN_STAT4_NUM", "9"],
      ["PROVEN_STAT4_LABEL", "chains supported"],
    ],
  },
  {
    name: "Spokes",
    rows: [
      ["SPOKES_EYEBROW", "Spokes"],
      ["SPOKES_H2", "Build your own lending environment"],
      ["SPOKES_PARA", "A Spoke is an isolated lending environment you fully control. List as many collateral and borrow assets as you need, then configure every parameter to match your strategy and compliance needs."],
      ["SPOKES_CAPTION", "Designed for institutions and builders"],
      ["SPOKES_MODULE_1", "Multi-collateral & multi-borrow"],
      ["SPOKES_MODULE_2", "Custom interest rate models"],
      ["SPOKES_MODULE_3", "KYC / AML & whitelists"],
      ["SPOKES_MODULE_4", "Configurable liquidation engine"],
      ["SPOKES_MODULE_5", "Any oracle (Chainlink, Pyth…)"],
      ["SPOKES_MODULE_6", "Privacy module"],
      ["SPOKES_MODULE_7", "Insurance & security modules"],
      ["SPOKES_MODULE_8", "White-label frontend"],
    ],
  },
  {
    name: "Vaults",
    rows: [
      ["VAULTS_DIAGRAM_TITLE", "Vault deposit"],
      ["VAULTS_DIAGRAM_TOKEN", "USDC"],
      ["VAULTS_DIAGRAM_SPOKE_A", "Spoke A"],
      ["VAULTS_DIAGRAM_SPOKE_B", "Spoke B"],
      ["VAULTS_DIAGRAM_SPOKE_C", "Spoke C"],
      ["VAULTS_EYEBROW", "Vaults"],
      ["VAULTS_H2", "Curated yield, one click away for your users"],
      ["VAULTS_PARA", "Curators can package approved Spokes, allocation targets, and risk controls into a single Vault. Users deposit once and earn yield automatically, while curators manage allocations and rebalancing behind the scenes."],
      ["VAULTS_CAPTION", "Designed for curators and asset managers"],
    ],
  },
  {
    name: "Why Atlas",
    rows: [
      ["WHY_EYEBROW", "Why Atlas"],
      ["WHY_H2", "Launch with liquidity from day one"],
      ["WHY_PARA", "Monolithic money markets concentrate liquidity into a single set of rules. Modular systems allow customization, but liquidity becomes fragmented. Atlas introduces a new lending architecture: shared liquidity at the Hubs, and fully configurable lending environments at the Spokes."],
      ["WHY_CARD1_TITLE", "Custom Lending Environments: Spokes"],
      ["WHY_CARD1_DESC", "Create specialized lending environments for any asset class. Configure risk parameters, oracles, interest rate models, liquidations, compliance requirements, and custom modules while maintaining full control."],
      ["WHY_CARD2_TITLE", "Launch with liquidity from day one: courtesy of the Hubs"],
      ["WHY_CARD2_DESC", "Access liquidity from the Atlas Hubs to bootstrap new lending markets without facing the cold-start problem and systemic risks."],
      ["WHY_CARD3_TITLE", "Curated Capital Allocation: Vaults"],
      ["WHY_CARD3_DESC", "Provide a single entry point to your users with Vaults. Liquidity can be routed across approved Spokes according to predefined allocation limits, risk constraints, and rebalancing logic, enabling tailored lending and yield strategies."],
    ],
  },
  {
    name: "Use cases",
    rows: [
      ["USECASES_EYEBROW", "Use cases"],
      ["USECASES_H2", "One protocol, every lending market"],
      ["USECASES_PARA", "From permissionless lending markets to permissioned institutional venues and real-world assets, configure a Spoke for any need."],
      ["USECASE_1_TITLE", "Generalised lending"],
      ["USECASE_1_DESC", "Recreate a full multi-asset money market with the collateral and borrow parameters you choose."],
      ["USECASE_2_TITLE", "Efficiency lending"],
      ["USECASE_2_DESC", "Basket correlated assets together to offer higher LTV ratios for looping and LST strategies."],
      ["USECASE_3_TITLE", "Single pair markets"],
      ["USECASE_3_DESC", "Isolated collateral and borrow pairs with dedicated risk parameters."],
      ["USECASE_4_TITLE", "Permissioned lending"],
      ["USECASE_4_DESC", "Closed environments for institutions and banks, with access control and private deployments."],
      ["USECASE_5_TITLE", "Private lending"],
      ["USECASE_5_DESC", "Formalise off-chain agreements on-chain, with under-collateralised options."],
      ["USECASE_6_TITLE", "Intent-based lending"],
      ["USECASE_6_DESC", "Fixed-term, fixed-rate positions matched between lenders and borrowers."],
    ],
  },
  {
    name: "Research",
    rows: [
      ["RESEARCH_EYEBROW", "Research"],
      ["RESEARCH_H2", "Onchain Lending: State of the Art"],
      ["RESEARCH_PARA", "We’ve spent over five years building lending products onchain and studying the architectures behind every major lending protocol. This report explores the models, trade-offs, and innovations shaping the future of onchain lending. Read it to understand what we’re building and where we’re coming from, and why it may matter for you."],
      ["RESEARCH_CTA", "Read report   (link: placeholder #)"],
    ],
  },
  {
    name: "For builders",
    rows: [
      ["BUILD_EYEBROW", "For builders"],
      ["BUILD_H2", "Ship lending products, not infrastructure"],
      ["BUILD_PARA", "Focus on your core business and users while Atlas handles the lending engine. Deploy, customize and integrate with developer tooling."],
      ["BUILD_CTA_1", "Read the docs   (link: docs.folks.finance)"],
      ["BUILD_CTA_2", "GitHub   (link: github.com/Folks-Finance)"],
      ["BUILD_POINT_1", "Deploy your own lending use case in days instead of months or years"],
      ["BUILD_POINT_2", "Host a white-label frontend under your own brand and domain"],
      ["BUILD_POINT_3", "Embed yield directly into your product"],
      ["BUILD_POINT_4", "Manage capital allocation across differentiated strategies"],
    ],
  },
  {
    name: "Forbes quote",
    rows: [
      ["FORBES_QUOTE", "Institutions don’t lose control and compliance onchain. Instead, they have the opportunity to place it where it matters and operate more efficiently"],
      ["FORBES_PARA", "In his latest Forbes article, Folks Finance CEO Benedetto Biondi explores why more institutions are moving onchain, how control and compliance are evolving, and what this could mean for the future of financial infrastructure."],
      ["FORBES_CTA", "Read article   (link: placeholder #)"],
    ],
  },
  {
    name: "Final CTA",
    rows: [
      ["CTA_H2", "Launch your lending environment with Atlas"],
      ["CTA_PARA", "We’re onboarding a select group of curators, institutions and partners ahead of launch. Let’s build together."],
      ["CTA_BTN_1", "Become a partner"],
      ["CTA_BTN_2", "Investor relations"],
    ],
  },
  {
    name: "Footer",
    rows: [
      ["FOOTER_TAGLINE", "The open infrastructure layer for onchain lending. Built by Folks Finance."],
      ["FOOTER_COL1_TITLE", "About"],
      ["FOOTER_COL1_LINKS", "Folks Finance / $FOLKS / Governance / Brand Assets / Careers"],
      ["FOOTER_COL2_TITLE", "Legal"],
      ["FOOTER_COL2_LINKS", "Privacy & Cookie Policy / Folks Finance DeFi T&C / FOLKS Token T&C"],
      ["FOOTER_COPYRIGHT", "© 2026 Folks Finance. All rights reserved."],
      ["FOOTER_TAGLINE_BOTTOM", "Folks Atlas - infrastructure for lending."],
    ],
  },
];

const BLUE = "0260ED";
const GREY = "F0F3F7";
const border = { style: BorderStyle.SINGLE, size: 1, color: "D5DCE5" };
const borders = { top: border, bottom: border, left: border, right: border };
const COL_ID = 2600;
const COL_TXT = 6760;
const TABLE_W = COL_ID + COL_TXT;

function headerRow() {
  return new TableRow({
    tableHeader: true,
    children: [
      cell("ID", COL_ID, { fill: BLUE, color: "FFFFFF", bold: true }),
      cell("Testo  (modifica solo questa colonna)", COL_TXT, { fill: BLUE, color: "FFFFFF", bold: true }),
    ],
  });
}

function cell(text, width, opts = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: opts.bold || false,
            color: opts.color || "111213",
            font: opts.mono ? "Consolas" : "Arial",
            size: opts.size || 20,
          }),
        ],
      }),
    ],
  });
}

function sectionTable(sec) {
  const rows = [headerRow()];
  for (const [id, text] of sec.rows) {
    rows.push(
      new TableRow({
        children: [
          cell(id, COL_ID, { mono: true, fill: GREY, bold: true, size: 18 }),
          cell(text, COL_TXT),
        ],
      })
    );
  }
  return new Table({ width: { size: TABLE_W, type: WidthType.DXA }, columnWidths: [COL_ID, COL_TXT], rows });
}

const children = [];

children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Folks Atlas — Landing Page Copy")] }));
children.push(new Paragraph({ children: [new TextRun({ text: "Aggiornato allo stato attuale del sito · ogni testo ha un ID univoco", italics: true, color: "5A6473" })] }));

children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Come usare questo documento")] }));
[
  "Modifica SOLO il contenuto della colonna “Testo”.",
  "NON modificare la colonna “ID” (serve a me per fare il replace 1:1 nel codice).",
  "Le note tra parentesi (es. placeholder, link) sono solo promemoria: puoi rimuoverle.",
  "Quando hai finito, salva / condividi e rimandami il file: applicherò le modifiche alla landing.",
].forEach((t) =>
  children.push(new Paragraph({ numbering: { reference: "instr", level: 0 }, children: [new TextRun({ text: t, size: 22 })] }))
);

children.push(new Paragraph({ children: [new TextRun("")] }));

for (const sec of sections) {
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(sec.name)] }));
  children.push(sectionTable(sec));
  children.push(new Paragraph({ children: [new TextRun("")] }));
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 34, bold: true, font: "Arial", color: "0260ED" },
        paragraph: { spacing: { before: 120, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "111213" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "instr", levels: [{ level: 0, format: "decimal", text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  const out = "/Users/rove_/ATLAS Landing Page/Folks-Atlas-Landing-Copy.docx";
  fs.writeFileSync(out, buf);
  console.log("Scritto:", out);
  const total = sections.reduce((n, s) => n + s.rows.length, 0);
  console.log("Sezioni:", sections.length, "| Stringhe di copy:", total);
});
