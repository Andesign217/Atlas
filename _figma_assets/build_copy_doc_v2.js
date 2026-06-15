const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
} = require("docx");

const BLUE = "0260ED";
const GREY = "6B7280";

const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const eyebrow = (t) => new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: t.toUpperCase(), bold: true, color: BLUE, size: 18 })] });
const label = (t) => new Paragraph({ spacing: { before: 120, after: 20 }, children: [new TextRun({ text: t, bold: true, color: GREY, size: 18 })] });
const body = (t) => new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: t, size: 22 })] });
const bullet = (t) => new Paragraph({ numbering: { reference: "b", level: 0 }, children: [new TextRun({ text: t, size: 22 })] });
const spacer = () => new Paragraph({ children: [new TextRun("")] });

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cell = (text, w, opts = {}) =>
  new TableCell({
    borders,
    width: { size: w, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text, bold: !!opts.bold, size: 20, color: opts.color })] })],
  });

// Comparison data
const COLW = [3960, 1800, 1800, 1800];
const compRows = [
  ["Capability", "Folks Atlas", "Aave", "Morpho"],
  ["Launch your own lending environment", "Yes", "No — DAO / governance approval needed", "No — Just vaults"],
  ["Multi-collateral + multi-borrow markets", "Yes", "Yes", "No — Single collateral / single borrow"],
  ["Full parameter control", "Yes", "Partial — Limited / governance-driven", "Partial — Limited / fixed after deployment"],
  ["Active market management after launch", "Yes", "Partial — Governance dependent", "No — Immutable markets"],
  ["Native KYC / AML & address whitelisting", "Yes", "No", "Partial — Limited"],
  ["Privacy & private-chain deployment", "Yes", "No", "No"],
  ["White-label solution", "Yes", "No", "No"],
  ["Create custom curated yield vaults", "Yes", "No", "Yes"],
];
const compTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: COLW,
  rows: compRows.map((r, ri) =>
    new TableRow({
      children: r.map((c, ci) =>
        cell(c, COLW[ci], {
          bold: ri === 0 || ci === 0,
          fill: ri === 0 ? "EAF1FE" : ci === 1 ? "F4F8FF" : undefined,
          color: ri === 0 && ci === 1 ? BLUE : undefined,
        })
      ),
    })
  ),
});

const useCases = [
  ["Generalised lending", "Recreate a full multi-asset money market with the collateral and borrow parameters you choose."],
  ["Efficiency lending", "Basket correlated assets together to offer higher LTV ratios for looping and LST strategies."],
  ["Single pair markets", "Isolated collateral and borrow pairs with dedicated risk parameters."],
  ["Permissioned lending", "Closed environments for institutions and banks, with access control and private deployments."],
  ["Private lending", "Formalise off-chain agreements on-chain, with under-collateralised options."],
  ["Intent-based lending", "Fixed-term, fixed-rate positions matched between lenders and borrowers."],
];

const children = [
  new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Folks Atlas — Landing Page Copy")] }),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Versione aggiornata. Modifica liberamente il testo qui sotto; rimandami il file e applico le sostituzioni sul sito. Non cambiare le etichette in grigio (servono solo a indicare dove va ogni testo).", italics: true, size: 20, color: GREY })] }),

  H1("Header / Navigation"),
  label("Voci menu"), bullet("Protocol"), bullet("Why Atlas"), bullet("Use cases"),
  label("Bottone CTA (header)"), body("Get in touch"),

  H1("Hero"),
  label("Parole che ruotano (typewriter)"),
  ...["lending", "credit", "RWA", "yield", "vault", "stablecoin"].map(bullet),
  label("Titolo"), body("Launch your [parola] product onchain"),
  label("Paragrafo"), body("Folks Atlas enables institutions and builders to deploy fully-configurable lending environments for any type of asset without the need of rebuilding the stack. Speak with our team to explore a tailored integration."),
  label("Bottone"), body("Get in touch"),

  H1("Diagramma ecosistema (animazione)"),
  label("Nodo centrale"), body("ATLAS (logo)"),
  label("Nodi"), bullet("Exchanges"), bullet("Fintechs"), bullet("Institutions"), bullet("Banks"), bullet("Asset Managers"),
  label("Nodo finale"), body("Users"),

  H1("Proven / Stats"),
  eyebrow("Proven, not experimental"),
  H2("Built on battle-tested foundations"),
  body("Atlas is the next generation of Folks Finance, opened up for everyone to build on."),
  label("Statistiche (numero — didascalia)"),
  bullet("5+ — years of uninterrupted mainnet"),
  bullet("$13B — deposited"),
  bullet("240K+ — total unique users"),
  bullet("9 — chains supported"),

  H1("Spokes"),
  eyebrow("Spokes"),
  H2("Build your own lending environment"),
  body("A Spoke is an isolated lending environment you fully control. List as many collateral and borrow assets as you need, then configure every parameter to match your strategy and compliance needs."),
  label("Didascalia"), body("Designed for institutions and builders"),
  label("Moduli (chips)"),
  ...["Multi-collateral & multi-borrow", "Custom interest rate models", "KYC / AML & whitelists", "Configurable liquidation engine", "Any oracle (Chainlink, Pyth…)", "Privacy module", "Insurance & security modules", "White-label frontend"].map(bullet),

  H1("Vaults"),
  eyebrow("Vaults"),
  H2("Curated yield, one click away for your users"),
  body("Curators can package approved Spokes, allocation targets, and risk controls into a single Vault. Users deposit once and earn yield automatically, while curators manage allocations and rebalancing behind the scenes."),
  label("Didascalia"), body("Designed for curators and asset managers"),
  label("Etichette diagramma Vault"), bullet("Vault deposit — USDC"), bullet("Spoke A / Spoke B / Spoke C"),

  H1("Why Folks Atlas (Comparison)"),
  eyebrow("Why Folks Atlas"),
  H2("Built different, so you can build differently"),
  body("Atlas combines the liquidity depth of monolithic lending with the flexibility of modular markets, giving institutions and builders the tools to launch unique lending environments tailored to their assets, users, risk models, and compliance needs."),
  label("Tabella comparativa (Yes = Supported, Partial = limitato, No = non disponibile)"),
  compTable,
  spacer(),
  label("Legenda"), bullet("Supported"), bullet("Not available"),
  label("Disclaimer"),
  body("This comparison is provided for informational purposes and reflects our good-faith reading of each protocol's publicly available documentation. Lending protocols develop quickly and ship capabilities across multiple products, so some features may change or be delivered differently; we encourage readers to confirm current specifications with each provider. This table is independent and is not affiliated with, endorsed by, or intended to disparage Aave or Morpho; all trademarks belong to their respective owners."),

  H1("Use cases"),
  eyebrow("Use cases"),
  H2("One protocol, every lending market"),
  body("From permissionless lending markets to permissioned institutional venues and real-world assets, configure a Spoke for any need."),
  label("Card (titolo — descrizione)"),
  ...useCases.map(([t, d]) => bullet(`${t} — ${d}`)),

  H1("Forbes Quote"),
  label("Citazione"),
  body("“Institutions don't lose control and compliance onchain. Instead, they have the opportunity to place it where it matters and operate more efficiently”"),
  label("Paragrafo"),
  body("In his latest Forbes article, Folks Finance CEO Benedetto Biondi explores why more institutions are moving onchain, how control and compliance are evolving, and what this could mean for the future of financial infrastructure."),
  label("Link"), body("Read article (→ articolo Forbes)"),

  H1("Final CTA"),
  H2("Launch your lending environment with Atlas"),
  body("We're onboarding a select group of curators, institutions and partners ahead of launch. Let's build together."),
  label("Campi del form (placeholder)"),
  bullet("Full name"),
  bullet("Work email"),
  bullet("What's your company website?"),
  bullet("Describe your use case (In a couple of sentences, please provide context on what you are interested in Folks Atlas for)"),
  label("Bottone invio"), body("Get in touch"),
  label("Messaggio di conferma (dopo invio)"),
  body("Thanks, we'll be in touch."),
  body("Our team will reach out shortly."),

  H1("Footer"),
  label("Tagline"), body("The open infrastructure layer for onchain lending. Built by Folks Finance."),
  label("Colonna About"), ...["Folks Finance", "$FOLKS", "Governance", "Brand Assets", "Careers"].map(bullet),
  label("Colonna Legal"), ...["Privacy & Cookie Policy", "Folks Finance DeFi T&C", "FOLKS Token T&C"].map(bullet),
  label("Social"), ...["X", "GitHub", "Docs"].map(bullet),
  label("Riga in basso"), body("Folks Atlas - infrastructure for lending."),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 44, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { after: 120 } } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 120, after: 80 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "b", levels: [{ level: 0, format: "bullet", text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 280 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Folks-Atlas-Landing-Copy.docx", buf);
  console.log("written Folks-Atlas-Landing-Copy.docx", buf.length, "bytes");
});
