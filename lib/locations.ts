/**
 * Local landing pages. Two, written properly, not twenty near-copies: Google
 * treats templated town pages as doorway pages. Every line here has to be
 * true for that place.
 */

export type LocationPageData = {
  slug: string;
  path: string;
  town: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  intro: string[];
  whyLocal: { title: string; body: string }[];
  work: { title: string; line: string; href: string }[];
  areas: string[];
  faqs: { question: string; answer: string }[];
};

export const LOCATIONS: Record<"carrickfergus" | "belfast", LocationPageData> = {
  carrickfergus: {
    slug: "carrickfergus",
    path: "/web-design-carrickfergus",
    town: "Carrickfergus",
    metaTitle: "Web design in Carrickfergus",
    metaDescription:
      "Web designer based in Carrickfergus. Five-page websites for local businesses and charities, £650 fixed, live in about a week, and you own the result.",
    kicker: "Home fixture",
    intro: [
      "I'm Ryan, a web designer and developer based in Carrickfergus. I build websites for businesses and charities around the town: a proper five-page site for £650, live in about a week once I have your details.",
      "No agency, no template, and nobody in another city handling your account. You deal with me from the first message to launch day.",
    ],
    whyLocal: [
      {
        title: "Down the road",
        body: "I live here. We can sort it over a coffee in the town, on a call, or entirely on WhatsApp if that suits you better.",
      },
      {
        title: "Built for how people find you",
        body: "Most people looking for a plumber, a salon or a cafe in Carrick are on their phone. Every site is built phone-first and checked on a real handset before it goes live.",
      },
      {
        title: "Local search basics done",
        body: "Page titles, descriptions, link previews, and a map if you have premises, so Google and your customers can both work out where you are and what you do.",
      },
    ],
    work: [
      {
        title: "Carrickfergus concept builds",
        line: "Three sites for made-up Carrick businesses - a plumber, a harbour salon, and a seafood restaurant - to show range. Concepts, not clients.",
        href: "/work/concept-builds",
      },
      {
        title: "RV's Cold Brew",
        line: "Live site for a cold brew and matcha counter at the Great Northern Mall in Belfast.",
        href: "/work/rvs-cold-brew",
      },
      {
        title: "Paintball Wales",
        line: "Rebuilt a paintball park's site so groups can enquire from their phones.",
        href: "/work/paintball-wales",
      },
    ],
    areas: [
      "Carrickfergus",
      "Greenisland",
      "Whitehead",
      "Eden",
      "Ballycarry",
      "Larne",
      "Newtownabbey",
      "Ballyclare",
    ],
    faqs: [
      {
        question: "Do you only work with businesses in Carrickfergus?",
        answer:
          "No. Carrick is home, but I work with businesses and charities across Northern Ireland. Being local just makes meeting up easy.",
      },
      {
        question: "Can we meet in person?",
        answer:
          "Yes, around Carrick or in Belfast. Plenty of people prefer to do the whole thing on WhatsApp and that is fine too.",
      },
      {
        question: "What does a website cost?",
        answer:
          "£650 for up to five pages. Half to book the build in, half when it goes live. Hosting and small changes afterwards are an optional £30 a month.",
      },
    ],
  },
  belfast: {
    slug: "belfast",
    path: "/web-design-belfast",
    town: "Belfast",
    metaTitle: "Web design in Belfast",
    metaDescription:
      "Websites for Belfast small businesses and charities, from a one-person studio half an hour up the road in Carrickfergus. £650 fixed, live in about a week.",
    kicker: "Away fixture",
    intro: [
      "I build websites for Belfast small businesses and charities from Carrickfergus, about half an hour up the road. A proper five-page site for £650, live in about a week once I have your details.",
      "It is one person doing the work, so there is no account manager between you and the person building the site, and no agency day rate.",
    ],
    whyLocal: [
      {
        title: "Close enough to meet",
        body: "Belfast is half an hour away, so a sit-down in the city is easy to arrange. Most of the work happens over WhatsApp and email anyway.",
      },
      {
        title: "A fair price for the city",
        body: "Agency quotes for a small site often run to four figures and several weeks. Mine is £650 and about a week, with the price on the page before you ask.",
      },
      {
        title: "You own it",
        body: "Your domain in your name, your content, your code. No lock-in to a platform or to me.",
      },
    ],
    work: [
      {
        title: "RV's Cold Brew",
        line: "A Belfast client: cold brew and matcha from Unit 11 at the Great Northern Mall. Menu, hours, and how to find them.",
        href: "/work/rvs-cold-brew",
      },
      {
        title: "Paintball Wales",
        line: "Rebuilt a paintball park's site so groups can enquire from their phones.",
        href: "/work/paintball-wales",
      },
      {
        title: "ShelterLink",
        line: "A volunteer platform for Assisi Animal Sanctuary: rotas, roles, and an admin dashboard.",
        href: "/work/shelterlink",
      },
    ],
    areas: [
      "Belfast city centre",
      "North Belfast",
      "South Belfast",
      "East Belfast",
      "West Belfast",
      "Newtownabbey",
      "Holywood",
      "Lisburn",
    ],
    faqs: [
      {
        question: "You're in Carrickfergus. Does that matter?",
        answer:
          "Not really. It is half an hour away, and I can meet in the city. Everything else happens on WhatsApp, email, or a call.",
      },
      {
        question: "How is this different from a Belfast agency?",
        answer:
          "Price, speed, and who you talk to. £650 and about a week, and you deal with the person building it the whole way through.",
      },
      {
        question: "What does a website cost?",
        answer:
          "£650 for up to five pages. Half to book the build in, half when it goes live. Hosting and small changes afterwards are an optional £30 a month.",
      },
    ],
  },
};
