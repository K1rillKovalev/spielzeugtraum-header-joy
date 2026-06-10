import StaticPage from "./StaticPage";

export default function Privacy() {
  return (
    <StaticPage
      title="Privacy Policy"
      paragraphs={[
        "At SpielzeugTraum we treat your personal information the way we treat a freshly painted rocking horse — with great care, soft cloths, and an instinct never to leave it out in the rain. We collect only what we need to deliver your toys and to keep the shop running: your name, address, email and the gentle trail of choices you make while browsing.",
        "Your data lives on secure servers within the European Union, guarded by encryption and well-fed digital watchdogs. We never sell it, never trade it for shiny beads, and we share it only with the trusted couriers and payment providers who help your order reach your doorstep.",
        "You are always the captain of your own information. Write to privacy@spielzeugtraum.de at any time to access, correct or erase what we hold about you — no questions asked, only a polite confirmation and, occasionally, a small drawing of a smiling cloud.",
      ]}
    />
  );
}
