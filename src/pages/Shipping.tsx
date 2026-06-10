import StaticPage from "./StaticPage";

export default function Shipping() {
  return (
    <StaticPage
      title="Shipping & Returns"
      paragraphs={[
        "Every parcel from SpielzeugTraum begins its journey wrapped in recycled paper, a paper-star sticker, and a wink of fairy dust. Orders placed before 14:00 leap onto a DHL truck the same day, and orders over €50 travel free of charge across all of Germany — because a child's anticipation should never be taxed.",
        "Most adventures arrive in 2–4 working days. For Austria, Switzerland and the rest of the EU we add a few extra paragraphs to the storybook: 4–8 days, with transparent fees calculated at checkout.",
        "If a toy doesn't quite spark the magic you hoped for, you have 30 cosy days to send it back. Pop the unused item, with its tags intact, into the original box, and we'll refund the full amount the moment our elves confirm its safe return.",
      ]}
    />
  );
}
