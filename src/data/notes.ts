
export interface Note {
  id: string;
  title: string;
  date: string;
  category:
  | "Democracy"
  | "AI Ethics"
  | "Creative Tech"
  | "Cultural Data"
  | "Random Thoughts / Shower Thoughts";
  tags: string[];
  content: string;
}

export const notes: Note[] = [
  {
    id: "n-01",
    title: "The Government Doesn't Have to Build Everything",
    date: "2026-10-13",
    category: "Random Thoughts / Shower Thoughts",
    tags: [
      "civic-infrastructure",
      "democracy",
      "open-data",
      "government",
      "public-apis",
      "artificial-intelligence",
      "lebanon",
    ],
    content:
      `While reflecting on my thesis and the reconstruction of the Lebanese Official Gazette, I realized why I kept returning to what seemed like such a mundane technical problem: the format of the documents.

The Gazette is published largely as scanned images, locked behind cumbersome interfaces and access restrictions. But the problem goes beyond inconvenience. When public information isn't machine-readable, searchable, or accessible through well-documented APIs, the state isn't simply making information difficult to consult. It is preventing people from building upon it.

And this becomes increasingly consequential in the age of artificial intelligence.

For perhaps the first time, individuals and small communities have access to tools that substantially lower the technical barriers to building software, analyzing information, and developing services that would previously have required entire teams. The potential is extraordinary, particularly for countries like Lebanon, where institutional capacity is limited and the needs of the population far exceed what the government can realistically provide.

This made me reconsider what we should expect from a government.

Perhaps the state's responsibility is not necessarily to develop every digital service, interface, or application that its citizens might need. Perhaps one of its most important responsibilities is to provide the foundations upon which those services can be built: accurate public records, structured and machine-readable data, interoperable systems, open standards, documented APIs, and reliable access.

The state maintains the integrity and availability of public information, while citizens, researchers, journalists, civil society organizations, and businesses are free to transform that information into tools serving their communities.

This could distribute some of the work of innovation across society without surrendering the state's responsibility for essential services. Instead of concentrating every technological capability within government institutions, it creates the conditions for a much broader ecosystem of civic participation and problem-solving.

There is also a democratic argument here.

Building increasingly sophisticated government systems can come with the temptation to centralize information, monitor populations, and expand administrative control. But enabling citizens to build independently on open public infrastructure offers a different relationship between the state and society. The government provides reliable foundations without needing to mediate, observe, or control every subsequent use.

Of course, openness must be accompanied by privacy protections, security, accountability, and clear distinctions between public records and sensitive personal information. Nor should civic innovation become an excuse for governments to abandon their obligations.

In Lebanon, this possibility feels particularly significant. With limited institutional capacity, fragmented governance, substantial external influence, and an extensive landscape of civil society initiatives, making public infrastructure genuinely accessible could allow resources and expertise already present in society to be directed toward solving problems rather than repeatedly overcoming the same administrative obstacles.

It would not eliminate political dysfunction, corruption, or institutional weakness. AI certainly cannot repair those problems on its own.

But it could change what becomes possible despite them.

Perhaps the most useful thing a government can do in the age of AI is not to build more technology for its citizens, but to make it possible for its citizens to build more with what already belongs to them.

The format was never just a technical problem. It was a question of who gets to act.`,
  },
];
