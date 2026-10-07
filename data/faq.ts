// Answers come from the owner's own description of Qalam (see docs/content.md).
export interface FaqItem {
  q: string;
  a: string;
}

export const faqIntro = {
  title: "How Qalam stays grounded in sources",
  text: "Straight answers about the assistant at the centre of the Quranity case study.",
};

export const faq: FaqItem[] = [
  {
    q: "How does Qalam stay grounded in sources?",
    a: "It searches a Qur’an and Hadith database by meaning before it writes anything. The matched sources and a set of instructions go to the model, and each answer shows the Qur’an or Hadith reference it came from.",
  },
  {
    q: "What happens when no source is a close match?",
    a: "Qalam answers from the closest related sources instead of falling back to a generic reply.",
  },
  {
    q: "Which languages does it answer in?",
    a: "English, Arabic and Albanian.",
  },
  {
    q: "What went wrong while building it?",
    a: "Two things. When the retrieved source did not match the question, the assistant fell back to a generic answer every time, and language detection was not working. I rebuilt the prompting and the instructions to fix both.",
  },
  {
    q: "How was it tested?",
    a: "By hand and by script, with people and with bots.",
  },
  {
    q: "Where can I try Quranity?",
    a: "On Google Play and the App Store, or through the landing page at quranity.app.",
  },
];
