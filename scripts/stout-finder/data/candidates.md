# Seed candidates - pubs to verify before seeding

Status: UNVERIFIED CANDIDATES. Do not import any of this as-is.

Every line below is something someone published on the internet, not something
anyone confirmed by standing in the pub. Seeding it would stamp it "Confirmed
today" from the seed reporter, which is exactly the lie the confidence system
exists to prevent. Ring or visit, then fill known-stock.json from what you heard.

## Provenance warning

The seven Beamish candidates all trace to ONE source: a United Wines press
release issued around 18 March 2025. It was republished by Business Eye,
Farming Life and LoveBelfast. Three articles, one claim. Treat it as a single
source that is now roughly 18 months old.

Launch venues are also the most likely to have been a promotional placement
rather than a permanent line. Some of these will have dropped it. That is
normal and it is why you are ringing.

## Beamish - in scope (Antrim / Down)

| Pub | Location as published | Evidence | Confidence |
|---|---|---|---|
| The Sunflower | Belfast, Union Street | Named in Mar 2025 release AND separately sponsored the Sunflower's Monday open mic (Apr 2023, LoveBelfast) | Strongest of the set. Two distinct events, two years apart. |
| Criterion Bar & Coffee House | Belfast, Antrim Road | Mar 2025 release | Single source |
| Duke Of York | Belfast, Commercial Court | Mar 2025 release | Single source |
| The Foundry | Belfast | Mar 2025 release | Single source, address unconfirmed |
| Lansdowne Hotel | Belfast, Antrim Road | Mar 2025 release | Single source. Hotel bar, may be residents-led |
| Ulster Sports Club | Belfast, High Street | Mar 2025 release | Single source |
| The Court House | Bangor, Co Down | Mar 2025 release | Single source. Only non-Belfast candidate |

## Beamish - out of scope for v1

- Sandino's, Derry~Londonderry. Real candidate, wrong county for v1.

## Murphy's - nothing found

No venue-level evidence of Murphy's on draught anywhere in Northern Ireland.
Searched NI trade press, general web, beer sites. Nothing names a single NI bar.

Murphy's is Heineken Ireland, distributed separately from the United Wines
Beamish route. Two possibilities, and you cannot tell which from a desk:
1. It is genuinely close to absent in NI on draught.
2. It is around but nobody writes about it.

Either way, do not seed a single Murphy's row from research. Find the first one
in person. If it turns out Murphy's really is absent in Antrim and Down, that is
worth knowing before launch, because a filter chip that always returns nothing
looks broken rather than accurate.

## Guinness - do not research

It is near-universal. Tick it while you are in the pub for the other two.
Researching it is wasted effort.

## The move that beats all of this

United Wines, Craigavon, are the NI Beamish distributor.
Phone 028 3831 6555. They have on-trade contacts for over 1000 licensed
premises and they know exactly which bars pour Beamish, because they deliver it.

A free pub finder that sends drinkers to Beamish taps is marketing they do not
have to pay for. Ask for the NI on-trade Beamish stockist list. Worst case they
say no and you have lost one phone call. Best case you skip the entire cold-start
problem in an afternoon.

Ask them the same about Murphy's while you are on. If they do not carry it,
ask who does in NI.

## Phone numbers

Do not look these up by hand. fetch-osm-pubs.ts already maps the OSM `phone`
and `contact:phone` tags, so once osm:import has run the numbers are in the
`phone` column for a good share of these pubs. Query the database for your
candidates and you have the call list with numbers attached.

## Call script

"Hi, quick one - do you have Beamish on tap at the minute?"

If yes: "Brilliant, thanks." Log it same day, the date is the point.
Also ask: "Any Murphy's?"

If no: log it as a NO. A denial is real data and moves the pub to Unlikely,
which stops the next person wasting a trip.

## known-stock.json shape

Fill AFTER osm:import, using real slugs from the database. Made-up slugs will
be listed as unmatched by seed-known.ts and skipped.

[
  {
    "slug": "the-sunflower-belfast",
    "drinks": { "beamish": true, "guinness": true }
  },
  {
    "slug": "some-pub-that-said-no",
    "drinks": { "beamish": false }
  }
]

false is as valuable as true. Log both.
