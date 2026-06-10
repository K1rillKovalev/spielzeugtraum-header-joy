import StaticPage from "./StaticPage";

export default function About() {
  return (
    <StaticPage
      title="About Us"
      paragraphs={[
        "SpielzeugTraum was born from a simple belief: every child deserves a tiny universe where imagination is the only law. What began as a single wooden workshop in a sleepy Berlin courtyard has grown into a dreamland of curated toys that travel from our shelves into homes across Germany.",
        "We hand-pick every plush, puzzle and pirate ship as if we were choosing a gift for our own children. Our makers are storytellers in disguise — carpenters who whisper to oak, illustrators who chase rainbows, designers who refuse to grow up. Together they shape playthings built to outlive trends and become tomorrow's heirlooms.",
        "More than a shop, SpielzeugTraum is a small promise: that childhood is sacred, that play is serious work, and that wonder, once sparked, never truly fades.",
      ]}
    />
  );
}
