import StaticPage from "./StaticPage";

export default function Contact() {
  return (
    <StaticPage
      title="Contact Us"
      paragraphs={[
        "Behind every order is a small team of toy-lovers ready to chat about anything from missing puzzle pieces to which dollhouse best fits a rainy Sunday. Drop us a line at support@spielzeugtraum.de and a human (with biscuit crumbs on the keyboard) will write back within one playful afternoon.",
        "Prefer the warmth of a voice? Call us at +49 30 1234567 on weekdays between 9 and 18 — we answer between gift-wrapping marathons. For letters of the old-fashioned kind, our workshop door waits at Spielstraße 1, 10115 Berlin.",
        "Whether you have a question, a wish, or a story about your child's first wooden train, we'd love to hear it. Every message helps us tune the music box of SpielzeugTraum a little more sweetly.",
      ]}
    />
  );
}
